import type { TeamMember } from "@/features/team/types/teamMember";
import type { Tag } from "../../tag/types/tag";

export interface Task {
    _id: string;
    name: string;
    description: string;
    projectId: string;
    status: string;
    priority: TaskPriority;
    dueDate: string;
    assignedUsers?: TeamMember[];
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