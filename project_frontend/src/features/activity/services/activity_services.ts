import axios from "axios";
import type { Activity } from "../types/Activity";
import { useAuthStore } from "@/features/auth/store/auth_store";

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
export const getTaskActivities = async (
    taskId: string
): Promise<{ activities: Activity[] }> => {
    const token = useAuthStore.getState().token;
    const res = await axios.get(`${baseUrl}/activities/task/${taskId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log('res', res)
    return res.data;
};
export const getTeamActivities = async (teamId: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.get(`${baseUrl}/activities/team/${teamId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};