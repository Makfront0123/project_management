import axios from "axios";
import type { Activity } from "../types/Activity";

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
export const getTaskActivities = async (
    taskId: string
): Promise<{ activities: Activity[] }> => {

    const res = await axios.get(`${baseUrl}/activities/task/${taskId}`);
    console.log('res', res)
    return res.data;
};