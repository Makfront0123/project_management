import { useTeamMemberStore } from "@/stores/team_member_store";
import { useMemo } from "react";

export const useProjectPermissions = (teamId?: string) => {
  const { teamMemberships, teamMembers } = useTeamMemberStore();
  console.log('teamMembers', teamMembers)

  const team = useMemo(
    () => teamMemberships.find(t => t.teamId === teamId),
    [teamId, teamMemberships]
  );

  const isAdmin = team?.role === "admin";

  const acceptedMembers = useMemo(
    () =>
      teamMembers.filter(
        m => m.status === "accepted" && m.role !== "admin"
      ),
    [teamMembers]
  );

  return {
    team,
    isAdmin,
    acceptedMembers,
  };
};
