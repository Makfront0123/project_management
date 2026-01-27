import { useDashboard } from "@/hooks/useDashboard"
import { Card } from "./ui/card"
import type { Project } from "@/types/projects"

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
        <Card className="p-6 min-w-3xl space-y-4 overflow-hidden">

            <h3 className="font-semibold text-lg">
                Project Overview
            </h3>

            <div className="flex flex-col gap-5">
                {projects.map((project: Project) => (
                    <div
                        key={project._id}
                        className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer"
                    >
                        <h4 className="font-medium">{project.name}</h4>

                        <p className="text-sm text-gray-400">
                            {project.description || "Sin descripción"}
                        </p>
                    </div>
                ))}
            </div>

        </Card>
    )
}

export default ProjectOverview
