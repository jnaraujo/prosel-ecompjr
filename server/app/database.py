from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from envs import database_url

SQLALCHEMY_DATABASE_URL = database_url

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    # This is to avoid mysql disconnection after 8 hours
    pool_recycle=3600
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()