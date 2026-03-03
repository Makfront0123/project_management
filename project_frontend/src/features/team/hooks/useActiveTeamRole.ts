import { useTeamWorkflow } from "./useTeamWorkflows"
import { useUserTeams } from "./useUserTeam"

export const useActiveTeamRole = () => {
    const { teamMemberships } = useUserTeams()
    const { activeTeamId } = useTeamWorkflow()

    const activeMembership = teamMemberships.find(
        (membership) => membership.team._id === activeTeamId
    )

    return {
        role: activeMembership?.role,
        isAdmin: activeMembership?.role === "admin"
    }
}