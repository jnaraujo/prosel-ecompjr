from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base

class User(Base):
  __tablename__ = "users"

  id:int = Column(Integer, primary_key=True, index=True)
  email:str = Column(String, unique=True, index=True)
  password:str = Column(String)
  created_at = Column(DateTime(timezone=True), server_default=func.now())