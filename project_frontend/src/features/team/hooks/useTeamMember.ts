import { useTeamMemberStore } from "@/features/team/store/team_member_store";
import { useMemo } from "react";

export const useTeamMember = (memberId?: string) => {
  const { teamMembers } = useTeamMemberStore();

  const member = useMemo(() => {
    if (!memberId) return undefined;
    return teamMembers.find((m) => m._id === memberId);
  }, [teamMembers, memberId]);

  return member;
};