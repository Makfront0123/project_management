import { useCommentStore } from "../store/comment_store";

export const useCommentWorkflows = () => {
    const {
        comments,
        isLoading,
        getCommentsByTask,
        createComment,
        deleteComment,
    } = useCommentStore();

    const loadComments = async (taskId: string) => {
        await getCommentsByTask(taskId);
    };

    const addComment = async (taskId: string, text: string) => {
        await createComment(taskId, text);
    };

    const removeComment = async (taskId: string, commentId: string) => {
        await deleteComment(taskId, commentId);
    };

    return {
        comments,
        isLoading,
        loadComments,
        addComment,
        removeComment,
    };
};