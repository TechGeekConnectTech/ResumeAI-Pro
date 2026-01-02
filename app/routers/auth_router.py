from fastapi import APIRouter, Depends, HTTPException, status, Form
from sqlalchemy.orm import Session
from dependencies import get_db
from app.models.user import User  # Assuming you have a User model defined
import logging

logger = logging.getLogger(__name__)



router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)



@router.post("/login")
def login(username: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    logger.info(f"Login attempt for username: {username}")
    
    # Placeholder for actual authentication logic
    user = db.query(User).filter(User.user_name == username).first()
    
    if not user:
        logger.warning(f"User not found: {username}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    
    if not password == user.user_password:
        logger.warning(f"Invalid password for user: {username}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    
    logger.info(f"Login successful for user: {username}")
    return {"message": "Login successful", "user_id": user.user_id, "username": user.user_name}

@router.post("/register")
def register(
    username: str = Form(...),
    password: str = Form(...),
    email: str = Form(...), 
    mobile: str = Form(...), 
    db: Session = Depends(get_db)
):
    # Check if user already exists by username or email
    existing_user = db.query(User).filter(
        (User.user_name == username) | (User.user_email == email)
    ).first()
    
    if existing_user:
        if existing_user.user_name == username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already exists",
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already exists",
            )
    
    # Create new user
    user = User(
        user_name=username,
        user_password=password,
        user_email=email,
        user_mobile=mobile,
        user_role='user'
    )
    
    try:
        db.add(user)
        db.commit()
        db.refresh(user)
        return {"message": "User registered successfully", "user_id": user.user_id}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to register user"
        )