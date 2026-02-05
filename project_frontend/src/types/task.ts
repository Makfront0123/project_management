import type { User } from "./auth";
import type { Tag } from "./tag";

export interface Task {
    _id: string;
    name: string;
    description: string;
    projectId: string;
    status: string;
    assignedUsers?: User[];
    tags?: Tag[];
    createdAt: string;
}

export type TaskFormValues = {
    id: string;
    name: string;
    description: string;
};


export type TaskInput = {
    name: string;
    description: string;
};


export type TaskFilterValue = "all" | "open" | "completed";

export interface TaskFilterProps {
    value: TaskFilterValue;
    onChange: (value: TaskFilterValue) => void;
}