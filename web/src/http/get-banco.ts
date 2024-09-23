import { BancoDeAlimentos } from "../models/BancoDeAlimentoModel";
import { api } from "../services/api";
 
export async function getBanco(): Promise<BancoDeAlimentos[]> {
    const accessToken = localStorage.getItem('token-validate');

    // Verifica se o token existe antes de fazer a requisição
    if (!accessToken) {
        throw new Error('Access token is not available');
    }

    try {
        const response = await api.get<BancoDeAlimentos[]>('/bancos-de-alimentos', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        // Trata o erro da requisição
        console.error('Error fetching banco:', error);
        throw error; // Re-throw the error after logging it
    }
}
