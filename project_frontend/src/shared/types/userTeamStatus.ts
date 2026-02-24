import type { Team } from "@/features/team/types/team"

export type UserTeamStatus = {
  teamId: string
  team: Team
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
