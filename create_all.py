from database import Base, engine
from app.models.user import User
from app.models.role import Role
from app.models.resume import Resume

Base.metadata.create_all(bind=engine)