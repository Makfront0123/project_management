import { useEffect } from "react";
import { useActivityStore } from "../store/activity_store";

export const useActivity = (taskId?: string) => {
    const { activities, fetchTaskActivities, isLoading } = useActivityStore();

    useEffect(() => {
        if (taskId) {
            fetchTaskActivities(taskId);
        }
    }, [fetchTaskActivities, taskId]);

    return {
        activities,
        isLoading,
    };
};