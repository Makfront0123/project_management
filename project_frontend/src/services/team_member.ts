import axios from "axios";
import { useAuthStore } from "../stores/auth_store";
const baseUrl = '/api/v1'

export const addMember = async (userId: string, teamId: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.post(`${baseUrl}/teams/${teamId}/members`, {
        userId,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getTeamMembers = async (teamId: string) => {
    const token = useAuthStore.getState().token
    const response = await axios.get(`${baseUrl}/teams/${teamId}/members`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const deleteMember = async (memberId: string, teamId: string) => {
    const token = useAuthStore.getState().token
    const response = await axios.delete(`${baseUrl}/teams/${teamId}/members/${memberId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const requestToJoinTeam = async (teamId: string) => {
    const token = useAuthStore.getState().token
    const response = await axios.post(`${baseUrl}/teams/${teamId}/join-requests`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const getPendingRequests = async () => {
    const token = useAuthStore.getState().token
    const response = await axios.get(`${baseUrl}/teams/pending`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const getPendingMembersOfTeam = async (teamId: string) => {
    const token = useAuthStore.getState().token
    const response = await axios.get(`${baseUrl}/teams/${teamId}/pending-members`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const rejectRequest = async (userId: string, teamId: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.delete(`${baseUrl}/teams/${teamId}/join-requests/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const confirmJoinWithCode = async (teamId: string, code: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.post(`${baseUrl}/teams/${teamId}/members/confirm`, {
        code,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const getTeamCode = async (teamId: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.get(`${baseUrl}/teams/${teamId}/code`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};