from pydantic import BaseModel
from typing import List, Optional

class Section(BaseModel):
    type: str  # 'text', 'image', 'table', or 'chart'
    content: Optional[str] = None
    url: Optional[str] = None
    data: Optional[list] = None

class ReportLayout(BaseModel):
    id: Optional[str] = None
    title: str
    sections: List[Section]
