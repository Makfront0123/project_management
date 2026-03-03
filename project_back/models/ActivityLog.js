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
        "member-added",
        "member-removed",
        "task-assigned",
        "task-unassigned",
      ],
      required: true,
    },

    message: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    metadata: {
      projectName: String,
      taskName: String,
      teamName: String,
      targetUserName: String,
      attachmentName: String,
      role: String,
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

activityLogSchema.index({ teamId: 1, createdAt: -1 });
activityLogSchema.index({ projectId: 1, createdAt: -1 });
activityLogSchema.index({ taskId: 1, createdAt: -1 });
activityLogSchema.index({ user: 1, createdAt: -1 });
export default mongoose.model('ActivityLog', activityLogSchema);
