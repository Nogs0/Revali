import { Products } from "../models/ProductsModel";
import { api } from "../services/api";
 
export async function getProduct(): Promise<Products[]> {
    const response = await api.get<Products[]>('/produtos')

    return response.data;
}