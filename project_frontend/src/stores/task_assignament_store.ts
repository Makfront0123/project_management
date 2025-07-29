import { create } from "zustand";
import { assignTask, completeAssignedTask, getAllUsersAssignedToTask, getTasksToUserAssignments, unassignTask } from "../services/task_assignament_services";
import toast from "react-hot-toast";
import type { TaskAssignment } from "../types/task_assignment";
import { getErrorMessage } from "../utils/getErrorMessage";


interface TaskStore {
    isLoading: boolean;
    taskAssignments: TaskAssignment[];

    assignTask: (taskId: string, userId: string) => Promise<void>;
    unassignTask: (taskId: string, userId: string) => Promise<void>;
    getTasksToUserAssignments: (taskId: string) => Promise<void>;
    getAllUsersAssignedToTask: (taskId: string, teamId: string) => Promise<void>;
    completeAssignedTask: (taskId: string, userId: string) => Promise<void>;
}

const useTaskAssignamentStore = create<TaskStore>((set) => ({
    isLoading: false,
    taskAssignments: [],

    assignTask: async (taskId, userId) => {
        try {
            set({ isLoading: true });
            const response = await assignTask(taskId, userId);
            set({ isLoading: false });
            toast.success(response.message);
            return response;
        } catch (error) {
            set({ isLoading: false });
            toast.error(getErrorMessage(error));
            throw error;
        }
    },
    getTasksToUserAssignments: async (projectId) => {
        set({ isLoading: true });
        const response = await getTasksToUserAssignments(projectId);
        set({
            taskAssignments: response,
            isLoading: false
        });
    }
    ,



    unassignTask: async (taskId, userId) => {
     
        set({ isLoading: true });
        try {
            const response = await unassignTask(taskId, userId);
          
            toast.success(response.message);
            return response;
        } catch (error) {
            toast.error("Error al quitar asignación");
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },


    getAllUsersAssignedToTask: async (taskId, teamId) => {
        set({ isLoading: true });
        const response = await getAllUsersAssignedToTask(taskId, teamId);

        set((state) => ({
            taskAssignments: [...state.taskAssignments, ...response],
            isLoading: false
        }));

        return response;
    },

    completeAssignedTask: async (taskId, userId) => {
        set({ isLoading: true });
        const response = await completeAssignedTask(taskId, userId);
        toast.success(response.message);
        return response;
    },

}));

export default useTaskAssignamentStore;
