from sqlalchemy.orm import Session
from models import user

class UserRepository:

  @staticmethod
  def save(db:Session, user:user.User):
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
  
  @staticmethod
  def find_by_email(db:Session, email:str):
    return db.query(user.User).filter(user.User.email == email).first()