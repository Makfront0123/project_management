import { useTeamMemberStore } from "@/features/team/store/team_member_store"
import { useEffect } from "react"

export const useUserTeams = () => {
    const teamMemberships = useTeamMemberStore(
        (state) => state.teamMemberships
    )

    const isLoading = useTeamMemberStore(
        (state) => state.isLoading
    )

    const getUserTeamStatus = useTeamMemberStore(
        (state) => state.getUserTeamStatus
    )

    useEffect(() => {
        useTeamMemberStore.getState().getUserTeamStatus()
    }, [])

    return {
        teamMemberships,
        isLoading,
        refetch: getUserTeamStatus
    }
}