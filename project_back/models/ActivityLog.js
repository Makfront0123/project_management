import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "task-created",
        "task-updated",
        "task-completed",
        "task-deleted",
        "comment-created",
        "comment-deleted",
        "comment-updated",
        "project-created",
        "project-updated",
        "project-deleted",
        "attachment-deleted",
        "attachment-updated",
        "attachment-uploaded",
        "attachment-created",
      ],
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },

    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  },
  { timestamps: true }
);
export default mongoose.model('ActivityLog', activityLogSchema);
