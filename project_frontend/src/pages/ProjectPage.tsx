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
import { ProjectCardSkeleton } from "@/features/project/components/ProjectCardSkeleton"
import { usePagination } from "@/shared/hooks/usePagination"
import { useProjectWorkflows } from "@/features/project/hooks/useProjectWorkflows"


const ProjectPage = () => {
  const {
    projects,
    projectsLoading,
    isCreateOpen,
    setIsCreateOpen,
    activeTeamId,
    isDeleteProjectsOpen,
    setIsDeleteProjectsOpen,
  } = useDashboard()

  const {
    search,
    setSearch,
    status,
    setStatus,
    filteredProjects,
  } = useProjectFilter(projects)
  const {
    page,
    totalPages,
    items: paginatedProjects,
    nextPage,
    prevPage,
  } = usePagination(filteredProjects, 6)
  const { deleteProjects } = useProjectWorkflows()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const createTeamForm = useCreateTeamForm(() =>
    setIsModalOpen(false)
  )

  const { isAdmin } = useActiveTeamRole()

  if (projectsLoading) {
    return (
      <div className="p-10 text-center">
        <ProjectCardSkeleton />
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
        <div className="flex flex-col w-full h-screen p-10 bg-white dark:bg-black">
          <div className="flex items-center justify-between w-full">
            <div>
              <h2 className="text-2xl font-bold">Projects</h2>
              <p className="text-gray-300">
                Manage and track your projects
              </p>
            </div>

            {activeTeamId && isAdmin && (
              <div className="flex gap-x-5">
                <Button onClick={() => setIsCreateOpen(true)}>
                  New Project
                </Button>
                <Button variant="outline" onClick={() => setIsDeleteProjectsOpen(true)}>
                  Delete Projects
                </Button>
              </div>
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
            {paginatedProjects.length ? (
              <ProjectCard
                projects={paginatedProjects}
                variant="grid"
              />
            ) : (
              <p className="text-gray-400 col-span-full text-center">
                No projects found
              </p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                onClick={prevPage}
                disabled={page === 1}
              >
                Previous
              </Button>

              <span className="text-sm">
                Page {page} of {totalPages}
              </span>

              <Button
                variant="outline"
                onClick={nextPage}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}

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
      <Modal
        isOpen={isDeleteProjectsOpen}
        onClose={() => setIsDeleteProjectsOpen(false)}
        title="Delete All Projects"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsDeleteProjectsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                deleteProjects(activeTeamId??'');
                setIsDeleteProjectsOpen(false);
              }}
            >
              Delete Projects
            </Button>
          </div>
        }
      >
        <p className="text-gray-600 dark:text-gray-300">
          This will remove <strong>all projects</strong> and their associated tasks in this team.
        </p>
        <p className="text-red-500 mt-2">
          This action cannot be undone.
        </p>
      </Modal>
    </>
  )
}

export default ProjectPage
