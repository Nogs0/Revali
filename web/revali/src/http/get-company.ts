import { Company } from "../models/CompanyModel";
import { api } from "../services/api";
 
export async function getCompany(): Promise<Company[]> {
    const response = await api.get<Company[]>('/empresas-parceiras')

    return response.data;
}