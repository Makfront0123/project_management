export type UserTeamStatus = {
  teamId: string
  name: string
  description: string
  role: string
  status: string
  userId: string
  user?: {
    name?: string
  }
}
