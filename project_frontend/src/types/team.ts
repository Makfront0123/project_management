export type Team = {
  _id: string
  teamName: string
  description: string
  code: string
  role: string
  creator: {
    _id: string
    name: string
    email: string
  }
  createdAt: string
  updatedAt: string
}


export interface TeamResponse {
    message: string;
    team: Team;
}