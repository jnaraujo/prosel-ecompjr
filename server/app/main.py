from fastapi import FastAPI
from database import engine, Base
from routers import forms_routes, user_routes

app = FastAPI()
Base.metadata.create_all(bind=engine)

@app.get("/")
async def root():
    return {"message": "Hello World"}

app.include_router(forms_routes.router)
app.include_router(user_routes.router)