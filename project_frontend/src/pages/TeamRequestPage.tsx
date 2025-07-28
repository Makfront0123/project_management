import { useEffect } from "react";
import TeamMemberTable from "../components/TeamMemberTable";
import { useParams } from "react-router";
import { useTeamMemberStore } from "../stores/team_member_store";

const TeamRequestPage = () => {
    const { teamId } = useParams<{ teamId: string }>();
    const { teamMembers, getPendingMembersOfTeam, rejectRequest, addMember } = useTeamMemberStore();

    useEffect(() => {
        if (teamId) getPendingMembersOfTeam(teamId);
    }, [teamId, getPendingMembersOfTeam]);

    return (
        <div className="w-full h-full px-10 ">
            <h2 className="text-2xl font-bold mt-20 mb-6 text-white">Solicitudes pendientes</h2>

            {teamMembers.length === 0 ? (
                <p className="text-gray-500">No hay solicitudes pendientes.</p>
            ) : (
                <TeamMemberTable members={teamMembers ?? []} onReject={rejectRequest} onAccept={addMember} />
            )}
        </div>
    );
};

export default TeamRequestPage;
