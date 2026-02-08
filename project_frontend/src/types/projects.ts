import type { AdminProjectActions } from "./Modal";
import type { Tag } from "./tag";
import type { Task } from "./task";

export interface Project {
  _id: string;
  name: string;
  description: string;
  teamId: string;
  ownerId: string;
  status: string;
  membersCount: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  progress: number;
  createdAt: string;
  updatedAt: string;
  tasksTimeline: TaskOverTime[];
}

export type TaskOverTime = {
  date: string;
  count: number;
};

export type ProjectFormValues = {
  name: string;
  description: string;
};


export type NewProject = {
  name: string;
  description: string;
};

export type ProjectForm = {
  name: string;
  description: string;
};

export interface AdminProjectViewProp {
  currentProject: Project | null;

  tasks: Task[];
  filteredTasks: Task[];

 

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
