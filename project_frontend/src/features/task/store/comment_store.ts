// useCommentStore.ts
import { create } from "zustand";
import { createComment, deleteComment, getCommentsByTask } from "../services/comments_services";
import type { TaskComment } from "../types/comment";
import toast from "react-hot-toast";



type CommentStore = {
    comments: TaskComment[];
    isLoading: boolean;
    getCommentsByTask: (taskId: string) => Promise<void>;
    createComment: (taskId: string, comment: string) => Promise<void>;
    deleteComment: (taskId: string, commentId: string) => Promise<void>;
};

export const useCommentStore = create<CommentStore>((set) => ({
    comments: [],
    isLoading: false,
    getCommentsByTask: async (taskId) => {
        set({ isLoading: true });
        const response = await getCommentsByTask(taskId);
        const comments = response?.comments ?? [];
        set({ comments: comments || [], isLoading: false });

    },
    createComment: async (taskId, comment) => {
        set({ isLoading: true });
        const response = await createComment(taskId, comment);
        const updateComment = await getCommentsByTask(taskId);
        set({ comments: updateComment?.comments, isLoading: false });
        toast.success(response.message);
    },
    deleteComment: async (taskId, commentId) => {
        set({ isLoading: true });
        const response = await deleteComment(taskId, commentId);
        const updateComment = await getCommentsByTask(taskId);
        set({ comments: updateComment?.comments, isLoading: false });
        toast.success(response.message);
    },
}));
