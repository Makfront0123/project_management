import MemberTaskItem from "@/features/task/components/MemberTaskItem";
import type { Props } from "@/shared/types/Modal";

const TaskList = ({
  tasks,
  onEdit,
  onDelete,
  onAssign,
}: Props) => {
  return (
    <div>
      {tasks.map(task => (
        <MemberTaskItem
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onAssign={onAssign}
        />
      ))}
    </div>
  );
};

export default TaskList;
