export type UserTeamStatus = {
  teamId: string
  name: string
  description: string
  role: string
  status: string
  createdAt: string
  members: number
  userId: string
  user?: {
    name?: string
  }
}
