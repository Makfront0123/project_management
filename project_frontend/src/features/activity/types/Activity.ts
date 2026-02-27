export type ActivityType =
    | "task-created"
    | "task-updated"
    | "task-completed"
    | "task-deleted"
    | "comment-added"
    | "attachment-uploaded"
    | "project-created";

export interface Activity {
    _id: string;
    type: ActivityType;
    message: string;
    user: {
        _id: string;
        name: string;
    };
    createdAt: string;
}