import type { Project } from "./projects";
import type { Tag } from "./tag";
import type { Task, TaskFormValues } from "./task";
import type { Member } from "./teamMember";

export interface ActionsProps {
    createTask: () => void;
    assignTask: (taskId: string, userId: string) => void;
    createTag: (name: string) => void;
    updateProject: (p: Project) => void;
    deleteProject: () => void;
    editTask: (task: Task) => void;
    deleteTask: (id: string) => void;
    updateTaskStatus: (id: string, status: string) => void;
}


export interface ModalsProps {
    isTaskModalOpen: boolean;
    isAssignModalOpen: boolean;
    isTagModalOpen: boolean;
    isProjectModalOpen: boolean;

    closeTaskModal: () => void;
    closeAssignModal: () => void;
    closeTagModal: () => void;
    closeProjectModal: () => void;
}
export interface TaskFormProps {
    values: TaskFormValues;

    errors: Partial<TaskFormValues>;

    isSubmitting: boolean;

    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;

    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;

    isEditing: boolean;
}
export interface AssignDataProps {
    members: Member[];

    selectedUserId: string;

    setSelectedUserId: (id: string) => void;
}

export interface ProjectModalsProps {
    modals: ModalsProps;
    actions: ActionsProps;
    taskForm?: TaskFormProps;
    assignData?: AssignDataProps;
    project: Project;
}

export interface AdminProjectActions {
    createTask: () => void;
    editTask: (task: Task) => void;
    deleteTask: (id: string) => void;

    assignTask: (taskId: string, userId: string) => void;

    updateTaskStatus: (taskId: string, status: string) => void;
}

export interface ProjectActions {
    createTask: () => void;
    editTask: (task: Task) => void;
    deleteTask: (id: string) => void;
    updateTaskStatus: (id: string, status: string) => void;

    assignTask: (taskId: string, userId: string) => void;

    createTag: (name: string) => void;

    updateProject: (p: Project) => void;
    deleteProject: () => void;
}



export interface Props {
    currentProject: Project;

    tasks: Task[];
    filteredTasks: Task[];

    tags: Tag[];

    actions: AdminProjectActions;

    modals: {
        isTaskModalOpen: boolean;
        isAssignModalOpen: boolean;
        isTagModalOpen: boolean;
        isProjectModalOpen: boolean;

        openTaskModal: () => void;
        closeTaskModal: () => void;

        openAssignModal: (task: Task) => void;
        closeAssignModal: () => void;

        openTagModal: () => void;
        closeTagModal: () => void;

        openProjectModal: () => void;
        closeProjectModal: () => void;
    };
}