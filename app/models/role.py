from sqlalchemy import Column, Integer, String, DateTime
from database import Base
from datetime import datetime


class Role(Base):
    __tablename__ = 'roles'

    role_id = Column(Integer, primary_key=True)
    role_name = Column(String(50), unique=True, nullable=False)
    role_description = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)    

    def __repr__(self):
        return f"<Role(name='{self.role_name}', description='{self.role_description}')>"