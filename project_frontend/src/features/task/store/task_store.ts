import { create } from "zustand";

import { createTask, deleteTask, getTask, getTasks, getTasksByUser, getTasksByUserInProject, updateTask } from "../services/task_services";
import type { Task, TaskInput } from "../types/task";
import toast from "react-hot-toast";



interface TaskStore {
    tasks: Task[];
    userTasks: Task[];
    isLoading: boolean;
    getTask: (projectId: string, taskId: string) => Promise<Task>;
    createTask: (projectId: string, data: TaskInput) => Promise<Task>;
    getTasks: (projectId: string) => Promise<Task[]>;
    getTaskByUser: () => Promise<Task[]>;
    getTasksByUserInProject: (projectId: string) => Promise<Task[]>;
    deleteTask: (id: string, projectId: string) => Promise<Task>;
    updateTask: (id: string, data: TaskInput, projectId: string) => Promise<Task>;
}

const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    userTasks: [],
    isLoading: false,

    createTask: async (projectId: string, data: TaskInput) => {
        set({ isLoading: true });

        const response = await createTask(projectId, data);

        const updatedTasks = await getTasks(projectId);

        set({
            tasks: updatedTasks,
            isLoading: false,
        });

        toast.success(response.message);

        return response;
    },
    getTask: async (projectId: string, taskId: string) => {
        set({ isLoading: true });

        const response = await getTask(projectId, taskId);

        set((state) => ({
            tasks: [...state.tasks.filter(t => t._id !== response._id), response],
            isLoading: false
        }));

        return response;
    },

    getTasks: async (projectId: string) => {
        set({ isLoading: true });

        const response = await getTasks(projectId);

        set({
            tasks: response,
            isLoading: false
        });

        return response;
    },

    getTaskByUser: async () => {
        set({ isLoading: true });

        const response = await getTasksByUser();
        set({
            userTasks: response,
            isLoading: false
        });

        console.log("store", response);

        return response;
    },

    getTasksByUserInProject: async (projectId: string) => {
        set({ isLoading: true });

        const response = await getTasksByUserInProject(projectId);
        set({
            userTasks: response,
            isLoading: false
        });

        return response;
    },

    deleteTask: async (id: string, projectId: string) => {
        set({ isLoading: true });

        const response = await deleteTask(id, projectId);

        const updatedTasks = await getTasks(projectId);

        set({
            tasks: updatedTasks,
            isLoading: false
        });

        toast.success(response.message);

        return response;
    },

    updateTask: async (id: string, data: TaskInput, projectId: string) => {
        set({ isLoading: true });

        const response = await updateTask(id, data, projectId);

        const updatedTasks = await getTasks(projectId);

        set({
            tasks: updatedTasks,
            isLoading: false
        });

        toast.success(response.message);

        return response;
    },
}));
export default useTaskStore;