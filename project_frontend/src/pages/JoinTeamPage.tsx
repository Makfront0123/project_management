import { useEffect } from "react";
import Paginator from "../components/Paginator";
import { useNotifications } from "../hooks/useNotications";
import { useTeamMemberStore } from "../stores/team_member_store";
import { useTeamStore } from "../stores/team_store";



const JoinTeamPage = () => {
  const { getAllTeams, teams, isLoading, page, totalPages, limit } = useTeamStore();
  const { requestToJoinTeam, requestedTeams, getPendingRequests, teamMemberships, getUserTeamStatus } = useTeamMemberStore();

  useNotifications();

  const handlePageChange = (newPage: number) => {
    getAllTeams(newPage, limit);
  };

  useEffect(() => {
    getAllTeams(page, limit);
    getPendingRequests();
    getUserTeamStatus();
  }, [getAllTeams, getPendingRequests, getUserTeamStatus, page, limit]);

  return (
    <div className="w-full min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Join Team</h1>

      {isLoading ? (
        <p className="text-gray-500">Loading teams...</p>
      ) : teams.length === 0 ? (
        <p className="text-gray-500">No teams found.</p>
      ) : (
        <>
          <ul className="space-y-4 mt-20">
            {teams.map((team) => {
              const isMember = teamMemberships.some(m => m.teamId === team._id);
              const alreadyRequested = requestedTeams.includes(team._id);

              return (
                <div
                  key={team._id}
                  className="flex items-center justify-between border bg-white p-5 rounded-lg shadow hover:shadow-md transition"
                >
                  <li>
                    <p className="text-sm text-gray-600">{team.name}</p>
                    <p className="text-sm text-gray-400">
                      Creator: {team.creator.name} ({team.creator.email})
                    </p>
                  </li>
                  <button
                    onClick={() => requestToJoinTeam(team._id)}
                    disabled={alreadyRequested || isMember}
                    className={`px-8 py-2 rounded-md transition ${alreadyRequested || isMember
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                  >
                    {isMember
                      ? "You are already a member of this team"
                      : alreadyRequested
                        ? "Request sent"
                        : "Request to join"}
                  </button>
                </div>
              );
            })}
          </ul>


          {totalPages > 1 && (
            <Paginator
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default JoinTeamPage;