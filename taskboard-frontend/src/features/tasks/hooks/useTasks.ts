import { useState, useEffect } from 'react';
import { getTasks, Task, deleteTask, updateTask } from '../tasks.api';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      await fetchTasks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpdateTask = async (id: number, title: string, description?: string) => {
    try {
      await updateTask(id, title, description);
      await fetchTasks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, setTasks, loading, error, fetchTasks, handleDeleteTask, handleUpdateTask };
};