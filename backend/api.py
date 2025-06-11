from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import uuid

router = APIRouter()

# In-memory store (replace with DB if needed)
layouts_db = {}

class ReportLayout(BaseModel):
    id: str = None
    title: str
    sections: list

@router.get("/layouts")
def get_layouts():
    return list(layouts_db.values())

@router.post("/layouts")
def save_layout(layout: ReportLayout):
    layout.id = layout.id or str(uuid.uuid4())
    layouts_db[layout.id] = layout.dict()
    return layouts_db[layout.id]

@router.delete("/layouts/{layout_id}")
def delete_layout(layout_id: str):
    if layout_id in layouts_db:
        del layouts_db[layout_id]
        return {"success": True}
    raise HTTPException(status_code=404, detail="Layout not found")
