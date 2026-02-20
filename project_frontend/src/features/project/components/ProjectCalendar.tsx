import type { Task } from "@/features/task/types/task";
import CalendarGrid from "./CalendarGrid";
import { formatDateShort } from "@/shared/utils/formatDate";
import StatusBadge from "../../../shared/components/StatusBadge";

interface Props {
  tasks: Task[];
}

const ProjectCalendar = ({ tasks }: Props) => {

  const upcomingTasks = tasks
    .filter(
      (task) =>
        task.dueDate &&
        new Date(task.dueDate) >= new Date()
    )
    .sort(
      (a, b) =>
        new Date(a.dueDate!).getTime() -
        new Date(b.dueDate!).getTime()
    )
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-background rounded-xl border p-6">
        <h2 className="text-lg font-semibold mb-4">
          Task Calendar
        </h2>

        <CalendarGrid tasks={tasks} />
      </div>
      <div className="bg-background rounded-xl border p-6 space-y-4">
        <h2 className="text-lg font-semibold">
          Upcoming Tasks
        </h2>

        {upcomingTasks.map((task) => (
          <div
            key={task._id}
            className="p-4 rounded-md bg-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="font-medium">
                  {task.name}
                </p>

                <p className="text-xs text-muted-foreground">
                  {formatDateShort(task.dueDate)}
                </p>
              </div>
              <StatusBadge status={task.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCalendar;