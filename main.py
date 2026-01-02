from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth_router, resume_router, role_router
import uvicorn
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="ResumeAI Pro API",
    description="Intelligent Career Acceleration Platform - AI-powered resume analysis and career guidance",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3006", 
        "http://127.0.0.1:3006",
        "http://77.37.45.138:3006"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router.router)
app.include_router(resume_router.router)
app.include_router(role_router.router)

@app.get("/")
async def root():
    return {
        "message": "ResumeAI Pro API",
        "description": "Intelligent Career Acceleration Platform",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "auth": "/auth",
            "resume": "/resume", 
            "roles": "/roles",
            "docs": "/docs"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ResumeAI Pro"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8006,
        reload=True,
        log_level="info"
    )