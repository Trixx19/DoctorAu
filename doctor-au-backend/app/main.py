from fastapi import FastAPI
from app.database import Base, engine
from app.routers import user as user_router

app = FastAPI(title="DoctorAu API")

# Cria as tabelas
Base.metadata.create_all(bind=engine)

# Rotas
app.include_router(user_router.router)

@app.get("/")
def read_root():
    return {"status": "DoctorAu API rodando 🐶"}
