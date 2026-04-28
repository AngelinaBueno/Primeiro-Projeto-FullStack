from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

tarefas = [
    {"id": 1, "titulo": "Estudar FastAPI", "feita": False},
    {"id": 2, "titulo": "Estudar React", "feita": False},
]

class Tarefa(BaseModel):
    titulo: str
    feita: bool = False

@app.get("/tarefas")
def listar_tarefas():
    return tarefas

@app.post("/tarefas")
def criar_tarefa(tarefa: Tarefa):
    nova = {"id": len(tarefas) + 1, "titulo": tarefa.titulo, "feita": tarefa.feita}
    tarefas.append(nova)
    return nova

@app.delete("/tarefas/{id}")
def deletar_tarefa(id: int):
    global tarefas
    tarefas = [t for t in tarefas if t["id"] != id]
    return {"mensagem": "deletada"}