import axios from "axios";
import { useAuthStore } from "../stores/auth_store";

const baseUrl = "/api/v1";

export const assignTask = async (taskId: string, userId: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.post(`${baseUrl}/tasks/${taskId}/assignments`, {
        userId,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const unassignTask = async (taskId: string, userId: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.delete(`${baseUrl}/tasks/${taskId}/assignments/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getTasksToUserAssignments = async (taskId: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.get(`${baseUrl}/user/tasks/${taskId}/assignments`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};


export const getAllUsersAssignedToTask = async (taskId: string, teamId: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.get(`${baseUrl}/tasks/${taskId}/assignments?teamId=${teamId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const completeAssignedTask = async (taskId: string, userId: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.post(`${baseUrl}/tasks/${taskId}/assignments/complete`, {
        userId,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(response.data);
    return response.data;
};