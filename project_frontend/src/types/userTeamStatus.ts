export type UserTeamStatus = {
  teamId: string
  name: string
  role: string
  status: string
  userId: string
  user?: {
    name?: string
  }
}
