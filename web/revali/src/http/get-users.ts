import { Users } from "../models/UsersModel"
import { api } from "../services/api";
 
export async function getUsers(): Promise<Users[]> {
    const response = await api.get<Users[]>('/users')

    return response.data;
}