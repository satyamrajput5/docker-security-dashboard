from fastapi import FastAPI
from docker_service import get_running_containers, get_summary, get_images, get_system, get_volumes, get_networks, get_security, stop_container
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return{
        "message" : "Docker Security Dashboard API"
    }

@app.get("/health")
def health():
    return{
        "status" : "healthy"
    }

@app.get("/containers")
def containers():
    return get_running_containers()

@app.get("/summary")
def summary():
    return get_summary()

@app.get("/images")
def images():
    return get_images()

@app.get("/system")
def system():
    return get_system()

@app.get("/volumes")
def volumes():
    return get_volumes()

@app.get("/networks")
def networks():
    return get_networks()

@app.get("/security")
def security():
    return get_security()

@app.post("/containers/{container_id}/stop")
def stop(container_id: str):
    return stop_container(container_id)