export type Team = {
  _id: string;
  name: string;
  description: string;
  code: string;
  image: string;
  creator: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  membersCount: number;
};

export interface PagedTeamsResponse {
  teams: Team[];
  totalPages: number;
  totalTeams: number;
}
export type CreateTeamFormValue = {
  name: string
  description: string
  image: File | null
}


export interface TeamResponse {
  message: string;
  team: Team;
}

export interface TeamDashboardResponse {
  _id: string
  name: string
  description: string
  code: string
  membersCount: number

  projects: {
    _id: string
    name: string
    status: string
    totalTasks: number
    completedTasks: number
    progress: number
  }[]
}