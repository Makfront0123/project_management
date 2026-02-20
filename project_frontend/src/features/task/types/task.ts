import type { User } from "../../auth/types/auth";
import type { Tag } from "../../tag/types/tag";

export interface Task {
    _id: string;
    name: string;
    description: string;
    projectId: string;
    status: string;
    priority: TaskPriority;
    dueDate: string;
    assignedUsers?: User[];
    tags?: Tag[];
    createdAt: string;
}

export interface TaskFormValues {
  id?: string;
  name: string;
  description: string;
}
export type TaskPriority = "low" | "medium" | "high" | "urgent";

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