from sqlalchemy import Column, Integer, String, Enum, Boolean
from sqlalchemy.orm import relationship
from app.database import Base
import enum

class PerfilEnum(str, enum.Enum):
    ADMIN = "ADMIN"
    MEDICO = "MEDICO"
    CLIENTE = "CLIENTE"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    senha = Column(String, nullable=False)
    perfil = Column(Enum(PerfilEnum), default=PerfilEnum.CLIENTE)

    email_verificado = Column(Boolean, default=False)
    email_token = Column(String, nullable=True)

    pets = relationship("Pet", back_populates="dono")
    agendamentos_vet = relationship("Agendamento", back_populates="veterinario")