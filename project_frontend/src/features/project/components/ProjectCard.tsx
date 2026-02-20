import type { Project } from '@/shared/types/projects'


import { icons } from '@/shared/constants/icons'
import { Link } from 'react-router'
import { ProgressContainer } from '@/shared/components/ProgressContainer'
import { formatDateShort } from '@/shared/utils/formatDate'
type ProjectCardProps = {
    projects: Project[]
    variant?: "grid" | "list"
}

const ProjectCard = ({ projects, variant = "grid" }: ProjectCardProps) => {
    return (
        <>
            {projects.map((project) => (
                <Link
                    key={project._id}
                    to={`/team/${project.teamId}/project/${project._id}`}
                    className={`
            p-4 border rounded-md cursor-pointer
            flex justify-between gap-4
            ${variant === "list" ? "items-start w-full" : "items-start flex-col min-w-[20vh] overflow-hidden"}
          `}
                >
                    <div className="flex flex-col flex-1">
                        <h4 className="font-medium">{project.name}</h4>

                        <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                            {project.description || "Sin descripción"}
                        </p>

                        <div className="flex items-center gap-x-3 mb-4">
                            <div className="flex items-center gap-1">
                                <img src={icons.calendar} className="size-4" />
                                <span className="text-sm text-gray-400">
                                    {formatDateShort(project.createdAt)}
                                </span>
                            </div>
                        </div>

                        <ProgressContainer progress={project.progress} />
                    </div>

                    <span
                        className={`
              px-2 py-1 text-xs rounded-sm text-white uppercase font-medium
              self-start whitespace-nowrap
              ${project.status === "active" ? "bg-green-400" : "bg-gray-400"}
            `}
                    >
                        {project.status}
                    </span>
                </Link>
            ))}
        </>
    )
}

export default ProjectCard
