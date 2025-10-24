import apiClient from '../../services/apiClient';

export interface Task {
  id: number;
  title: string;
  description?: string;
}

export const getTasks = async (): Promise<Task[]> => {
  const res = await apiClient.get('/');
  return res.data;
};

export const createTask = async (title: string, description?: string): Promise<Task> => {
  const res = await apiClient.post('/', { title, description });
  return res.data;
};

export const updateTask = async (id: number, title: string, description?: string): Promise<Task> => {
  const res = await apiClient.put(`/${id}`, { title, description });
  return res.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await apiClient.delete(`/${id}`);
};