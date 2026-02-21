import { useTeamWorkflow } from "./useTeamWorkflows"
import { useUserTeams } from "./useUserTeam"

export const useActiveTeamRole = () => {
    const { teamMemberships } = useUserTeams()
    const { activeTeamId } = useTeamWorkflow()

    const activeMembership = teamMemberships.find(
        (team) => team.teamId === activeTeamId
    )

    return {
        role: activeMembership?.role,
        isAdmin: activeMembership?.role === "admin"
    }
}