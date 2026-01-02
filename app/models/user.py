from sqlalchemy import Column, Integer, String, DateTime
from database import Base
from datetime import datetime


class User(Base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True)
    user_name = Column(String(50), unique=True, nullable=False)
    user_email = Column(String(120), unique=True, nullable=False)
    user_mobile = Column(String(15), unique=True, nullable=True)
    user_password = Column(String(128), nullable=False)
    user_role = Column(String(20), nullable=False, default='user')
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<User(username='{self.user_name}', email='{self.user_email}')>"