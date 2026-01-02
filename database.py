from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
DatabaseURL = "mysql+pymysql://root:passw0rd@77.37.45.138/ai_analyser"
engine = create_engine(DatabaseURL, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()