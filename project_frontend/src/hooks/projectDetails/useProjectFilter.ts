import type { Project } from "@/shared/types/projects"
import { useMemo, useState } from "react"


export type StatusFilter = "all" | "active" | "completed" | "pending"

export const useProjectFilter = (projects: Project[]) => {
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState<StatusFilter>("all")

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const matchesSearch =
                project.name.toLowerCase().includes(search.toLowerCase()) ||
                project.description?.toLowerCase().includes(search.toLowerCase())
            const matchesStatus =
                status === "all" || project.status === status

            return matchesSearch && matchesStatus
        })
    }, [projects, search, status])

    return {
        search,
        setSearch,

        status,
        setStatus,

        filteredProjects,
    }
}
