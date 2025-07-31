import axios from "axios";
import { useAuthStore } from "../stores/auth_store";

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export const getCommentsByTask = async (taskId: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.get(`${baseUrl}/task/${taskId}/comment`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const createComment = async (taskId: string, comment: string) => {
 
    const token = useAuthStore.getState().token;
    const response = await axios.post(`${baseUrl}/task/${taskId}/comment`, {
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
    
    const response = await axios.delete(`${baseUrl}/task/${taskId}/comment/${commentId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};