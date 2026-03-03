import { create } from "zustand";
import { getTaskActivities, getTeamActivities } from "../services/activity_services";
import type { Activity } from "../types/Activity";

interface ActivityStore {
    activities: Activity[];
    isLoading: boolean;
    fetchTaskActivities: (taskId: string) => Promise<void>;
    fetchTeamActivities: (teamId: string) => Promise<void>;
    clearActivities: () => void;
}

export const useActivityStore = create<ActivityStore>((set) => ({
    activities: [],
    isLoading: false,

    fetchTaskActivities: async (taskId) => {
        set({ isLoading: true });

        const response = await getTaskActivities(taskId);

        set({
            activities: response.activities ?? [],
            isLoading: false,
        });
    },

    fetchTeamActivities: async (teamId) => {
        set({ isLoading: true });

        const response = await getTeamActivities(teamId);
        
        set({
            activities: response.activities ?? [],
            isLoading: false,
        });
    },

    clearActivities: () => set({ activities: [] }),
}));