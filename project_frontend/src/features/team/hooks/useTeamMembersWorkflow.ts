import { useState, useCallback, useEffect } from "react"
import { useTeamMemberStore } from "../store/team_member_store"


export const useTeamMembersWorkflow = (teamId: string) => {
    const teamMembers = useTeamMemberStore(s => s.teamMembers)
    const isLoading = useTeamMemberStore(s => s.isLoading)
    const fetchTeamMembersStore = useTeamMemberStore(s => s.fetchTeamMembers)
    const acceptRequestStore = useTeamMemberStore(s => s.acceptRequest)
    const rejectRequestStore = useTeamMemberStore(s => s.rejectRequest)
    const deleteMemberStore = useTeamMemberStore(s => s.deleteMember)
    const leaveTeamStore = useTeamMemberStore(s => s.leaveTeam)

    const [membersLoading, setMembersLoading] = useState(false)

    const fetchTeamMembers = useCallback(async () => {
        setMembersLoading(true)
        try {
            await fetchTeamMembersStore(teamId)
        } finally {
            setMembersLoading(false)
        }
    }, [fetchTeamMembersStore, teamId])

    const acceptRequest = useCallback(
        async (userId: string) => await acceptRequestStore(userId, teamId),
        [acceptRequestStore, teamId]
    )

    const rejectRequest = useCallback(
        async (userId: string) => await rejectRequestStore(userId, teamId),
        [rejectRequestStore, teamId]
    )

    const deleteMember = useCallback(
        async (memberId: string) => await deleteMemberStore(memberId, teamId),
        [deleteMemberStore, teamId]
    )

    const leaveTeam = useCallback(
        async () => await leaveTeamStore(teamId),
        [leaveTeamStore, teamId]
    )

    useEffect(() => {
        fetchTeamMembers()
    }, [fetchTeamMembers])

    return {
        teamMembers,
        isLoading: isLoading || membersLoading,
        fetchTeamMembers,
        acceptRequest,
        rejectRequest,
        deleteMember,
        leaveTeam,
    }
}