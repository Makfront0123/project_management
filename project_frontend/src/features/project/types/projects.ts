
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
  currentProject: Project;
  tasks: Task[];
  deleteTask: (taskId: string) => Promise<void>;
  updateTask: (taskId: string, data: Partial<Task>) => Promise<void>;

  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;

  setIsModalOpen: (open: boolean) => void;
  isModalOpen: boolean;
}