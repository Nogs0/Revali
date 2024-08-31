import { Classification } from "../models/ClassificationModel";
import { api } from "../services/api";
 
export async function getClassification(): Promise<Classification[]> {
    const response = await api.get<Classification[]>('/classificacoes')

    return response.data;
}