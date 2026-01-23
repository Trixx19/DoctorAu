from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.pet import Pet  
from app.models.user import User
from app.schemas.pet import PetCreate, PetResponse
from app.dependencies import obter_usuario_logado

router = APIRouter(prefix="/pets", tags=["Pets"])

@router.post("/", response_model=PetResponse, status_code=201)
def criar_pet(
    pet: PetCreate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(obter_usuario_logado)
):
    novo_pet = Pet(**pet.dict(), dono_id=current_user.id)
    db.add(novo_pet)
    db.commit()
    db.refresh(novo_pet)
    return novo_pet

@router.get("/", response_model=List[PetResponse])
def listar_meus_pets(
    db: Session = Depends(get_db), 
    current_user: User = Depends(obter_usuario_logado)
):
    return db.query(Pet).filter(Pet.dono_id == current_user.id).all()

@router.delete("/{pet_id}", status_code=204)
def deletar_pet(
    pet_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(obter_usuario_logado)
):
    pet = db.query(Pet).filter(Pet.id == pet_id).first()
    
    if not pet:
        raise HTTPException(status_code=404, detail="Pet não encontrado")
    
    if pet.dono_id != current_user.id:
        raise HTTPException(status_code=403, detail="Você não tem permissão para deletar este pet")

    db.delete(pet)
    db.commit()