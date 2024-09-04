import { Classification } from "../models/ClassificationModel";
import { api } from "../services/api";

export async function getClassification(): Promise<Classification[]> {
    const accessToken = localStorage.getItem('token-validate');

    // Verifica se o token existe antes de fazer a requisição
    if (!accessToken) {
        throw new Error('Access token is not available');
    }

    try {
        const response = await api.get<Classification[]>('/classificacoes', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        // Trata o erro da requisição
        console.error('Error fetching classifications:', error);
        throw error; // Re-throw the error after logging it
    }
}