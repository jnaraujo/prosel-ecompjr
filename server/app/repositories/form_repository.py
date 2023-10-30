from sqlalchemy.orm import Session
from models.forms import Form

class FormRepository:
  @staticmethod
  def save(db:Session, form: Form):
    db.add(form)
    db.commit()
    db.refresh(form)
    return form

  @staticmethod
  def find_all(db:Session):
    return db.query(Form).all()