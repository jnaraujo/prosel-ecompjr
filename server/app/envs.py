from dotenv import load_dotenv
import os

load_dotenv()

database_url = os.getenv("DATABASE_URL")
jwt_secret_key = os.getenv("JWT_SECRET_KEY")