from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime


class Resume(Base):
    __tablename__ = 'resumes'

    resume_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    file_name = Column(String(255), nullable=False)
    file_path = Column(String(255), nullable=False)
    content_text = Column(Text, nullable=True)  # Store parsed resume text
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # user = relationship("User", back_populates="resumes")
    def __repr__(self):
        return f"<Resume(title='{self.file_name}', user_id='{self.user_id}')>"