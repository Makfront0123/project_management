import { create } from "zustand";

import { createTask, deleteTask, getTasks, updateTask } from "../services/task_services";
import type { Task, TaskInput } from "../types/task";
import toast from "react-hot-toast";



interface TaskStore {
    tasks: Task[];
    isLoading: boolean;
    createTask: (projectId: string, data: TaskInput) => Promise<Task>;
    getTasks: (projectId: string) => Promise<Task[]>;
    deleteTask: (id: string, projectId: string) => Promise<Task>;
    updateTask: (id: string, data: TaskInput, projectId: string) => Promise<Task>;
}

const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    isLoading: false,

    createTask: async (projectId: string, data: TaskInput) => {
        set({ isLoading: true });
        const response = await createTask(projectId, data);
        set({ isLoading: false });
        toast.success(response.message);
        return response;
    },

    getTasks: async (projectId: string) => {
        set({ isLoading: true });
        const response = await getTasks(projectId);
        set({ tasks: response, isLoading: false });
        return response;
    },

    deleteTask: async (id: string, projectId: string) => {
        set({ isLoading: true });
        const response = await deleteTask(id, projectId);
        const updateTasks = await getTasks(projectId);
        set({ tasks: updateTasks, isLoading: false });
        toast.success(response.message);
        return response;
    },

    updateTask: async (id: string, data: TaskInput, projectId: string) => {
        set({ isLoading: true });
        const response = await updateTask(id, data, projectId);
        const updateTasks = await getTasks(projectId);
        set({ tasks: updateTasks, isLoading: false });
        toast.success(response.message);
        return response;
    },
}));

export default useTaskStore;