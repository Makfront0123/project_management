import { create } from 'zustand'
import { getUserTeamStatus } from '../services/auth_services'
import { createTeam, deleteTeam, getAllTeams, getTeamDashboard, updateTeam } from '../services/team_services'
import { getErrorMessage } from '../shared/utils/getErrorMessage'
import type { Team, TeamDashboardResponse } from '../shared/types/team'
import toast from 'react-hot-toast'



type TeamStore = {
  reset(): unknown
  teams: Team[]
  dashboard: TeamDashboardResponse | null
  activeTeamId: string | null;
  setActiveTeam: (teamId: string) => void;
  isLoading: boolean
  page: number
  limit: number
  totalPages: number
  totalTeams: number
  fetchTeams: () => Promise<void>
  createTeam: (name: string, description: string) => Promise<string>
  getAllTeams: (page?: number, limit?: number) => Promise<void>
  updateTeam: (data: Partial<Team>, teamId: string) => Promise<string>
  deleteTeam: (id: string) => Promise<string>
  getTeamDashboard: (teamId: string) => Promise<void>
}

export const useTeamStore = create<TeamStore>((set) => ({
  teams: [],
  activeTeamId: null,
  dashboard: null,
  setActiveTeam: (teamId) => set({ activeTeamId: teamId }),
  isLoading: false,
  page: 1,
  limit: 4,
  totalPages: 1,
  totalTeams: 0,
  reset: () =>
    set({
      teams: [],
      activeTeamId: null,
      dashboard: null,
      page: 1,
      totalPages: 1,
      totalTeams: 0,
    }),
  fetchTeams: async () => {
    set({ isLoading: true })
    try {
      const data = await getUserTeamStatus()
      set((state) => ({
        teams: data.teams,
        activeTeamId: state.activeTeamId ?? data.teams[0]?._id ?? null,
        isLoading: false
      }))
    } catch (error) {
      console.error("Error fetching teams:", error)
      set({ isLoading: false })
    }
  },

  createTeam: async (name, description) => {
    set({ isLoading: true })
    try {
      const { team, message } = await createTeam(name, description)

      set((state) => ({
        teams: [...state.teams, team],
        isLoading: false
      }))

      return message
    } catch (error) {
      console.error("Error creating team:", error)
      set({ isLoading: false })
      throw new Error(getErrorMessage(error))
    }
  },
  getTeamDashboard: async (teamId: string) => {
    set({ isLoading: true })

    try {
      const response = await getTeamDashboard(teamId)

      set({
        dashboard: response,
        isLoading: false,
      })

    } catch (error) {
      console.error("Error fetching team dashboard:", error)

      set({ isLoading: false })

      throw new Error(getErrorMessage(error))
    }
  },
  getAllTeams: async (page = 1, limit = 4) => {
    set({ isLoading: true, teams: [] })
    try {
      const response = await getAllTeams(page, limit)
      set((state) => ({
        teams: response.teams,

        activeTeamId:
          state.activeTeamId ?? response.teams[0]?._id ?? null,

        totalPages: response.totalPages,
        totalTeams: response.totalTeams,
        page,
        isLoading: false,
      }))
    } catch (error) {
      console.error("Error fetching teams:", error)
      set({ isLoading: false })
    }
  },
  updateTeam: async (data: Partial<Team>, teamId: string) => {

    set({ isLoading: true })
    try {
      const { team, message } = await updateTeam(teamId, data)
      set((state) => ({
        teams: state.teams.map((t) =>
          t._id === team._id ? team : t
        ),
        isLoading: false,
      }))
      toast.success(message)
      return message
    } catch (error) {
      console.error("Error updating team:", error)
      set({ isLoading: false })
      throw new Error(getErrorMessage(error))
    }
  },
  deleteTeam: async (id: string) => {
    set({ isLoading: true })
    try {
      const { message } = await deleteTeam(id)
      set((state) => ({
        teams: state.teams.filter((t) => t._id !== id),
        isLoading: false,
      }))
      toast.success(message)
      return message
    } catch (error) {
      console.error("Error deleting team:", error)
      set({ isLoading: false })
      throw new Error(getErrorMessage(error))
    }
  }

}))
