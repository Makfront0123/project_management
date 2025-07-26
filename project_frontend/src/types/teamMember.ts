export type TeamMember = {
  _id: string
  teamId: string
  userId: {
    _id: string
    name: string
    email: string
  }
  role: string
  status: string
}

export interface Member {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
}