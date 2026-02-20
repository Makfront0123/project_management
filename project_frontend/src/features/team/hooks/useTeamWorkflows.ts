import { useCallback, useEffect, useState } from "react"
import { useTeamStore } from "@/features/team/store/team_store"
import type { Team } from "@/features/team/types/team"

type UseTeamWorkflowReturn = {
    teams: Team[]
    activeTeamId: string | null
    setActiveTeam: (id: string) => void
    isLoading: boolean
    totalPages: number
    totalTeams: number

    fetchTeams: () => Promise<void>
    createTeam: (name: string, description: string) => Promise<string>
    updateTeam: (data: Partial<Team>, teamId: string) => Promise<string>
    deleteTeam: (teamId: string) => Promise<string>
    getTeamDashboard: (teamId: string) => Promise<void>
}

export const useTeamWorkflow = (): UseTeamWorkflowReturn => {
    const {
        teams,
        activeTeamId,
        setActiveTeam,
        isLoading,
        totalPages,
        totalTeams,
        fetchTeams: fetchTeamsStore,
        createTeam: createTeamStore,
        updateTeam: updateTeamStore,
        deleteTeam: deleteTeamStore,
        getTeamDashboard: getTeamDashboardStore,
    } = useTeamStore()

    const [dashboardLoading, setDashboardLoading] = useState(false)

    const fetchTeams = useCallback(async () => {
        await fetchTeamsStore()
    }, [fetchTeamsStore])

    const createTeam = useCallback(
        async (name: string, description: string) => {
            return await createTeamStore(name, description)
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
    }
}