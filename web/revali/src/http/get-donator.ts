import { Donator } from "../models/DonatorModel";
import { api } from "../services/api";
 
export async function getDonator(): Promise<Donator[]> {
    const accessToken = localStorage.getItem('token-validate');

    if (!accessToken) {
        throw new Error('Access token is not available');
    }

    try {
        const response = await api.get<Donator[]>('/doadores', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw the error after logging it
    }
}