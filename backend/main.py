# backend/main.py
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import router as api_router  # ✅ absolute import
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(api_router)

# Allow requests from frontend (adjust if deploying elsewhere)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","https://resume-parser-peach.vercel.app"
],  # or ["*"] during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router)
