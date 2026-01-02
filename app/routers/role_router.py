from fastapi import APIRouter, Depends, HTTPException, status, Form
from sqlalchemy.orm import Session
from dependencies import get_db
from app.models.role import Role
from app.models.resume import Resume
from app.services.ollama_service import ollama_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/roles",
    tags=["Role Management"],
)

@router.get("/")
async def get_all_roles(db: Session = Depends(get_db)):
    """Get all available roles"""
    try:
        roles = db.query(Role).all()
        return [
            {
                "role_id": role.role_id,
                "role_name": role.role_name,
                "role_description": role.role_description,
                "created_at": role.created_at.isoformat()
            }
            for role in roles
        ]
    except Exception as e:
        logger.error(f"Error getting roles: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve roles"
        )

@router.post("/")
async def create_role(
    role_name: str = Form(...),
    role_description: str = Form(...),
    db: Session = Depends(get_db)
):
    """Create a new role"""
    try:
        # Check if role already exists
        existing_role = db.query(Role).filter(Role.role_name == role_name).first()
        if existing_role:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Role with this name already exists"
            )
        
        role = Role(
            role_name=role_name,
            role_description=role_description
        )
        
        db.add(role)
        db.commit()
        db.refresh(role)
        
        return {
            "message": "Role created successfully",
            "role_id": role.role_id,
            "role_name": role.role_name
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating role: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create role"
        )

@router.post("/match")
async def match_role(
    resume_id: int = Form(...),
    role_id: int = Form(...),
    db: Session = Depends(get_db)
):
    """Match resume against specific role"""
    try:
        # Get resume
        resume = db.query(Resume).filter(Resume.resume_id == resume_id).first()
        if not resume:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Resume not found"
            )
        
        # Get role
        role = db.query(Role).filter(Role.role_id == role_id).first()
        if not role:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Role not found"
            )
        
        resume_text = resume.content_text or ""
        job_description = f"Role: {role.role_name}\n\nDescription: {role.role_description}"
        
        # Perform matching analysis
        resume_skills = ollama_service.extract_skills_from_resume(resume_text)
        skills_analysis = ollama_service.analyze_skills_gap(resume_skills, job_description)
        resume_score = ollama_service.score_resume(resume_text, job_description)
        
        match_result = {
            "role": {
                "role_id": role.role_id,
                "role_name": role.role_name,
                "role_description": role.role_description
            },
            "match_percentage": resume_score.get('overall_score', 0),
            "skills_analysis": skills_analysis,
            "resume_score": resume_score,
            "recommendations": f"Based on the analysis, your resume matches {resume_score.get('overall_score', 0)}% with the {role.role_name} role."
        }
        
        return match_result
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error matching role: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to match role"
        )

@router.get("/{role_id}")
async def get_role(role_id: int, db: Session = Depends(get_db)):
    """Get specific role by ID"""
    try:
        role = db.query(Role).filter(Role.role_id == role_id).first()
        if not role:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Role not found"
            )
        
        return {
            "role_id": role.role_id,
            "role_name": role.role_name,
            "role_description": role.role_description,
            "created_at": role.created_at.isoformat()
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting role: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve role"
        )