import axios from 'axios'
import type { AuthResponse, User } from '../types/auth'
import { useAuthStore } from '../stores/auth_store'

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

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

export const verifyOtp = async (email: string, otp: string) => {
    const response = await axios.post(`${baseUrl}/verify`, {
        email,
        otp,
    })
    return response.data
}

export const resendOtp = async (email: string) => {
    const response = await axios.post(`${baseUrl}/resend`, {
        email,
    })
    return response.data
}

export const forgotPassword = async (email: string) => {
    const response = await axios.post(`${baseUrl}/forgot-password`, {
        email,
    })
    return response.data
}

export const resetPassword = async (email: string, password: string, confirmPassword: string) => {
    const response = await axios.post(`${baseUrl}/reset-password`, {
        email,
        password,
        confirmPassword,
    })
    return response.data
}

export const verifyForgotPasswordOtp = async (email: string, otp: string) => {
    const response = await axios.post(`${baseUrl}/verify-forgot`, {
        email,
        otp,
    })
    return response.data
}

export const resendForgotPasswordOtp = async (email: string) => {
    const response = await axios.post(`${baseUrl}/resend-forgot-otp`, {
        email,
    })
    return response.data
}