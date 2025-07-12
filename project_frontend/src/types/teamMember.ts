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
