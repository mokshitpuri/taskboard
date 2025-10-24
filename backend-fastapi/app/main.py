from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.tasks import router as tasks_router

app = FastAPI(title="TaskBoard")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks_router, prefix="/api/v1/tasks", tags=["tasks"])
