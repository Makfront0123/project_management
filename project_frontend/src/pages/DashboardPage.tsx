import { Button } from "../components/ui/button"
import MyTasks from "@/components/MyTasks"
import ProjectOverview from "@/components/ProjectOverview"
import CardStats from "@/components/CardStasts"
import { useDashboard } from "@/hooks/useDashboard"
import { CreateProjectModal } from "@/components/CreateProjectModal"

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
      <div className="flex p-8 w-full min-h-[58vh] gap-x-5">

        <ProjectOverview
          projects={projects}
          loading={projectsLoading}
        />

        <MyTasks
          tasks={tasks}
          loading={tasksLoading}
        />

      </div>
      <CreateProjectModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        teamId={activeTeamId}
      />
    </div>
  )
}

export default DashboardPage