from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.agendamento import StatusAgendamento # Importa do Model para fonte única de verdade

class AgendamentoBase(BaseModel):
    data_hora: datetime
    observacoes: Optional[str] = None

class AgendamentoCreate(AgendamentoBase):
    pet_id: int
    servico_id: int
    veterinario_id: int

class AgendamentoResponse(AgendamentoBase):
    id: int
    status: StatusAgendamento
    pet_id: int
    servico_id: int
    veterinario_id: int
    
    class Config:
        from_attributes = True