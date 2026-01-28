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
  progress: number;
  createdAt: string;
  updatedAt: string;
}

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