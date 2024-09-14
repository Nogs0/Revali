import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom'

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Se o token for inválido ou a autenticação falhar
      const navigate = useNavigate();
      localStorage.clear(); // Limpa o armazenamento local
      toast.error('Sessão expirada. Por favor, faça login novamente.'); // Mostra mensagem de erro
      navigate('/');
    }
    return Promise.reject(error);
  }
);