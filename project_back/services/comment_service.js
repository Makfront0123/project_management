import commentRepository from "../repositories/comment_repository.js";

class CommentService {
  async createComment(data) {
    return await commentRepository.createComment(data);
  }

  async getAllCommentsByTask(taskId) {
    return await commentRepository.getAllCommentsByTask(taskId);
  }

  async getCommentById(commentId, taskId) {
    return await commentRepository.getCommentById(commentId, taskId);
  }

  async deleteComment(commentId, taskId) {
    return await commentRepository.deleteComment(commentId, taskId);
  }
}
export default new CommentService();