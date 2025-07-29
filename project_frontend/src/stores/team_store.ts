import { create } from 'zustand'
import { getUserTeamStatus } from '../services/auth_services'
import { createTeam, deleteTeam, getAllTeams, updateTeam } from '../services/team_services'
import { getErrorMessage } from '../utils/getErrorMessage'
import type { Team } from '../types/team'
import toast from 'react-hot-toast'



type TeamStore = {
  teams: Team[]
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
}

export const useTeamStore = create<TeamStore>((set) => ({
  teams: [],
  isLoading: false,
  page: 1,
  limit: 4,
  totalPages: 1,
  totalTeams: 0,
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

  getAllTeams: async (page = 1, limit = 4) => {
    set({ isLoading: true, teams: [] })
    try {
      const response = await getAllTeams(page, limit)
    
      set({
        teams: response.teams,
        totalPages: response.totalPages,
        totalTeams: response.totalTeams,
        page,
        isLoading: false,
      });
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
