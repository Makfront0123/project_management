import { useEffect } from "react"

import { useTeamMemberStore } from "../stores/team_member_store"
import { Link, useParams } from "react-router"
import Table from "../components/Table"
const TeamPage = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { teamMemberships, teamMembers, fetchTeamMembers, deleteMember } = useTeamMemberStore();

  const team = teamMemberships.find(t => t.teamId === teamId);
  const isAdmin = team?.role === 'admin';

  useEffect(() => {
    if (teamId) {
      fetchTeamMembers(teamId);
    }
  }, [teamId, fetchTeamMembers]);

  if (!team) {
    return (
      <div className="w-full h-full flex items-center justify-center mt-40">
        <p className="text-gray-500 text-xl">Equipo no encontrado</p>
      </div>
    );
  }



  return (
    <div className="flex w-full h-full">
      <div className="min-w-6xl h-full">
        <div className="mt-20">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-4">{team.name}</h2>

            {isAdmin && (
              <Link to={`/team/${team.teamId}/requests`} className="px-4 py-2 bg-blue-600 mx-auto text-white rounded-md mb-10">  Ver Solicitudes</Link>

            )}
          </div>

          {teamMembers.length === 0 ? (
            <p className="text-gray-500">Este equipo aún no tiene miembros.</p>
          ) : (
            <ul className="space-y-2 w-full px-20">
              {teamMembers
                .filter(member => member.status === "accepted")
                .map(member => (
                  <Table
                    key={member._id}
                    member={member}
                    onDelete={isAdmin ? deleteMember : undefined}
                  />
                ))}
            </ul>
          )}
        </div>
      </div>

      <div className="w-full h-full bg-gray-400">
         
      </div>
    </div>
  );
};

export default TeamPage;