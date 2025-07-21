import axios from "axios";
import { useAuthStore } from "../stores/auth_store";

const baseUrl = "/api/v1";

export const addTagToTask = async (taskId: string, tagId: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.post(`${baseUrl}/tasks/${taskId}/tags/${tagId}`, {
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const removeTagFromTask = async (taskId: string, tagId: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.delete(`${baseUrl}/tasks/${taskId}/tags/${tagId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getAllTagsOfTask = async (taskId: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.get(`${baseUrl}/tasks/${taskId}/tags`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getTagOfTask = async (taskId: string, tagId: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.get(`${baseUrl}/tasks/${taskId}/tags/${tagId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};  