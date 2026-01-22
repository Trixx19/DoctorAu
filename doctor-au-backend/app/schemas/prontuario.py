from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProntuarioBase(BaseModel):
    diagnostico: str
    prescricao: Optional[str] = None

class ProntuarioCreate(ProntuarioBase):
    agendamento_id: int

class ProntuarioResponse(ProntuarioBase):
    id: int
    data_registro: datetime
    agendamento_id: int
    
    class Config:
        from_attributes = True