from fastapi import FastAPI
from app.database import Base, engine
# O import abaixo carrega o __init__.py de models, registrando todas as tabelas (User, Pet, etc.)
import app.models 
from app.routers import user, auth, pets, servicos, agendamentos

app = FastAPI(title="DoctorAu API")

# Cria as tabelas no banco ao iniciar
# Como importamos app.models, o Base.metadata agora conhece todas as tabelas novas
Base.metadata.create_all(bind=engine)

# Registra as rotas
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(pets.router)
app.include_router(servicos.router)
app.include_router(agendamentos.router)

@app.get("/")
def read_root():
    return {"status": "DoctorAu API rodando 🐶"}