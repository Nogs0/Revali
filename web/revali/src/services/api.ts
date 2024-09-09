import axios from "axios";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Se o token for inválido ou a autenticação falhar
      localStorage.clear(); // Limpa o armazenamento local
      toast.error('Sessão expirada. Por favor, faça login novamente.'); // Mostra mensagem de erro
      window.location.href = '/login'; // Redireciona para a página de login
    }
    return Promise.reject(error);
  }
);