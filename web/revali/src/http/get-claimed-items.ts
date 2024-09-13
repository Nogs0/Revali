import { ResgateData } from "../models/ClaimedItemsModel";
import { api } from "../services/api";

export async function getItemsNotClaimedYet(id: number): Promise<ResgateData[]> {
    const accessToken = localStorage.getItem('token-validate');

    if (!accessToken) {
        throw new Error('Access token is not available');
    }

    try {
        const response = await api.post<ResgateData[]>(
            '/itens-resgate-nao-resgatados',
            { id }, // Envia o id no corpo da requisição
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error; // Re-lança o erro após registrá-lo no console
    }
}
