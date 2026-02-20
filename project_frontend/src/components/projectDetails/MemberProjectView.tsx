import type { Project } from "@/shared/types/projects";
import type { Task } from "@/features/task/types/task";
import MemberHeader from "./MemberHeader";
import MemberTaskList from "./MemberTaskList";

interface Props {
  currentProject: Project ;
  tasks: Task[];
  filteredTasks: Task[];
  isLoading: boolean;
  updateTaskStatus: (id: string, status: string) => void;
  openComments: (taskId: string) => void;
}

const MemberProjectView = ({
  currentProject,
  filteredTasks,
  isLoading,
  updateTaskStatus,
  openComments,
}: Props) => {
  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="w-full h-full flex flex-col gap-6 p-4">

      <MemberHeader project={currentProject} />

      <MemberTaskList
        tasks={filteredTasks}
        onStatusChange={updateTaskStatus}
        onOpenComments={openComments}
      />

    </div>
  );
};

export default MemberProjectView;
