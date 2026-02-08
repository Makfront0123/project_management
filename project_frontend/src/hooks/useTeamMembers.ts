import { useTeamMemberStore } from "@/stores/team_member_store";
import { useEffect } from "react";

export const useTeamMembers = (teamId?: string) => {
    const { teamMembers, fetchTeamMembers } = useTeamMemberStore();

    useEffect(() => {
        if (teamId) fetchTeamMembers(teamId);
    }, [fetchTeamMembers, teamId]);

    return teamMembers;
};