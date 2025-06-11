# backend/api.py
from dotenv import load_dotenv
# Load environment variables
load_dotenv()
from fastapi import APIRouter
import psycopg2
from pydantic import BaseModel
from fastapi import APIRouter, Query
import os
from models import ReportLayout

router = APIRouter()

# In-memory layout storage
layouts = {}

@router.post("/layouts")
def save_layout(layout: ReportLayout):
    layout.id = layout.id or str(uuid.uuid4())
    layouts[layout.id] = layout
    return layout

@router.get("/layouts")
def get_layouts():
    return list(layouts.values())