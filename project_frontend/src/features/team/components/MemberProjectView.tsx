
import type { Task } from "@/features/task/types/task";
import MemberHeader from "../../project/components/MemberHeader";

import type { Project } from "@/features/project/types/projects";
import MemberTaskList from "@/features/task/components/MemberTaskList";
import { Skeleton } from "@/shared/components/ui/skeleton";

interface Props {
  currentProject: Project;
  tasks: Task[];
  isLoading: boolean;
  updateTaskStatus: (id: string, status: string) => void;
  openComments: (taskId: string) => void;
}

const MemberProjectView = ({
  currentProject,
  tasks,
  isLoading,
  updateTaskStatus,
  openComments,
}: Props) => {
  if (isLoading) return <Skeleton />;
  return (
    <div className="w-full h-full flex flex-col gap-6 p-4">

      <MemberHeader project={currentProject} />

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
