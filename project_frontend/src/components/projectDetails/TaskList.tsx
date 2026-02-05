const TaskList = ({
  tasks,
  onEdit,
  onDelete,
  onAssign,
}: Props) => {
  return (
    <div>
      {tasks.map(task => (
        <TaskItem
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
