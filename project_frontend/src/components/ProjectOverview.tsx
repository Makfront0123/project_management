import { useDashboard } from "@/hooks/useDashboard"
import { Card } from "./ui/card"
import type { Project } from "@/types/projects"
import { icons } from "@/core/icons"
import { formatDateShort } from "@/utils/formatDate"
import { ProgressContainer } from "./ProgressContainer"

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

            <div className="flex flex-col gap-5  overflow-y-auto">
                {projects.map((project: Project) => (
                    <div
                        key={project._id}
                        className="p-4 border flex items-start justify-between rounded-md min-h-[20vh] hover:bg-gray-500 cursor-pointer"
                    >
                        <div className="flex flex-col">
                            <h4 className="font-medium">{project.name}</h4>
                            <p className="text-sm text-gray-400 mb-2">
                                {project.description || "Sin descripción"}
                            </p>
                            <div className="flex items-center gap-x-3 mb-4">
                                <div className="flex items-center gap-1">
                                    <img src={icons.sidebar03} alt="Members" className="size-4" />
                                    <span className="text-gray-400 text-sm">{project.membersCount} members</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <img src={icons.calendar} alt="Members" className="size-4" />
                                    <span className="text-sm rounded-sm text-gray-400">{formatDateShort(project.createdAt)}</span>
                                </div>
                            </div>
                            <div className="-mt-2">
                                <ProgressContainer progress={project.progress} />
                            </div>
                        </div>
                        <span className="bg-green-400 p-1 text-sm rounded-sm text-white uppercase font-medium">{project.status}</span>
                    </div>
                ))}
            </div>
        </Card>

    )
}

export default ProjectOverview
