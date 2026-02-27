import type { Task } from "@/features/task/types/task";
import { Link } from "react-router";


interface Props {
  task: Task;
  projectId: string;
  onStatusChange: (id: string, status: string) => void;
  onOpenComments: (id: string) => void;
}

const MemberTaskItem = ({
  task,
  projectId,
}: Props) => {

  return (
    <div
      className="
      bg-white dark:bg-gray-900
      rounded-xl
      p-5
      shadow-sm
      border
      hover:shadow-md
      transition
      flex flex-col gap-4
    "
    >
      {/* HEADER */}
      <Link
        to={`/projects/${projectId}/tasks/${task._id}`} className="flex justify-between items-start">
        <div>

          <h1 className="font-semibold text-lg hover:underline">{task.name}</h1>

          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {task.description}
          </p>
        </div>

        <span
          className={`
            text-xs px-2 py-1 rounded font-medium uppercase
            ${task.priority === "high" && "bg-red-100 text-red-600"}
            ${task.priority === "medium" && "bg-yellow-100 text-yellow-600"}
            ${task.priority === "low" && "bg-green-100 text-green-600"}
          `}
        >
          {task.priority}
        </span>
      </Link>

      {/* FOOTER */}
      <div className="flex items-center justify-between">

        {/* due date */}
        <span className="text-xs text-gray-400">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </span>

      </div>
    </div>
  );
};

export default MemberTaskItem;