import { useCallback, useEffect, useState } from "react"
import { useTeamStore } from "../store/team_store"
import type { Team } from "../types/team"


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

    const [dashboardLoading, setDashboardLoading] = useState(false)

    const fetchTeams = useCallback(async () => {
        await fetchTeamsStore()
    }, [fetchTeamsStore])

    const createTeam = useCallback(
        async (name: string, description: string, image: File | null) => {
            return await createTeamStore(name, description, image)
        },
        [createTeamStore]
    )

    const updateTeam = useCallback(
        async (data: Partial<Team>, teamId: string) => {
            return await updateTeamStore(data, teamId)
        },
        [updateTeamStore]
    )

    const deleteTeam = useCallback(
        async (teamId: string) => {
            return await deleteTeamStore(teamId)
        },
        [deleteTeamStore]
    )

    const getTeamDashboard = useCallback(
        async (teamId: string) => {
            try {
                setDashboardLoading(true)
                await getTeamDashboardStore(teamId)
            } finally {
                setDashboardLoading(false)
            }
        },
        [getTeamDashboardStore]
    )

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
        dashboardLoading,
    }
}