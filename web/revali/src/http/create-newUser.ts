import { toast } from "sonner";
import { api } from "../services/api";

export async function registerUser(name: string, email: string, cpf: string) {
    try {
        // Fazendo a requisição POST para o endpoint da API
        const response = await api.post('/register-doador', { // Substitua pela URL correta da sua API
            name: name,
            email: email,
            cpf: cpf
        });

        // Obtendo a senha gerada a partir da resposta
        const { senha } = response.data; 

        console.log(`Usuário registrado com sucesso. Email: ${email}, Senha: ${senha}`);
        return { email, senha }; // Retorna o email e a senha gerada
    } catch (error) {
        toast.error("aaaaaaa")
    }
}