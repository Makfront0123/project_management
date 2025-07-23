import Comment from "../models/Comment.js";
import mongoose from "mongoose";
class CommentRepository {
  async createComment(data) {
    return await Comment.create(data);
  }

  async getAllCommentsByTask(taskId) {
    return await Comment.find({ taskId }).populate("userId", "username");
  }

  async getCommentById(commentId, taskId) {
    return await Comment.findOne({ _id: commentId, taskId }).populate("userId", "username");
  }

  async deleteComment(commentId, taskId) {
    return await Comment.findOneAndDelete({ _id: commentId, taskId });
  }
}

export default new CommentRepository();