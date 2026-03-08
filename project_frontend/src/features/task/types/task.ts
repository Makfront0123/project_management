import type { User } from "@/features/auth/types/auth";
import type { Tag } from "../../tag/types/tag";
export type AssignedUser = {
    _id: string
    name: string
    email: string
}

export interface Task {
    _id: string;
    name: string;
    description: string;
    projectId: {
        _id: string;
        name: string;
        teamId: {
            _id: string;
            name: string;
        }
    };
    status: string;
    priority: TaskPriority;
    dueDate: string;
    assignedUsers: User[]
    tags?: Tag[];
    createdAt: string;
}

export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface TaskFormValues {
    name: string;
    description: string;
    priority: TaskPriority;
    dueDate?: string;
    assignedUserId?: string | null;
}

export type TaskInput = {
    name?: string;
    description?: string;
    priority?: TaskPriority;
    assignedUserId?: string | null;
};


export type TaskFilterValue = "all" | "open" | "completed";

export interface TaskFilterProps {
    value: TaskFilterValue;
    onChange: (value: TaskFilterValue) => void;
}