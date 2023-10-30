from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas import schemas
from database import get_db
from models.forms import Form
from repositories.form_repository import FormRepository
from libs.security import get_current_user

router = APIRouter()

@router.post("/forms", status_code=201)
def create_form(form: schemas.Form, db: Session = Depends(get_db)):
    form = FormRepository.save(db, Form(**form.dict()))
    return {
        "success": True,
    }

@router.get("/forms")
def get_forms(db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return FormRepository.find_all(db)