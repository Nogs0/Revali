import { ProductsRescue } from "../models/ProductsRescueModel";
import { api } from "../services/api";
 
export async function getProductRescue(): Promise<ProductsRescue[]> {
    const response = await api.get<ProductsRescue[]>('/produtos-resgate')

    return response.data;
}