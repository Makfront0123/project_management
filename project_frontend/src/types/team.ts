export interface Team {
  _id: string;
  name: string;
  description: string;
  code: string;
  creator: {
    _id: string;
    name: string;
    email: string;
  };
}


export interface TeamResponse {
    message: string;
    team: Team;
}