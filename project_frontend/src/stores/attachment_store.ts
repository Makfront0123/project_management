import { create } from "zustand";

import type { Attachment } from "../types/attachment";
import { createAttachment, deleteAttachment, getAllAttachments, updateAttachment } from "../services/attachment_services";
import toast from "react-hot-toast";


interface AttachmentStore {
    attachmentsByTask: Record<string, Attachment[]>;
    isLoading: boolean;
    createAttachment: (taskId: string, teamId: string, file: File) => Promise<void>;
    getAllAttachmentsForTasks: (taskIds: string[], teamId: string) => Promise<void>;
    updateAttachment: (attachmentId: string, teamId: string, file: File) => Promise<void>;
    deleteAttachment: (attachmentId: string, teamId: string) => Promise<void>;
}

const useAttachmentStore = create<AttachmentStore>((set) => ({
    attachmentsByTask: {},
    isLoading: false,

    createAttachment: async (taskId, teamId, file) => {
        set({ isLoading: true });
        try {
            const response=await createAttachment(taskId, teamId, file);
            const updatedAttachments = await getAllAttachments(taskId, teamId);

            set((state) => ({
                attachmentsByTask: {
                    ...state.attachmentsByTask,
                    [taskId]: updatedAttachments,
                },
                isLoading: false,
            }));

            toast.success(response.message);
        } catch (err) {
            console.error(err);
            set({ isLoading: false });
        }
    },


    getAllAttachmentsForTasks: async (taskIds: string[], teamId: string) => {
        set({ isLoading: true });
        try {
            const result: Record<string, Attachment[]> = {};
            for (const taskId of taskIds) {
                const response = await getAllAttachments(taskId, teamId);

                result[taskId] = response;
            }

            set((state) => ({
                attachmentsByTask: {
                    ...state.attachmentsByTask,
                    ...result,
                },
                isLoading: false,
            }));
        } catch (err) {
            console.error(err);
            set({ isLoading: false });
        }
    },

    updateAttachment: async (attachmentId, teamId, file) => {
        set({ isLoading: true });
        try {
            const response = await updateAttachment(attachmentId, teamId, file);
            set((state) => ({
                attachmentsByTask: {
                    ...state.attachmentsByTask,
                    [attachmentId]: response.data,
                },
                isLoading: false,
            }));
            toast.success(response.message);
        } catch (err) {
            console.error(err);
            set({ isLoading: false });
        }
    },

    deleteAttachment: async (attachmentId, teamId) => {
        set({ isLoading: true });
        try {
            const response = await deleteAttachment(attachmentId, teamId);
            set({ attachmentsByTask: response, isLoading: false });
            toast.success(response.message);
        } catch (err) {
            console.error(err);
            set({ isLoading: false });
        }
    },

}));


export default useAttachmentStore;