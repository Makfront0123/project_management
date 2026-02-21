import { ProjectModal } from "@/features/project/components/ProjectModal"

import { SelectContainer } from "@/shared/components/SelectContainer"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { useProjectFilter } from "@/features/project/hooks/useProjectFilter"

import ProjectCard from "@/features/project/components/ProjectCard"
import { useDashboard } from "@/features/project/hooks/useDashboard"
import { TeamNotFound } from "@/features/team/components/TeamNotFound"
import { useState } from "react"
import { useCreateTeamForm } from "@/features/team/hooks/useCreateTeamForm"
import CreateTeamForm from "@/features/team/components/CreateTeamForm"
import Modal from "@/shared/components/Modal"
import { useActiveTeamRole } from "@/features/team/hooks/useActiveTeamRole"


const ProjectPage = () => {
  const {
    projects,
    projectsLoading,
    isCreateOpen,
    setIsCreateOpen,
    activeTeamId,
  } = useDashboard()

  const {
    search,
    setSearch,
    status,
    setStatus,
    filteredProjects,
  } = useProjectFilter(projects)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const createTeamForm = useCreateTeamForm(() =>
    setIsModalOpen(false)
  )

  const { isAdmin } = useActiveTeamRole()

  if (projectsLoading) {
    return (
      <div className="p-10 text-center">
        Loading projects...
      </div>
    )
  }

  return (
    <>
      {!activeTeamId ? (
        <div className="mt-20">
          <TeamNotFound onCreate={() => setIsModalOpen(true)} />
        </div>
      ) : (
        <div className="flex flex-col w-full h-screen p-10 bg-white">
          <div className="flex items-center justify-between w-full">
            <div>
              <h2 className="text-2xl font-bold">Projects</h2>
              <p className="text-gray-300">
                Manage and track your projects
              </p>
            </div>

            {activeTeamId && isAdmin && (
              <Button onClick={() => setIsCreateOpen(true)}>
                New Project
              </Button>
            )}
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

          <ProjectModal
            open={isCreateOpen}
            onOpenChange={setIsCreateOpen}
            teamId={activeTeamId}
          />
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create new workspace"
      >
        <CreateTeamForm form={createTeamForm} />
      </Modal>
    </>
  )
}

export default ProjectPage
