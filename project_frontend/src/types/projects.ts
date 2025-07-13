export interface Project {
    _id: string;
    name: string;
    description: string;
    teamId: string;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
}

export type NewProject = {
  name: string;
  description: string;
};