import { useEffect } from "react";
import { useActivityStore } from "../store/activity_store";

export const useTeamActivity = (teamId: string) => {
    const { activities, isLoading, fetchTeamActivities, clearActivities } =
        useActivityStore();

    useEffect(() => {
        if (!teamId || teamId === "undefined") return;

        fetchTeamActivities(teamId);

        return () => clearActivities();
    }, [clearActivities, fetchTeamActivities, teamId]);

    return {
        activities,
        isLoading,
    };
};