import { create } from "zustand";
import { getTaskActivities } from "../services/activity_services";
import type { Activity } from "../types/Activity"; // ✅ importar el tipo correcto

interface ActivityStore {
    activities: Activity[];
    isLoading: boolean;
    fetchTaskActivities: (taskId: string) => Promise<void>;
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
}));