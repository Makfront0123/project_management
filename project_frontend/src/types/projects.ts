export interface Project {
    _id: string;
    name: string;
    description: string;
    teamId: string;
    ownerId: string;
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