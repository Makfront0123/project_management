import { useEffect, useState } from "react"
import { useTeamMemberStore } from "../stores/team_member_store"
import { useNavigate } from "react-router"
import { useProjectStore } from "@/stores/project_store"
import { getTasksByUser } from "@/services/task_services"
import useTaskStore from "@/stores/task_store"

export const useDashboard = () => {

    const {
        teamMemberships,
        getUserTeamStatus,
        getTeamCode,
        confirmJoinWithCode,
    } = useTeamMemberStore()

    const navigate = useNavigate()
    const {
        getProjectsByUser,
        projects,
        isLoading: projectsLoading,
    } = useProjectStore()

    const {
        tasks,
        isLoading: tasksLoading,
    } = useTaskStore()



    const [showWelcomeModal, setShowWelcomeModal] = useState(false)
    const [teamCode, setTeamCode] = useState("")
    const [pendingTeamId, setPendingTeamId] = useState<string | null>(null)
    const [inputCode, setInputCode] = useState("")
    const [codeError, setCodeError] = useState("")


    useEffect(() => {
        getUserTeamStatus()
    }, [getUserTeamStatus])


    useEffect(() => {
        if (!teamMemberships.length) return

        const firstTeam = teamMemberships[0]

        if (firstTeam.role !== "member") return

        const key = `shown_code_${firstTeam.teamId}`

        if (localStorage.getItem(key)) return

        getTeamCode(firstTeam.teamId)
            .then((code: prop) => {
                setTeamCode(code)
                setShowWelcomeModal(true)
                localStorage.setItem(key, "true")
            })
            .catch(console.error)

    }, [teamMemberships, getTeamCode])


    useEffect(() => {
        if (teamMemberships.length) {
            getProjectsByUser()
        }
    }, [getProjectsByUser, teamMemberships])

    useEffect(() => {
        if (teamMemberships.length) {
            getTasksByUser()
        }
    }, [teamMemberships])

    /* ================= CLEAN STORAGE ================= */

    useEffect(() => {

        const keys = Object.keys(localStorage)
            .filter(k => k.startsWith("shown_code_"))

        const teamIds = teamMemberships.map((team: any) => team.teamId)

        keys.forEach(key => {
            const id = key.replace("shown_code_", "")
            if (!teamIds.includes(id)) {
                localStorage.removeItem(key)
            }
        })

    }, [teamMemberships])


    const handleTeamClick = (teamId: string, role: string) => {

        if (role === "member") {
            setPendingTeamId(teamId)
            setInputCode("")
            setCodeError("")
            return
        }

        navigate(`/team/${teamId}`)
    }


    const handleConfirmCode = async () => {

        if (!inputCode.trim()) {
            setCodeError("Code is required")
            return
        }

        try {
            await confirmJoinWithCode(pendingTeamId!, inputCode)
            navigate(`/team/${pendingTeamId}`)
        } catch {
            setCodeError("Code is incorrect")
        }
    }


    const goCreateTeam = () => navigate("/create-team")
    const goJoinTeam = () => navigate("/join-team")


    return {
        teamMemberships,
        showWelcomeModal,
        teamCode,
        inputCode,
        codeError,
        projects,
        projectsLoading,
        tasks,
        tasksLoading,
        setShowWelcomeModal,
        setInputCode,
        handleTeamClick,
        handleConfirmCode,
        goCreateTeam,
        goJoinTeam,
    }

}
