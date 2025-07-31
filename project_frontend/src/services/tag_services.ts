import axios from "axios";
import { useAuthStore } from "../stores/auth_store";
import type { Tag } from "../types/tag";

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export const createTag = async (name: string, teamId: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.post(`${baseUrl}/teams/${teamId}/tags`, {
        name,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getAllTags = async (teamId: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.get(`${baseUrl}/teams/${teamId}/tags`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getTagById = async (tagId: string, teamId: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.get(`${baseUrl}/teams/${teamId}/tags/${tagId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const deleteTag = async (tagId: string, teamId: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.delete(`${baseUrl}/teams/${teamId}/tags/${tagId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const updateTag = async (
  tagId: string,
  teamId: string,
  data: Partial<Pick<Tag, "name">>
) => {
    const token = useAuthStore.getState().token;
    const response = await axios.put(`${baseUrl}/teams/${teamId}/tags/${tagId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};  