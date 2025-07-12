import { useEffect } from "react"
import { useTeamStore } from "../stores/team_store"
import { useTeamMemberStore } from "../stores/team_member_store"

const JoinTeamPage = () => {
  const { getAllTeams, teams, isLoading } = useTeamStore()
  const { requestToJoinTeam, requestedTeams, getPendingRequests } = useTeamMemberStore()


  useEffect(() => {
    getAllTeams()
    getPendingRequests()  
  }, [getAllTeams, getPendingRequests])


 

  return (
    <div className="w-full min-h-screen p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">Unirse a un equipo</h1>

      {isLoading ? (
        <p className="text-gray-500">Cargando equipos...</p>
      ) : teams.length === 0 ? (
        <p className="text-gray-500">No hay equipos disponibles.</p>
      ) : (
        <ul className="space-y-4">
          {teams.map((team) => {
            const alreadyRequested = requestedTeams.includes(team._id)
            return (
              <div
                key={team._id}
                className="flex items-center justify-between border p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <li>
                  <p className="text-sm text-gray-600">{team.description}</p>
                  <p className="text-sm text-gray-400">
                    Creador: {team.creator.name} ({team.creator.email})
                  </p>
                </li>

                <button
                  onClick={() => requestToJoinTeam(team._id)}
                  disabled={alreadyRequested}
                  className={`px-8 py-2 rounded-md transition ${alreadyRequested
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                >
                  {alreadyRequested ? "Cancelar solicitud" : "Solicitar unirse"}
                </button>
              </div>
            )
          })}


        </ul>
      )}
    </div>
  )
}

export default JoinTeamPage
