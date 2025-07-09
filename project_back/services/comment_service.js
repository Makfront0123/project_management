import commentRepo from "../repositories/comment_repository.js";

class CommentService {
    async createComment(data) {
        return await commentRepo.createComment(data);
    }

    async getAllCommentsByTask( taskId) {
        return await commentRepo.getAllCommentsByTask(taskId);
    }

    async getCommentById(commentId, taskId) {
        return await commentRepo.getCommentById(commentId, taskId);
    }

    async deleteComment(commentId, taskId) {
        return await commentRepo.deleteComment(commentId, taskId);
    }
}
export default new CommentService();