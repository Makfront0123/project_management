import type { Tag } from "./tag";

export interface Task {
    _id: string;
    name: string;
    description: string;
    projectId: string;
    status: string;
    assignedTo?: string;
    tags?: Tag[]; 
}

export type TaskFormValues = {
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