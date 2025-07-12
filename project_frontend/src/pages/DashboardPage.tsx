import { useEffect } from 'react'
import { useTeamMemberStore } from '../stores/team_member_store'
import { Link, useNavigate } from 'react-router'
const DashboardPage = () => {
  const { teamMemberships, isLoading, getUserTeamStatus } = useTeamMemberStore()
  const navigate = useNavigate()

  useEffect(() => {
    getUserTeamStatus()
  }, [getUserTeamStatus])

  const handleTeam = () => {
    navigate('/create-team')
  }

  const handleJoinTeam = () => {
    navigate('/join-team')
  }

  return (
    <div className="flex flex-col items-center justify-start w-full h-screen">
      <h3 className="text-4xl text-center flex flex-col gap-3 mt-20">
        Bienvenido a<br /> <span className="text-blue-600">Project Management</span>
      </h3>

      {isLoading ? (
        <p className="mt-36 text-gray-500 font-light text-2xl">Cargando equipos...</p>
      ) : teamMemberships.length === 0 ? (
        <>
          <h3 className="mt-36 text-gray-500 font-light text-3xl">Aún no perteneces a ningún equipo.</h3>
          <div className="flex items-center mt-20 gap-x-10">
            <button
              onClick={handleTeam}
              className="px-4 py-3 border-2 border-gray-600 rounded-lg cursor-pointer duration-200 transition-all hover:scale-105"
            >
              Crear equipo
            </button>
            <button
              onClick={handleJoinTeam}
              className="px-4 py-3 bg-blue-600 rounded-lg text-white cursor-pointer duration-200 transition-all hover:scale-105"
            >
              Unirse a un equipo
            </button>
          </div>
        </>
      ) : (
        <div className="mt-20 w-full max-w-xl">
          <h3 className="text-2xl mb-4 text-gray-700 font-semibold">Tus Equipos</h3>
          <ul className="space-y-4">
            {teamMemberships.map((team) => (
              <Link
                to={`/team/${team.teamId}`}
                key={team.teamId}
                className="p-4 border rounded shadow flex flex-col items-start hover:bg-gray-50 transition"
              >
                <p className="text-xl font-medium">{team.name}</p>
                <p className="text-gray-500 text-sm">Rol: {team.role}</p>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DashboardPage
