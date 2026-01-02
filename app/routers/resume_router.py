from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from dependencies import get_db
from app.models.user import User
from app.models.resume import Resume
from app.services.resume_parser import ResumeParser
from app.services.ollama_service import ollama_service
import os
import uuid
from datetime import datetime
from typing import Optional
import logging

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/resume",
    tags=["Resume Analysis"],
)

@router.get("/test-ollama")
async def test_ollama():
    """Test endpoint to verify Ollama integration"""
    try:
        response = await ollama_service.chat("Hello! Please respond with a simple greeting.")
        return {"status": "success", "ollama_response": response}
    except Exception as e:
        logger.error(f"Ollama test failed: {e}")
        return {"status": "error", "message": str(e)}

# Directory to store uploaded resumes
UPLOAD_DIR = "uploads/resumes"

# Ensure upload directory exists with proper permissions
def ensure_upload_dir():
    if not os.path.exists(UPLOAD_DIR):
        os.makedirs(UPLOAD_DIR, mode=0o755, exist_ok=True)
        logger.info(f"Created upload directory: {UPLOAD_DIR}")

# Initialize upload directory
ensure_upload_dir()

@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    user_id: int = Form(...),
    db: Session = Depends(get_db)
):
    """Upload and parse resume"""
    try:
        # Validate file
        if not file.filename:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No file provided"
            )
        
        # Check file size (5MB limit)
        file_content = await file.read()
        if len(file_content) > 5 * 1024 * 1024:  # 5MB
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File too large. Maximum size is 5MB"
            )
        
        # Check file type
        allowed_extensions = ['pdf', 'doc', 'docx']
        file_extension = file.filename.lower().split('.')[-1]
        if file_extension not in allowed_extensions:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unsupported file format. Please upload PDF, DOC, or DOCX files"
            )
        
        # Verify user exists
        user = db.query(User).filter(User.user_id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        # Generate unique filename
        unique_filename = f"{uuid.uuid4()}_{file.filename}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)
        
        # Save file
        with open(file_path, "wb") as buffer:
            buffer.write(file_content)
        
        # Parse resume text
        resume_text = ResumeParser.parse_resume(file_content, file.filename)
        if not resume_text:
            # Clean up file
            os.remove(file_path)
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to parse resume content"
            )
        
        # Save resume info to database
        resume = Resume(
            user_id=user_id,
            file_name=file.filename,
            file_path=file_path,
            content_text=resume_text[:10000],  # Store first 10k characters
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        db.add(resume)
        db.commit()
        db.refresh(resume)
        
        logger.info(f"Resume uploaded successfully: {resume.resume_id}")
        
        return {
            "message": "Resume uploaded successfully",
            "resume_id": resume.resume_id,
            "filename": file.filename,
            "text_preview": resume_text[:500] + "..." if len(resume_text) > 500 else resume_text
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error uploading resume: {str(e)}")
        logger.exception("Full traceback:")  # This will log the full stack trace for debugging
        # Clean up file if it was created
        try:
            if 'file_path' in locals() and os.path.exists(file_path):
                os.remove(file_path)
        except:
            pass
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error during file upload"
        )

@router.post("/analyze")
async def analyze_resume(
    resume_id: int = Form(...),
    job_description: str = Form(...),
    db: Session = Depends(get_db)
):
    """Analyze resume against job description using Ollama"""
    try:
        # Get resume
        resume = db.query(Resume).filter(Resume.resume_id == resume_id).first()
        if not resume:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Resume not found"
            )
        
        resume_text = resume.content_text or ""
        
        # Use Ollama for analysis
        logger.info(f"Starting analysis for resume {resume_id}")
        
        # Extract skills
        resume_skills = ollama_service.extract_skills_from_resume(resume_text)
        logger.info(f"Extracted {len(resume_skills)} skills from resume")
        
        # Analyze skills gap
        skills_analysis = ollama_service.analyze_skills_gap(resume_skills, job_description)
        logger.info("Skills gap analysis completed")
        
        # Score resume
        resume_score = ollama_service.score_resume(resume_text, job_description)
        logger.info("Resume scoring completed")
        
        # Generate upskilling suggestions
        upskilling_suggestions = ollama_service.generate_upskilling_suggestions(
            skills_analysis.get('missing_skills', []), 
            job_description
        )
        logger.info("Upskilling suggestions generated")
        
        # Generate interview questions
        interview_questions = ollama_service.generate_interview_questions(resume_text, job_description)
        logger.info("Interview questions generated")
        
        # Prepare response
        analysis_result = {
            "role_match": {
                "role_name": "Target Role",
                "match_percentage": resume_score.get('overall_score', 75),
                "job_description": job_description[:500] + "..." if len(job_description) > 500 else job_description
            },
            "skills_analysis": skills_analysis,
            "resume_score": resume_score,
            "upskilling_suggestions": upskilling_suggestions,
            "interview_questions": interview_questions,
            "analysis_timestamp": datetime.utcnow().isoformat()
        }
        
        logger.info(f"Analysis completed for resume {resume_id}")
        return analysis_result
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error analyzing resume {resume_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Analysis failed: {str(e)}"
        )

@router.get("/score/{resume_id}")
async def get_resume_score(
    resume_id: int,
    job_description: str,
    db: Session = Depends(get_db)
):
    """Get resume score for specific job description"""
    try:
        resume = db.query(Resume).filter(Resume.resume_id == resume_id).first()
        if not resume:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Resume not found"
            )
        
        score = ollama_service.score_resume(resume.content_text or "", job_description)
        return score
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting resume score: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to calculate resume score"
        )

@router.get("/skills-gap/{resume_id}")
async def get_skills_gap(
    resume_id: int,
    job_description: str,
    db: Session = Depends(get_db)
):
    """Get skills gap analysis"""
    try:
        resume = db.query(Resume).filter(Resume.resume_id == resume_id).first()
        if not resume:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Resume not found"
            )
        
        resume_skills = ollama_service.extract_skills_from_resume(resume.content_text or "")
        skills_gap = ollama_service.analyze_skills_gap(resume_skills, job_description)
        
        return skills_gap
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting skills gap: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to analyze skills gap"
        )

@router.get("/user/{user_id}")
async def get_user_resumes(
    user_id: int,
    db: Session = Depends(get_db)
):
    """Get all resumes for a user"""
    try:
        resumes = db.query(Resume).filter(Resume.user_id == user_id).all()
        return [
            {
                "resume_id": resume.resume_id,
                "filename": resume.file_name,
                "created_at": resume.created_at.isoformat(),
                "text_preview": (resume.content_text or "")[:200] + "..." if len(resume.content_text or "") > 200 else resume.content_text or ""
            }
            for resume in resumes
        ]
        
    except Exception as e:
        logger.error(f"Error getting user resumes: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve resumes"
        )