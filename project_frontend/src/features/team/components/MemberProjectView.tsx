import MemberHeader from "../../project/components/MemberHeader";
import MemberTaskList from "@/features/task/components/MemberTaskList";
import { Skeleton } from "@/shared/components/ui/skeleton";
import TaskFilter from "@/features/task/components/TaskFilter";
import type { Project } from "@/features/project/types/projects";
import type { Task } from "@/features/task/types/task";

interface Props {
  currentProject: Project;
  tasks: Task[];
  filter: "all" | "open" | "completed";
  setFilter: (value: "all" | "open" | "completed") => void;
  isLoading: boolean;
  updateTaskStatus: (id: string, status: string) => void;
  openComments: (taskId: string) => void;
}

const MemberProjectView = ({
  currentProject,
  tasks,
  filter,
  setFilter,
  isLoading,
  updateTaskStatus,
  openComments,
}: Props) => {

  if (isLoading) return <Skeleton />;

  return (
    <div className="w-full h-full flex flex-col gap-6 p-4">

      <MemberHeader project={currentProject} />

      <TaskFilter value={filter} onChange={setFilter} />

      <MemberTaskList
        tasks={tasks}
        currentProjectId={currentProject._id}
        onStatusChange={updateTaskStatus}
        onOpenComments={openComments}
      />

    </div>
  );
};

export default MemberProjectView;