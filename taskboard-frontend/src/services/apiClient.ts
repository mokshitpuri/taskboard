import axios from 'axios';

// Choose which backend to use
// For Node backend
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_NODE_API,
  headers: { 'Content-Type': 'application/json' },
});

// For FastAPI backend (if needed separately)
export const fastApiClient = axios.create({
  baseURL: process.env.REACT_APP_FASTAPI_API,
  headers: { 'Content-Type': 'application/json' },
});

export default apiClient;