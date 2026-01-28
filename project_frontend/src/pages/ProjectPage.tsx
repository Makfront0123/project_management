import { Button } from "@/components/ui/button"

const ProjectPage = () => {
  return (
    <div className="flex flex-col items-start justify-start w-full h-screen bg-white">
      <div className="flex items-center justify-between w-full p-10">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-gray-300">Manage and track your projects</p>
        </div>
        <Button>New Project</Button>
      </div>

    </div>
  )
}

export default ProjectPage