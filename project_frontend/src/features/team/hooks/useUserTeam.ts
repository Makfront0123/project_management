import { useTeamMemberStore } from "@/features/team/store/team_member_store"
import { useEffect } from "react"

export const useUserTeams = () => {
    const {
        teamMemberships,
        getUserTeamStatus,
        isLoading
    } = useTeamMemberStore()

    useEffect(() => {
        if (!teamMemberships.length) {
            getUserTeamStatus()
        }
    }, [getUserTeamStatus, teamMemberships.length])

    return {
        teamMemberships,
        isLoading
    }
}