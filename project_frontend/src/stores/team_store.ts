import { create } from 'zustand'
import { getUserTeamStatus } from '../services/auth_services'
import { createTeam, deleteTeam, getAllTeams as fetchAllTeams, updateTeam } from '../services/team_services'
import { getErrorMessage } from '../utils/getErrorMessage'
import type { Team } from '../types/team'
import toast from 'react-hot-toast'



type TeamStore = {
  teams: Team[]
  isLoading: boolean
  fetchTeams: () => Promise<void>
  createTeam: (name: string, description: string) => Promise<string>
  getAllTeams: () => Promise<void>
  updateTeam: (data: Partial<Team>, teamId: string) => Promise<string>
  deleteTeam: (id: string) => Promise<string>
}

export const useTeamStore = create<TeamStore>((set) => ({
  teams: [],
  isLoading: false,

  fetchTeams: async () => {
    set({ isLoading: true })
    try {
      const data = await getUserTeamStatus()
      set({ teams: data.teams, isLoading: false })
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

  getAllTeams: async () => {
    set({ isLoading: true })
    try {
      const teams = await fetchAllTeams()
      set({ teams, isLoading: false })
    } catch (error) {
      console.error("Error fetching teams:", error)
      set({ isLoading: false })
    }
  },
  updateTeam: async (data: Partial<Team>, teamId: string) => {
    console.log('state',teamId)
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
      return message
    } catch (error) {
      console.error("Error deleting team:", error)
      set({ isLoading: false })
      throw new Error(getErrorMessage(error))
    }
  }

}))
