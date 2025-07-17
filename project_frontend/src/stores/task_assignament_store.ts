import { create } from "zustand";
import { assignTask, getTasksToUserAssignments } from "../services/task_assignament_services";
import toast from "react-hot-toast";
import type { TaskAssignment } from "../types/task_assignment";


interface TaskStore {
    isLoading: boolean;
    taskAssignments: TaskAssignment[];

    assignTask: (taskId: string, userId: string) => Promise<void>;
    getTasksToUserAssignments: (taskId: string) => Promise<void>;
}

const useTaskAssignamentStore = create<TaskStore>((set) => ({
    isLoading: false,
    taskAssignments: [],

    assignTask: async (taskId, userId) => {
        set({ isLoading: true });
        const response = await assignTask(taskId, userId);
        set({ isLoading: false });
        toast.success(response.message);
        return response;
    },

    getTasksToUserAssignments: async (taskId) => {
        set({ isLoading: true });
        const response = await getTasksToUserAssignments(taskId); 
        set({ taskAssignments: response, isLoading: false });
        return response;
    },
}));

export default useTaskAssignamentStore;
