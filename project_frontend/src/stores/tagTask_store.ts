
import { create } from "zustand";
import toast from "react-hot-toast";
import type { TaskTag } from "../types/taskTag";
import { addTagToTask, removeTagFromTask, getAllTagsOfTask, getTagOfTask } from "../services/tag_task_services";

interface TagTaskStore {
    tags: TaskTag[];
    isLoading: boolean;
    addTagToTask: (taskId: string, tagId: string) => Promise<void>;
    removeTagFromTask: (taskId: string, tagId: string) => Promise<void>;
    getAllTagsOfTask: (taskId: string) => Promise<void>;
    getTagOfTask: (taskId: string, tagId: string) => Promise<void>;
}

const useTagTaskStore = create<TagTaskStore>((set) => ({
    tags: [],
    isLoading: false,
    addTagToTask: async (taskId: string, tagId: string) => {
        set({ isLoading: true });
        try {
       
            const response = await addTagToTask(taskId, tagId);
            const updateTags = await getAllTagsOfTask(taskId);
    
            set({ tags: updateTags, isLoading: false });
            toast.success(response.message);
        } catch (error) {
            console.error("Error al añadir tag a tarea:", error);
            set({ isLoading: false });
        }
    },
    removeTagFromTask: async (taskId: string, tagId: string) => {
        set({ isLoading: true });
        try {
            await removeTagFromTask(taskId, tagId);
            await useTagTaskStore.getState().getAllTagsOfTask(taskId);
            toast.success("Tag eliminada de tarea con éxito");
            set({ isLoading: false });
        } catch (error) {
            console.error("Error al eliminar tag de tarea:", error);
            set({ isLoading: false });
        }
    },
    getAllTagsOfTask: async (taskId: string) => {
        set({ isLoading: true });
        try {
            const response = await getAllTagsOfTask(taskId);
            set({ tags: response, isLoading: false });
        } catch (error) {
            console.error("Error al obtener tags de tarea:", error);
            set({ isLoading: false });
        }

    },
    getTagOfTask: async (taskId: string, tagId: string) => {
        set({ isLoading: true });
        try {
            const response = await getTagOfTask(taskId, tagId);
            set({ tags: response, isLoading: false });
        } catch (error) {
            console.error("Error al obtener tag de tarea:", error);
            set({ isLoading: false });
        }

    },
    
}));

export default useTagTaskStore;