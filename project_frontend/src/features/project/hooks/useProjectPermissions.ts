import { useTeamMemberStore } from "@/features/team/store/team_member_store";
import { useMemo } from "react";

export const useProjectPermissions = (teamId?: string) => {
  const { teamMemberships, teamMembers } = useTeamMemberStore();
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
