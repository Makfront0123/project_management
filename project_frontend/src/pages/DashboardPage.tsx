import { useEffect, useState } from "react"
import { useTeamMemberStore } from "../stores/team_member_store"
import Modal from "../components/Modal"
import { useNavigate } from "react-router"

const DashboardPage = () => {
  const {
    teamMemberships,
    isLoading,
    getUserTeamStatus,
    getTeamCode,
    confirmJoinWithCode,
  } = useTeamMemberStore()



  const navigate = useNavigate()

  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  const [teamCode, setTeamCode] = useState("")

  const [pendingTeamId, setPendingTeamId] = useState<string | null>(null)
  const [inputCode, setInputCode] = useState("")
  const [codeError, setCodeError] = useState("")


  useEffect(() => {
    getUserTeamStatus()
  }, [getUserTeamStatus])

  useEffect(() => {
    if (teamMemberships.length > 0) {
      const firstTeam = teamMemberships[0]
      if (firstTeam.role !== "member") return

      const key = `shown_code_${firstTeam.teamId}`
      if (!localStorage.getItem(key)) {
        getTeamCode(firstTeam.teamId)
          .then((code) => {
            setTeamCode(code)
            setShowWelcomeModal(true)
            localStorage.setItem(key, "true")
          })
          .catch((err) => {
            console.error("Error fetching team code:", err)
          })
      }
    }
  }, [teamMemberships, getTeamCode])

  const handleTeamClick = (teamId: string, role: string) => {
    if (role === "member") {
      setPendingTeamId(teamId)
      setInputCode("")
      setCodeError("")
    } else {
      navigate(`/team/${teamId}`)
    }
  }

  const handleConfirmCode = async () => {
    if (!inputCode.trim()) {
      return setCodeError("El código es obligatorio.")
    }

    try {
      await confirmJoinWithCode(pendingTeamId!, inputCode)
      navigate(`/team/${pendingTeamId}`)
    } catch {
      setCodeError("Código incorrecto. Intenta nuevamente.")
    }

  }

  const handleTeam = () => navigate('/create-team')
  const handleJoinTeam = () => navigate('/join-team')



  return (
    <div className="flex flex-col items-center justify-start w-full h-screen">
      <h4 className="text-4xl text-center flex flex-col gap-3 mt-20 text-white">
        Bienvenido a<br /> <span className="text-white">Project Management</span>
      </h4>

      {isLoading ? (
        <p className="mt-36 text-gray-500 font-light text-2xl">Cargando equipos...</p>
      ) : teamMemberships.length === 0 ? (
        <>
          <h3 className="mt-36 text-gray-500 font-light text-3xl">Aún no perteneces a ningún equipo.</h3>
          <div className="flex items-center mt-20 gap-x-10">
            <button onClick={handleTeam} className="px-4 py-3 border-2 text-white border-gray-600 rounded-lg cursor-pointer hover:scale-105 transition">
              Crear equipo
            </button>
            <button onClick={handleJoinTeam} className="px-4 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:scale-105 transition">
              Unirse a un equipo
            </button>
          </div>
        </>
      ) : (
        <div className="mt-20 w-full max-w-xl ">
          <h3 className="text-2xl mb-4 text-gray-700 font-semibold">Tus Equipos</h3>
          <ul className="space-y-4">
            {teamMemberships.map((team) => (
              <button
                key={team.teamId}
                onClick={() => handleTeamClick(team.teamId, team.role)}
                className="w-full text-left p-4 border rounded shadow hover:bg-gray-50 bg-gray-300 transition"
              >
                <p className="text-xl font-medium">{team.name}</p>
                <p className="text-gray-500 text-sm">Rol: {team.role}</p>
              </button>
            ))}
          </ul>
          <div className="flex items-center mt-10 gap-x-10">
            <button onClick={handleTeam} className="px-4 py-3 border-2 border-gray-600 text-white rounded-lg cursor-pointer hover:scale-105 transition">
              Crear equipo
            </button>
            <button onClick={handleJoinTeam} className="px-4 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:scale-105 transition">
              Unirse a un equipo
            </button>
          </div>
        </div>
      )}


      <Modal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        title="Código de equipo"
      >
        <p className="text-center text-lg font-medium">Tu código de equipo es:</p>
        <p className="text-center text-2xl font-bold text-blue-600 mt-2">{teamCode}</p>
      </Modal>


      <Modal
        isOpen={!!pendingTeamId}
        onClose={() => setPendingTeamId(null)}
        title="Ingresa el código del equipo"
      >
        <div className="flex flex-col gap-3">
          <input
            type="text"
            className="border px-3 py-2 rounded"
            placeholder="Código del equipo"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          />
          {codeError && <p className="text-red-500 text-sm">{codeError}</p>}
          <button
            onClick={handleConfirmCode}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Confirmar
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default DashboardPage
