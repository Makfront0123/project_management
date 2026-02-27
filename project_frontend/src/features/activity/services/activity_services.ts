import axios from "axios";
import type { Activity } from "../types/Activity";

export const getTaskActivities = async (
    taskId: string
): Promise<{ activities: Activity[] }> => {

    const res = await axios.get(`/tasks/${taskId}/activities`);

    return res.data;
};