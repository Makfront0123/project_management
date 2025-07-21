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


export type TaskInput = {
    name: string;
    description: string;
};
