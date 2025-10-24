from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

TASKS = []

class Task(BaseModel):
    id: int
    title: str
    description: Optional[str] = None

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None

@router.get("/", response_model=List[Task])
def get_tasks():
    return TASKS

@router.post("/", response_model=Task)
def create_task(task: TaskCreate):
    new_task = Task(id=len(TASKS)+1, title=task.title, description=task.description)
    TASKS.append(new_task)
    return new_task

@router.put("/{task_id}", response_model=Task)
def update_task(task_id: int, task: TaskCreate):
    for t in TASKS:
        if t.id == task_id:
            t.title = task.title
            t.description = task.description
            return t
    raise HTTPException(status_code=404, detail="Task not found")

@router.delete("/{task_id}")
def delete_task(task_id: int):
    for t in TASKS:
        if t.id == task_id:
            TASKS.remove(t)
            return {"message": "Task deleted"}
    raise HTTPException(status_code=404, detail="Task not found")
