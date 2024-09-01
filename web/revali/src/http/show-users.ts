import { Users } from "../models/UsersModel"
import { api } from "../services/api";
 
export async function showUsers(id: number): Promise<Users> {
    const response = await api.get<Users>(`/users/${id}`)

    return response.data;
}