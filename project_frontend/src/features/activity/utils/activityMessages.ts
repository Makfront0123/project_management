import type { Activity } from "../types/Activity";

export const activityMessages: Record<string, (activity: Activity) => string> = {
    "comment-created": (activity) =>
        `commented on "${activity.taskId?.name}"`,
    "comment-deleted": (activity) =>
        `deleted comment on "${activity.taskId?.name}"`,

    "comment-updated": (activity) =>
        `updated comment on "${activity.taskId?.name}"`,

    "task-created": (activity) =>
        `created task "${activity.metadata?.taskName}"`,

    "task-updated": (activity) =>
        `updated task "${activity.metadata?.taskName}"`,

    "task-deleted": (activity) =>
        `deleted task "${activity.metadata?.taskName}"`,

    "task-assigned": (activity) =>
        `assigned "${activity.metadata?.taskName}" to ${activity.metadata?.targetUserName}`,

    "task-unassigned": (activity) =>
        `removed ${activity.metadata?.targetUserName} from "${activity.metadata?.taskName}"`,

    "attachment-created": (activity) =>
        `added attachment to "${activity.taskId?.name}"`,

    "attachment-deleted": (activity) =>
        `deleted attachment from "${activity.taskId?.name}"`,

    "project-created": (activity) =>
        `created project "${activity.metadata?.projectName}"`,

    "project-updated": (activity) =>
        `updated project "${activity.metadata?.projectName}"`,

    "project-deleted": (activity) =>
        `deleted project "${activity.metadata?.projectName}"`,
    "member-added": (activity) =>
        `added ${activity.metadata?.targetUserName} to the team`,

    "member-removed": (activity) =>
        `removed ${activity.metadata?.targetUserName} from the team`,
};