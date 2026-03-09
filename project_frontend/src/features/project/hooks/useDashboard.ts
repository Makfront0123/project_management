import { useEffect, useMemo, useState } from "react"
import { useProjectStore } from "@/features/project/store/project_store"

import useTaskStore from "@/features/task/store/task_store"
import { useTeamStore } from "@/features/team/store/team_store"
import { useNavigate } from "react-router"
import { icons } from "@/shared/constants/icons"
import type { Team } from "@/features/team/types/team"
import { useTeamMemberStore } from "@/features/team/store/team_member_store"
import type { Task } from "@/features/task/types/task"
import type { UserTeamStatus } from "@/shared/types/userTeamStatus"

export const useDashboard = () => {
    const navigate = useNavigate()
    const {
        teamMemberships,
        getUserTeamStatus,
        getTeamCode,
        confirmJoinWithCode,
    } = useTeamMemberStore()

    const {
        activeTeamId,
        setActiveTeam,
        teams,
        getTeamDashboard,
        fetchTeams,
        dashboard,
    } = useTeamStore()

    const {
        getProjectsByTeam,
        projects,
        isLoadingProjects: projectsLoading,
    } = useProjectStore()

    const {
        tasks,
        isLoading: tasksLoading,
        getTaskByUser,
    } = useTaskStore()


    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [showWelcomeModal, setShowWelcomeModal] = useState(false)
    const [teamCode, setTeamCode] = useState("")
    const [pendingTeamId, setPendingTeamId] = useState<string | null>(null)
    const [inputCode, setInputCode] = useState("")
    const [codeError, setCodeError] = useState("")
    const [userTasksForTeam, setUserTasksForTeam] = useState<Task[]>([]);

    const [isDeleteProjectsOpen, setIsDeleteProjectsOpen] = useState(false);
    useEffect(() => {
        fetchTeams()
    }, [fetchTeams])

    useEffect(() => {
        getUserTeamStatus()
    }, [getUserTeamStatus])
    useEffect(() => {
        if (!activeTeamId && teamMemberships.length) {
            setActiveTeam(teamMemberships[0].team._id)
        }
    }, [activeTeamId, teamMemberships, setActiveTeam])


    useEffect(() => {
        if (!activeTeamId) return

        getProjectsByTeam(activeTeamId)
    }, [activeTeamId, getProjectsByTeam])

    useEffect(() => {
        if (!activeTeamId) return

        getTeamDashboard(activeTeamId)
    }, [activeTeamId, getTeamDashboard])

    useEffect(() => {
        if (!activeTeamId) return;

        getTaskByUser().then((tasks) => {
            const filtered = tasks.filter(
                (t) => t.projectId?.teamId?._id === activeTeamId
            );
            setUserTasksForTeam(filtered);
        });
    }, [activeTeamId, getTaskByUser]);

    useEffect(() => {
        if (!teamMemberships.length) return

        const firstTeam = teamMemberships[0]

        if (firstTeam.role !== "member") return

        const teamId = firstTeam.team._id ?? firstTeam.team?._id

        if (!teamId) return

        const key = `shown_code_${teamId}`

        if (localStorage.getItem(key)) return

        getTeamCode(teamId)
            .then((code: any) => {
                setTeamCode(code)
                setShowWelcomeModal(true)
                localStorage.setItem(key, "true")
            })
            .catch(console.error)

    }, [teamMemberships, getTeamCode])
    useEffect(() => {
        const keys = Object.keys(localStorage).filter(k =>
            k.startsWith("shown_code_")
        )

        const teamIds = teamMemberships.map(
            (team: UserTeamStatus) => team.team._id ?? ""
        )

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


    const activeTeam = useMemo(() => {
        if (!activeTeamId) return null

        return teams.find((t: Team) => t._id === activeTeamId) ?? null
    }, [teams, activeTeamId])

    const stats = useMemo(() => {
        if (!dashboard) return []

        const totalProjects = dashboard.projects.length


        const totalTasks = dashboard.projects.reduce(
            (sum, p) => sum + p.totalTasks,
            0
        )

        const completedTasks = dashboard.projects.reduce(
            (sum, p) => sum + p.completedTasks,
            0
        )

        const totalMembers = dashboard.membersCount

        return [
            {
                title: "Total Projects",
                value: totalProjects,
                icon: icons.feature01,
            },
            {
                title: "Total Tasks",
                value: totalTasks,
                icon: icons.feature01,
            },
            {
                title: "Completed Tasks",
                value: completedTasks,
                icon: icons.feature01,
            },
            {
                title: "Total Members",
                value: totalMembers,
                icon: icons.feature01,
            },
        ]
    }, [dashboard])
    return {
        teamMemberships,
        showWelcomeModal,
        teamCode,
        inputCode,
        codeError,
        activeTeam,
        projects,
        projectsLoading,

        tasks,
        tasksLoading,
        userTasksForTeam,

        isCreateOpen,
        activeTeamId,
        stats,

        setShowWelcomeModal,
        setInputCode,
        setIsCreateOpen,

        handleTeamClick,
        handleConfirmCode,

        goCreateTeam,
        goJoinTeam,
        isDeleteProjectsOpen,
        setIsDeleteProjectsOpen,
    }
}