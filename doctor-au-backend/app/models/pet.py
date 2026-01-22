from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Pet(Base):
    __tablename__ = "pets"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    especie = Column(String, nullable=False)
    raca = Column(String)
    idade = Column(Integer)
    peso = Column(Float)
    
    # Relacionamentos
    dono_id = Column(Integer, ForeignKey("users.id"))
    dono = relationship("User", back_populates="pets")
    
    agendamentos = relationship("Agendamento", back_populates="pet")