import { toast } from "sonner";
import { api } from "../services/api";

export async function registerUser(name: string, email: string, cpf: string) {
  try {
    const accessToken = localStorage.getItem('token-validate');

    // Verifica se o token existe antes de fazer a requisição, se necessário
    if (!accessToken) {
      toast.error('Erro de autenticação. Por favor, faça login novamente.');
      return;
    }

    // Fazendo a requisição POST para o endpoint da API
    const response = await api.post(
      '/register-doador',
      { name, email, cpf },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Obtendo a senha gerada a partir da resposta
    const { senha } = response.data;

    toast.success("Usuário registrado com sucesso!");

    return { email, senha }; // Retorna o email e a senha gerada
  } catch (error: any) {
    // Tratamento de erro aprimorado
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(`Erro: ${error.response.data.message}`);
    } else {
      toast.error("Erro ao registrar o usuário. Tente novamente mais tarde.");
    }
    console.error("Erro ao registrar o usuário:", error);
  }
}
