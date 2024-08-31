import { BancoDeAlimentos } from "../models/BancoDeAlimentoModel";
import { api } from "../services/api";
 
export async function getBanco(): Promise<BancoDeAlimentos[]> {
    const response = await api.get<BancoDeAlimentos[]>('/bancos-de-alimentos')

    return response.data;
}