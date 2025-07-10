import { useEffect } from 'react'
import { useTeamStore } from '../stores/team_store'
import { useNavigate } from 'react-router'

const DashboardPage = () => {
  const { teams, isLoading, fetchTeams } = useTeamStore()
  const navigate=useNavigate()

  useEffect(() => {
    fetchTeams()
  }, [ fetchTeams ])

  const handleTeam = () => {
    navigate('/create-team')
  }

  return (
    <div className="flex flex-col items-center justify-start w-full h-screen">
      <h3 className="text-4xl text-center flex flex-col gap-3 mt-20">
        Bienvenido a<br /> <span className="text-blue-600">Project Management</span>
      </h3>

      {isLoading ? (
        <p className="mt-36 text-gray-500 font-light text-2xl">Cargando equipos...</p>
      ) : teams.length === 0 ? (
        <>
          <h3 className="mt-36 text-gray-500 font-light text-3xl">Aún no perteneces a ningún equipo.</h3>
          <div className="flex items-center mt-20 gap-x-10">
            <button onClick={handleTeam} className="px-4 py-3 border-2 border-gray-600 rounded-lg cursor-pointer duration-200 transition-all hover:scale-105">
              Crear equipo
            </button>
            <button className="px-4 py-3 bg-blue-600 rounded-lg text-white cursor-pointer duration-200 transition-all hover:scale-105">
              Unirse a un equipo
            </button>
          </div>
        </>
      ) : (
        <div className="mt-20 w-full max-w-xl">
          <h3 className="text-2xl mb-4 text-gray-700 font-semibold">Tus Equipos</h3>
          <ul className="space-y-4">
            {teams.map((team) => (
              <li key={team._id} className="p-4 border rounded shadow">
                <p className="text-xl font-medium">{team.teamName}</p>
                <p className="text-sm text-gray-500">Rol: {team.role}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DashboardPage
