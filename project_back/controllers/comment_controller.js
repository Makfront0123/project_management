import commentService from "../services/comment_service.js";
import Task from "../models/Task.js";
import TeamMember from "../models/TeamMember.js";
import taskService from "../services/task_service.js";
import projectService from "../services/project_service.js";
export const createComment = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { comment } = req.body;
    const userId = req.user.id;

    const task = await taskService.findTaskById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const project = await projectService.findProjectById(task.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const teamId = project.teamId;

    const teamMember = await TeamMember.findOne({
      teamId: teamId,
      userId: userId,
      status: "accepted",
    });

    if (!teamMember) {
      return res.status(403).json({ message: "Not a member of the team" });
    }

    const isAdmin = teamMember.role === "admin";
    const isAssigned = task.assignedTo?.toString() === userId;

    if (!isAdmin && !isAssigned) {
      return res.status(403).json({ message: "Not authorized to comment on this task" });
    }

    const newComment = await commentService.createComment({
      comment,
      taskId,
      userId,
      projectId: project._id,
    });

    res.status(201).json({
      message: "Comment created successfully",
      newComment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommentsByTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const project = await projectService.findProjectById(task.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const teamId = project.teamId;

    const teamMember = await TeamMember.findOne({
      teamId,
      userId,
      status: "accepted",
    });

    if (!teamMember) {
      return res.status(403).json({ message: "Not a member of the team" });
    }

    const isAdmin = teamMember.role === "admin";
    const isAssigned = task.assignedTo?.toString() === userId;

    if (!isAdmin && !isAssigned) {
      return res.status(403).json({ message: "Not authorized to view comments on this task" });
    }

    const comments = await commentService.getAllCommentsByTask(taskId);

    res.status(200).json({ comments });
  } catch (error) {
    console.error("Error in getCommentsByTask:", error);
    res.status(500).json({ message: error.message });
  }
};


export const getComment = async (req, res) => {
  try {
    const { taskId, commentId } = req.params;
    const comment = await commentService.getCommentById(commentId, taskId);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { taskId, commentId } = req.params;
    await commentService.deleteComment(commentId, taskId);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
