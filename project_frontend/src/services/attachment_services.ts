import axios from "axios";
import { useAuthStore } from "../stores/auth_store";

const baseUrl = "/api/v1";

export const createAttachment = async (taskId: string, teamId: string, file: File) => {
    const token = useAuthStore.getState().token;
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(`${baseUrl}/teams/${teamId}/tasks/${taskId}/attachments`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getAllAttachments = async (taskId: string, teamId: string) => {

    const token = useAuthStore.getState().token;
    const response = await axios.get(`${baseUrl}/teams/${teamId}/tasks/${taskId}/attachments`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getAttachment = async (attachmentId: string, teamId: string) => {

    const token = useAuthStore.getState().token;
    const response = await axios.get(`${baseUrl}/teams/${teamId}/attachments/${attachmentId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(response.data);
    return response.data;
};

export const updateAttachment = async (attachmentId: string, teamId: string, file: File) => {

    const token = useAuthStore.getState().token;
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.put(`${baseUrl}/teams/${teamId}/attachments/${attachmentId}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(response.data);
    return response.data;
};

export const deleteAttachment = async (attachmentId: string, teamId: string) => {
    const token = useAuthStore.getState().token;

    const response = await axios.delete(`${baseUrl}/teams/${teamId}/attachments/${attachmentId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log(response.data);
    return response.data;
};


export const deleteByTaskId = async (taskId: string) => {
    const token = useAuthStore.getState().token;

    const response = await axios.delete(`${baseUrl}/tasks/${taskId}/attachments`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(response.data);
    return response.data;
};