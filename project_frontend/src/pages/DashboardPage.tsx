import { Button } from "../components/ui/button"
import MyTasks from "@/components/MyTasks"
import ProjectOverview from "@/components/ProjectOverview"
import CardStats from "@/components/CardStasts"
import { useDashboard } from "@/hooks/useDashboard"
import { ProjectModal } from "@/components/ProjectModal"
import { icons } from "@/core/icons"
import CreateTeamForm from "@/components/CreateTeamForm"
import Modal from "@/components/Modal"
import { useCreateTeamForm } from "@/hooks/useCreateTeamForm"
import { useState } from "react"

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
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <div className="flex items-center justify-between w-full p-10">
        <div>
          <h2 className="text-2xl font-bold">
            Welcome back, Great to see you!
          </h2>

          <p className="text-gray-300">
            Here's a list of your teams
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          New Project
        </Button>
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

          <MyTasks
            tasks={tasks}
            loading={tasksLoading}
          />

        </div>
          : <div className="flex flex-col items-center gap-3 bg-gray-50 rounded-sm p-10 mx-10 min-h-[40vh]">
            <img src={icons.sidebar01} alt="" />
            <span>No workspace found</span>
            <p>Create a new workspace to get started</p>
            <Button
              onClick={() => setIsModalOpen(true)}
              value="create"
              className="cursor-pointer flex items-center opacity-50 text-gray-400"
            >
              <img
                src={icons.add}
                alt="Add"
                className="w-4 h-4"
              />
              Create new team
            </Button>
          </div>
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