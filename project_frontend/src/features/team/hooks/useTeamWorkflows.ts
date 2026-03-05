import { useCallback, useEffect, useState } from "react"
import { useTeamStore } from "../store/team_store"
import toast from "react-hot-toast"


export const useTeamWorkflow = () => {
  const teams = useTeamStore(s => s.teams)
  const activeTeamId = useTeamStore(s => s.activeTeamId)
  const setActiveTeam = useTeamStore(s => s.setActiveTeam)
  const isLoading = useTeamStore(s => s.isLoading)
  const totalPages = useTeamStore(s => s.totalPages)
  const totalTeams = useTeamStore(s => s.totalTeams)

  const fetchTeamsStore = useTeamStore(s => s.fetchTeams)
  const createTeamStore = useTeamStore(s => s.createTeam)
  const updateTeamStore = useTeamStore(s => s.updateTeam)
  const deleteTeamStore = useTeamStore(s => s.deleteTeam)
  const getTeamDashboardStore = useTeamStore(s => s.getTeamDashboard)
  const leaveTeamStore = useTeamStore(s => s.leaveTeam)

  const [dashboardLoading, setDashboardLoading] = useState(false)

  const fetchTeams = useCallback(async () => {
    await fetchTeamsStore()
  }, [fetchTeamsStore])


  const createTeam = useCallback(
    async (name: string, description: string, image: File | null) => {
      try {
        const message = await createTeamStore(name, description, image)
        toast.success(message)
        return message
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Error")
        throw error
      }
    },
    [createTeamStore]
  )

  const updateTeam = useCallback(
    async (data: FormData, teamId: string) => {
      try {
        const message = await updateTeamStore(data, teamId)
        toast.success(message)
        return message
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Error")
        throw error
      }
    },
    [updateTeamStore]
  )

  const deleteTeam = useCallback(
    async (teamId: string) => {
      try {
        const message = await deleteTeamStore(teamId)
        toast.success(message)
        return message
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Error")
        throw error
      }
    },
    [deleteTeamStore]
  )
  const getTeamDashboard = useCallback(async (teamId: string) => {
    try {
      setDashboardLoading(true)
      await getTeamDashboardStore(teamId)
    } finally {
      setDashboardLoading(false)
    }
  }, [getTeamDashboardStore])

  const leaveTeam = async (teamId: string) => {
    await leaveTeamStore(teamId)
  }

  useEffect(() => {
    if (!teams.length) fetchTeams()
  }, [fetchTeams, teams.length])

  return {
    teams,
    activeTeamId,
    setActiveTeam,
    isLoading,
    totalPages,
    totalTeams,
    fetchTeams,
    createTeam,
    updateTeam,
    deleteTeam,
    getTeamDashboard,
    leaveTeam,
    dashboardLoading,
  }
}