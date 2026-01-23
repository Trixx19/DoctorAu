from pydantic import BaseModel
from typing import Optional

class PetBase(BaseModel):
    nome: str
    especie: str
    raca: Optional[str] = None
    idade: Optional[int] = None
    peso: Optional[float] = None
    
    tutor: Optional[str] = None
    foto: Optional[str] = None

class PetCreate(PetBase):
    pass

class PetResponse(PetBase):
    id: int
    dono_id: int
    
    class Config:
        from_attributes = True