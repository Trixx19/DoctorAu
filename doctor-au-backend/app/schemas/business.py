from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum

# Precisamos do Enum aqui para validar o status nas rotas
class StatusAgendamento(str, Enum):
    PENDENTE = "PENDENTE"
    CONFIRMADO = "CONFIRMADO"
    CONCLUIDO = "CONCLUIDO"
    CANCELADO = "CANCELADO"

# --- PET ---
class PetBase(BaseModel):
    nome: str
    especie: str
    raca: Optional[str] = None
    idade: Optional[int] = None
    peso: Optional[float] = None

class PetCreate(PetBase):
    pass

class PetResponse(PetBase):
    id: int
    dono_id: int
    class Config:
        from_attributes = True

# --- SERVICO ---
class ServicoBase(BaseModel):
    nome: str
    descricao: Optional[str] = None
    preco: float

class ServicoCreate(ServicoBase):
    pass

class ServicoResponse(ServicoBase):
    id: int
    class Config:
        from_attributes = True

# --- AGENDAMENTO (CONSULTA) ---
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

# --- PRONTUARIO ---
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