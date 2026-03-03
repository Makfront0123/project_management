import { useAuthStore } from "@/features/auth/store/auth_store";
import axios from "axios"

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/v1`

export const getProfile = async () => {
    const token = useAuthStore.getState().token;
    const response = await axios.get(`${baseUrl}/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return response.data
}

export const updateUser = async (data: {
    name?: string
    email?: string
    image?: File | null
}) => {
    const token = useAuthStore.getState().token;

    const formData = new FormData()

    if (data.name) formData.append("name", data.name)
    if (data.email) formData.append("email", data.email)
    if (data.image) formData.append("image", data.image)

    const response = await axios.put(`${baseUrl}/users`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return response.data
}

export const deleteUser = async () => {
    const token = useAuthStore.getState().token;
    const response = await axios.delete(`${baseUrl}/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return response.data
}