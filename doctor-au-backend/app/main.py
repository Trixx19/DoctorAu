from fastapi import FastAPI
from app.database import Base, engine
from app.routers import user, auth, pet
from app.models import business # Importante para criar as tabelas novas

app = FastAPI(title="DoctorAu API")

# Cria as tabelas no banco ao iniciar
Base.metadata.create_all(bind=engine)

# Registra as rotas
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(pet.router)

@app.get("/")
def read_root():
    return {"status": "DoctorAu API rodando 🐶"}