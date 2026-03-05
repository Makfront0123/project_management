import { getUserTeamStatus } from "@/features/auth/services/auth_services"
import toast from "react-hot-toast"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { createTeam, updateTeam, deleteTeam, leaveTeam, getTeamDashboard, getAllTeams } from "../services/team_services"
import type { Team, TeamDashboardResponse } from "../types/team"
import { useTeamMemberStore } from "./team_member_store"


type TeamStore = {
  reset(): unknown
  teams: Team[]
  dashboard: TeamDashboardResponse | null
  activeTeamId: string | null
  setActiveTeam: (teamId: string) => void
  isLoading: boolean
  page: number
  limit: number
  totalPages: number
  totalTeams: number
  fetchTeams: () => Promise<void>
  createTeam: (name: string, description: string, image: File | null) => Promise<string>
  getAllTeams: (page?: number, limit?: number) => Promise<void>
  updateTeam: (data: FormData, teamId: string) => Promise<string>
  deleteTeam: (id: string) => Promise<string>
  getTeamDashboard: (teamId: string) => Promise<void>
  leaveTeam: (teamId: string) => Promise<void>
}

export const useTeamStore = create<TeamStore>()(
  persist(
    (set) => ({
      teams: [],
      activeTeamId: null,
      dashboard: null,
      setActiveTeam: (teamId: string) => set({ activeTeamId: teamId }),
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
      createTeam: async (name, description, image) => {
        set({ isLoading: true })
        try {
          const { team, message } = await createTeam(name, description, image)
          set((state) => ({
            teams: [...state.teams, team],
            activeTeamId: team._id,
            isLoading: false
          }))
          await useTeamMemberStore.getState().getUserTeamStatus()
          return message
        } catch (error) {
          set({ isLoading: false })
          throw new Error(error instanceof Error ? error.message : "Error")
        }
      },
      updateTeam: async (data, teamId) => {
        set({ isLoading: true })

        try {
          const { team, message } = await updateTeam(teamId, data)

          set((state) => ({
            teams: state.teams.map((t) =>
              t._id === team._id ? team : t
            ),
            isLoading: false
          }))

          await useTeamMemberStore.getState().getUserTeamStatus()

          return message
        } catch (error) {
          set({ isLoading: false })
          throw new Error(error instanceof Error ? error.message : "Error")
        }
      },
      deleteTeam: async (id) => {
        set({ isLoading: true })
        try {
          const { message } = await deleteTeam(id)
          set((state) => {
            const updatedTeams = state.teams.filter((t) => t._id !== id)
            return {
              teams: updatedTeams,
              activeTeamId: state.activeTeamId === id ? updatedTeams[0]?._id ?? null : state.activeTeamId,
              isLoading: false
            }
          })
          await useTeamMemberStore.getState().getUserTeamStatus()
          return message
        } catch (error) {
          set({ isLoading: false })
          throw new Error(error instanceof Error ? error.message : "Error")
        }
      },
      leaveTeam: async (teamId) => {
        set({ isLoading: true })
        try {
          const { message } = await leaveTeam(teamId)
          set((state) => {
            const updatedTeams = state.teams.filter(t => t._id !== teamId)
            return {
              teams: updatedTeams,
              activeTeamId: state.activeTeamId === teamId ? updatedTeams[0]?._id ?? null : state.activeTeamId,
              isLoading: false,
            }
          })
          useTeamMemberStore.setState((state) => ({
            teamMemberships: state.teamMemberships.filter(m => m.team._id !== teamId)
          }))
          toast.success(message)
        } catch (error) {
          set({ isLoading: false })
          toast.error(error instanceof Error ? error.message : "Error")
        }
      },
      getTeamDashboard: async (teamId) => {
        set({ isLoading: true })
        try {
          const dashboard = await getTeamDashboard(teamId)
          set({ dashboard, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw new Error(error instanceof Error ? error.message : "Error")
        }
      },
      getAllTeams: async (page = 1, limit = 4) => {
        set({ isLoading: true })
        try {
          const response = await getAllTeams(page, limit)
          set((state) => ({
            teams: response.teams,
            activeTeamId: state.activeTeamId ?? response.teams[0]?._id ?? null,
            totalPages: response.totalPages,
            totalTeams: response.totalTeams,
            page,
            isLoading: false
          }))
        } catch (error) {
          set({ isLoading: false })
          console.error(error)
        }
      }
    }),
    {
      name: "team-storage", // persistencia en localStorage
      partialize: (state) => ({ activeTeamId: state.activeTeamId }) // solo guardar activeTeamId
    }
  )
)