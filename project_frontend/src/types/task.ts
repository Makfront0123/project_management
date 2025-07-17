export interface Task {
    _id: string;
    name: string;
    description: string;
    projectId: string;
    status: string;
    assignedTo?: string;
}


export type TaskInput = {
    name: string;
    description: string;
};
