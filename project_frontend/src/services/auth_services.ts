import axios from 'axios'
import type { AuthResponse, User } from '../types/auth'
import { useAuthStore } from '../stores/auth_store'

const baseUrl = '/api/v1'

export const loginUser = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${baseUrl}/login`, {
        email,
        password,
    })
    return response.data
}
export const registerUser = async (formData: FormData): Promise<User> => {

    const response = await axios.post(`${baseUrl}/register`, formData);


    return response.data;

};
export const logoutUser = async () => {

    const response = await axios.post(`${baseUrl}/logout`)
    return response.data
}

export const getUserTeamStatus = async () => {
    const token = useAuthStore.getState().token
    const response = await axios.get(`${baseUrl}/users/teamStatus`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}