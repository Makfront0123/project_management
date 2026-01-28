import { Button } from "../components/ui/button"
import CardStasts from "@/components/CardStasts"
import { cardStats } from "@/data/cardStats"
import MyTasks from "@/components/MyTasks"
import ProjectOverview from "@/components/ProjectOverview"

 


const DashboardPage = () => {
  return (
    <div className="flex flex-col items-start justify-start w-full h-screen bg-white">


      <div className="flex items-center justify-between w-full p-10">
        <div>
          <h2 className="text-2xl font-bold">Welcome back, Great to see you!</h2>
          <p className="text-gray-300">Here's a list of your teams</p>
        </div>
        <Button>New Project</Button>
      </div>

      <div className="flex items-center justify-evenly w-full">
        {
          cardStats.map((stat) => (
            <CardStasts key={stat.title} {...stat} />
          ))
        }
      </div>

      <div className="flex p-8 w-full min-h-[58vh]  gap-x-5">
        <ProjectOverview />
        <MyTasks />
      </div>
    </div>
  )
}

export default DashboardPage
