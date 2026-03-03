export type ActivityType =
    | "task-created"
    | "task-updated"
    | "task-completed"
    | "task-deleted"
    | "comment-created"
    | "comment-deleted"
    | "comment-updated"
    | "attachment-uploaded"
    | "attachment-deleted"
    | "project-created"
    | "project-updated"
    | "project-deleted"
    | "member-added"
    | "member-removed";
export interface Activity {
    _id: string;
    type: ActivityType;
    user: {
        _id: string;
        name: string;
    };
    taskId?: {
        _id: string;
        name: string;
    };
    projectId?: {
        _id: string;
        name: string;
    };
    metadata?: {
        projectName?: string;
        taskName?: string;
        attachmentName?: string;
        targetUserName?: string;
    };
    teamId?: {
        _id: string;
        name: string;
    };
    createdAt: string;
}