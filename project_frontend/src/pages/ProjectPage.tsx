import ProjectCard from "@/components/ProjectCard"
import { SelectContainer } from "@/components/SelectContainer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useProjectFilter } from "@/hooks/projectDetails/useProjectFilter"
import { useDashboard } from "@/hooks/useDashboard"


const ProjectPage = () => {
  const { projects, projectsLoading } = useDashboard()

  const {
    search,
    setSearch,
    status,
    setStatus,
    filteredProjects,
  } = useProjectFilter(projects)

  if (projectsLoading) {
    return (
      <div className="p-10 text-center">
        Loading projects...
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full h-screen p-10 bg-white">
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-gray-300">Manage and track your projects</p>
        </div>

        <Button>New Project</Button>
      </div>

      <div className="flex mt-10">
        <div className="flex gap-x-6">
          <Input
            className="min-w-[60vh]"
            placeholder="Search project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SelectContainer
            value={status}
            onChange={setStatus}
          />

        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full">

        {filteredProjects.length ? (
          <ProjectCard
            projects={filteredProjects}
            variant="grid"
          />
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            No projects found
          </p>
        )}

      </div>

    </div>
  )
}

export default ProjectPage
