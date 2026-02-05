import { useDashboard } from "@/hooks/useDashboard"
import { Card } from "./ui/card"
import ProjectCard from "./ProjectCard"

const ProjectOverview = () => {

    const {
        projects,
        projectsLoading,
    } = useDashboard()

    if (projectsLoading) {
        return (
            <Card className="p-6 min-w-3xl">
                Loading projects...
            </Card>
        )
    }

    if (!projects.length) {
        return (
            <Card className="p-6 min-w-3xl flex flex-col items-center justify-center text-gray-400">
                <h3 className="font-semibold">No tienes proyectos</h3>
                <p className="text-sm">Crea tu primer proyecto para comenzar</p>
            </Card>
        )
    }

    return (
        <Card className="p-6 min-w-3xl max-h-[130vh] -space-y-2">
            <h3 className="font-semibold text-lg">Project Overview</h3>

            <div className="flex flex-col gap-5 overflow-y-auto">
                <ProjectCard projects={projects} variant="list" />
            </div>

        </Card>

    )
}

export default ProjectOverview
