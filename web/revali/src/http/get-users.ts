import axios from "axios"
import { Users } from "../models/UsersModel"
 
export async function getUsers(): Promise<Users[]> {
    const response = await axios.get<Users[]>('http://127.0.0.1:8000/api/users')

    return response.data;
}