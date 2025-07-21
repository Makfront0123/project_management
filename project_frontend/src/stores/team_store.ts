import { create } from 'zustand'
import { getUserTeamStatus } from '../services/auth_services'
import { createTeam, getAllTeams as fetchAllTeams } from '../services/team_services'
import { getErrorMessage } from '../utils/getErrorMessage'
import type { Team } from '../types/team'


type TeamStore = {
  teams: Team[]
  isLoading: boolean
  fetchTeams: () => Promise<void>
  createTeam: (name: string, description: string) => Promise<string>
  getAllTeams: () => Promise<void>
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
  }

}))
