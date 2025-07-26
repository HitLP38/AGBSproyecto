# app/schemas/note.py

from pydantic import BaseModel
from typing import List

class NoteSelection(BaseModel):
    scores: List[int]
