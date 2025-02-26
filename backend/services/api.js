import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api' // URL del backend
});

export const getReportes = async () => {
  const response = await api.get('/reportes');
  return response.data;
};
