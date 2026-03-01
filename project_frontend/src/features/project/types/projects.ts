
import type { useTaskForm } from "@/features/task/hooks/useTaskForm";
import type { Task } from "@/features/task/types/task";
import type { TeamMember } from "@/features/team/types/teamMember";


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
  acceptedMembers: TeamMember[];
  deleteTask: (taskId: string) => Promise<void>;
  setEditingTask: (task: Task | null) => void;
  editingTask: Task | null;
  setIsModalOpen: (open: boolean) => void;
  filter: "all" | "open" | "completed";
  setFilter: (value: "all" | "open" | "completed") => void;
  isModalOpen: boolean;
  taskForm: ReturnType<typeof useTaskForm>;
}