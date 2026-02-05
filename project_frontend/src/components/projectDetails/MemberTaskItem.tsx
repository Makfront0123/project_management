import type { Task } from "@/types/task";

interface Props {
  task: Task;
  onStatusChange: (id: string, status: string) => void;
  onOpenComments: (id: string) => void;
}

const MemberTaskItem = ({
  task,
  onStatusChange,
  onOpenComments,
}: Props) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow flex justify-between items-center">

      <div>
        <h3 className="font-semibold">
          {task.name}
        </h3>

        <p className="text-sm text-gray-500">
          {task.description}
        </p>
      </div>

      <div className="flex items-center gap-3">

        {/* Estado */}
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task._id, e.target.value)
          }
          className="border rounded px-2 py-1"
        >
          <option value="pending">Pendiente</option>
          <option value="in_progress">En progreso</option>
          <option value="done">Hecho</option>
        </select>

        {/* Comentarios */}
        <button
          onClick={() => onOpenComments(task._id)}
          className="text-blue-600 text-sm hover:underline"
        >
          Comentarios
        </button>

      </div>
    </div>
  );
};

export default MemberTaskItem;
