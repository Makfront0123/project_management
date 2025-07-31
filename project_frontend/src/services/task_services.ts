import axios from "axios";
import type { TaskInput } from "../types/task";
import { useAuthStore } from "../stores/auth_store";

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
export const createTask = async (projectId: string, data: TaskInput) => {
    const token = useAuthStore.getState().token
    const response = await axios.post(`${baseUrl}/projects/${projectId}/tasks`, data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
};

export const getTasks = async (projectId: string) => {
    const token = useAuthStore.getState().token
    const response = await axios.get(`${baseUrl}/projects/${projectId}/tasks`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return response.data
}

export const deleteTask = async (id: string, projectId: string) => {
    const token = useAuthStore.getState().token
    const response = await axios.delete(`${baseUrl}/projects/${projectId}/tasks/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return response.data
}

export const updateTask = async (id: string, data: TaskInput, projectId: string) => {
    const token = useAuthStore.getState().token
    const response = await axios.put(`${baseUrl}/projects/${projectId}/tasks/${id}`, data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return response.data
}