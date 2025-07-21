import { create } from "zustand";
import type { Tag } from "../types/tag";
import { createTag, deleteTag, getAllTags, updateTag } from "../services/tag_services";
import toast from "react-hot-toast";

interface TagStore {
  tags: Tag[];
  isLoading: boolean;
  createTag: (name: string, teamId: string) => Promise<void>;
  getAllTags: (teamId: string) => Promise<void>;
  deleteTag: (tagId: string, teamId: string) => Promise<void>;
  updateTag: (
    tagId: string,
    teamId: string,
    data: Partial<Pick<Tag, "name">>
  ) => Promise<void>;  
}

const useTagStore = create<TagStore>((set) => ({
    tags: [],
    isLoading: false,
    createTag: async (name: string, teamId: string) => {
        set({ isLoading: true });
        try {
            await createTag(name, teamId);  
            await useTagStore.getState().getAllTags(teamId);
            toast.success("Tag creada con éxito");
            set({ isLoading: false });
        } catch (error) {
            console.error("Error al crear tag:", error);
            set({ isLoading: false });
        }
    },
    getAllTags: async (teamId: string) => {
        set({ isLoading: true });
        try {
            const response = await getAllTags(teamId);
            set({ tags: response, isLoading: false });
        } catch (error) {
            console.error("Error al obtener tags:", error);
            set({ isLoading: false });
        }

    },
    deleteTag: async (tagId: string, teamId: string) => {
        set({ isLoading: true });
        try {
            await deleteTag(tagId, teamId);
            await useTagStore.getState().getAllTags(teamId);
            toast.success("Tag eliminada con éxito");
            set({ isLoading: false });
        } catch (error) {
            console.error("Error al eliminar tag:", error);
            set({ isLoading: false });
        }
    },

   updateTag: async (tagId: string, teamId: string, data: Partial<Pick<Tag, "name">>) => {
  set({ isLoading: true });
  try {
    const response= await updateTag(tagId, teamId, data);  
    await useTagStore.getState().getAllTags(teamId);
    toast.success(response.message);
    set({ isLoading: false });
  } catch (error) {
    console.error("Error al actualizar tag:", error);
  } finally {
    set({ isLoading: false });
  }
}

}));

export default useTagStore;