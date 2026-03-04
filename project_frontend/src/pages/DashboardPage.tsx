import { Button } from "../shared/components/ui/button"
import ProjectOverview from "@/features/project/components/ProjectOverview"
import CardStats from "@/shared/components/CardStasts"
import { ProjectModal } from "@/features/project/components/ProjectModal"
import CreateTeamForm from "@/features/team/components/CreateTeamForm"
import Modal from "@/shared/components/Modal"
import { useState } from "react"
import MyTasks from "@/features/task/components/MyTasks"
import { useCreateTeamForm } from "@/features/team/hooks/useCreateTeamForm"
import { useDashboard } from "@/features/project/hooks/useDashboard"
import { TeamNotFound } from "@/features/team/components/TeamNotFound"
import { useActiveTeamRole } from "@/features/team/hooks/useActiveTeamRole"
import TeamActivity from "@/features/team/components/TeamActivity"

const DashboardPage = () => {

  const {
    projects,
    projectsLoading,
    tasks,
    tasksLoading,
    isCreateOpen,
    stats,
    setIsCreateOpen,
    activeTeamId,
  } = useDashboard()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const createTeamForm = useCreateTeamForm(() =>
    setIsModalOpen(false)
  )

  const { isAdmin } = useActiveTeamRole()

  
  return (
    <div className="flex flex-col w-full min-h-screen bg-white dark:bg-black">
      <div className="flex items-center justify-between w-full p-10">
        <div>
          <h2 className="text-2xl font-bold">
            Welcome back, Great to see you!
          </h2>

          <p className="text-gray-300">
            Here's a list of your teams
          </p>
        </div>
        {activeTeamId && isAdmin && (
          <Button onClick={() => setIsCreateOpen(true)}>
            New Project
          </Button>
        )}

        {!activeTeamId && (
          <Button onClick={() => setIsModalOpen(true)}>
            Create Team
          </Button>
        )}
      </div>
      <div className="flex items-center justify-evenly w-full">
        {stats.map((stat) => (
          <CardStats
            key={stat.title}
            {...stat}
          />
        ))}
      </div>
      {
        activeTeamId ? <div className="flex p-8 w-full min-h-[58vh] gap-x-5">

          <ProjectOverview
            projects={projects}
            loading={projectsLoading}
          />

          {isAdmin ? (
            <TeamActivity teamId={activeTeamId} />
          ) : (
            <MyTasks
              tasks={tasks}
              loading={tasksLoading}
            />
          )}

        </div>
          : <TeamNotFound onCreate={() => setIsModalOpen(true)} />
      }
      <ProjectModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        teamId={activeTeamId}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create new workspace"
      >
        <CreateTeamForm form={createTeamForm} />
      </Modal>
    </div>
  )
}

export default DashboardPage