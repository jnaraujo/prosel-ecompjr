from fastapi import FastAPI
from database import engine, Base
from routes import forms_routes, user_routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:5173",
    "https://ecompjr-prosel.netlify.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}

app.include_router(forms_routes.router)
app.include_router(user_routes.router)