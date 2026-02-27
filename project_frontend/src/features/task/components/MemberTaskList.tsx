import type { Task } from "@/features/task/types/task";
import MemberTaskItem from "./MemberTaskItem";
interface Props {
  tasks: Task[];
  currentProjectId: string;
  onStatusChange: (id: string, status: string) => void;
  onOpenComments: (id: string) => void;
}

const MemberTaskList = ({
  tasks,
  currentProjectId,
  onStatusChange,
  onOpenComments,
}: Props) => {

  if (!tasks?.length) {
    return <p className="text-gray-500">No hay tareas asignadas</p>;
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <MemberTaskItem
          key={task._id}
          task={task}
          projectId={currentProjectId}
          onStatusChange={onStatusChange}
          onOpenComments={onOpenComments}
        />
      ))}
    </div>
  );
};

export default MemberTaskList;
