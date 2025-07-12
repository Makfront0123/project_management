import axios from "axios";
import { useAuthStore } from "../stores/auth_store";
const baseUrl = '/api/v1'

export const getTeamMembers = async (teamId: string) => {
    const token = useAuthStore.getState().token
    const response = await axios.get(`${baseUrl}/teams/${teamId}/members`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log('teamMembers', response.data)
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