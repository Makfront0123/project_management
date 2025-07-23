import axios from "axios";
import { useAuthStore } from "../stores/auth_store";

const baseUrl = "/api/v1";

export const getCommentsByTask = async (taskId: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.get(`${baseUrl}/projects/${taskId}/comments`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const createComment = async (taskId: string, comment: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.post(`${baseUrl}/projects/${taskId}/comments`, {
        comment,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const deleteComment = async (taskId: string, commentId: string) => {
    const token = useAuthStore.getState().token;       
    
    const response = await axios.delete(`${baseUrl}/projects/${taskId}/comments/${commentId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};