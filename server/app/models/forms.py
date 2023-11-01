from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base

class Form(Base):
  __tablename__ = "forms"

  id:int = Column(Integer, primary_key=True, index=True)
  name:str = Column(String)
  email:str = Column(String, unique=True, index=True)
  description:str = Column(String)
  created_at = Column(DateTime(timezone=True), server_default=func.now())