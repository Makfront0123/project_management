import type { Team } from "@/features/team/types/team"

export type UserTeamStatus = {
  team: Team
  role: string
  status: string
  createdAt: string
  members: number
  userId: string
  user?: {
    name?: string
  }
}
