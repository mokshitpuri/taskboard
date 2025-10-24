import axios from 'axios';

const apiClient = axios.create({
  // baseURL: 'http://localhost:5000/api/tasks', // node 
  baseURL: 'http://127.0.0.1:8000/api/v1/tasks', // FastAPI base URL
  headers: { 'Content-Type': 'application/json' },
});

export default apiClient;