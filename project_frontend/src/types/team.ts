export type Team = {
  _id: string;
  name: string;
  description: string;
  code: string;
  creator: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
};

export interface PagedTeamsResponse {
  teams: Team[];
  totalPages: number;
  totalTeams: number;
}
export type CreateTeamFormValue = {
  name: string
  description: string
}


export interface TeamResponse {
  message: string;
  team: Team;
}