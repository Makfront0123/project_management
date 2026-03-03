import AdminProjectView from "@/features/team/components/AdminProjectView";
import MemberProjectView from "@/features/team/components/MemberProjectView";
import { useProjectData } from "@/features/project/hooks/useProjectData";
import { useProjectModals } from "@/features/project/hooks/useProjectModal";
import type { Task } from "@/features/task/types/task";
import { useState } from "react";
import { useProjectPermissions } from "@/features/project/hooks/useProjectPermissions";
import { useTaskForm } from "@/features/task/hooks/useTaskForm";
import { useTaskWorkflows } from "@/features/task/hooks/useTaskWorkflows";
import TaskComments from "@/features/task/components/TaskComment";
import { TaskCardSkeleton } from "@/features/task/components/TaskCardSkeleton";
import { useFilteredTasks } from "@/features/task/hooks/useFilteredTasks";
import { useActiveTeamRole } from "@/features/team/hooks/useActiveTeamRole";

const ProjectDetails = () => {
  const data = useProjectData();
  const ui = useProjectModals();
  const permissions = useProjectPermissions(data.currentProject?.teamId);

  const taskForm = useTaskForm(
    data.currentProject?._id,
    ui.editingTask,
    () => {
      ui.setIsModalOpen(false);
      ui.setEditingTask(null);
    }
  );
  const { isAdmin } = useActiveTeamRole()

  const { deleteTask } = useTaskWorkflows();

  const [filter, setFilter] = useState<"all" | "open" | "completed">("all");
  const [selectedCommentTask, setSelectedCommentTask] = useState<Task | null>(null);
  const handleDeleteTask = async (taskId: string): Promise<void> => {
    if (!data.currentProject?._id) return;

    await deleteTask(taskId, data.currentProject._id);
  };

  const tasksToShow = isAdmin
    ? data.tasks
    : data.userTasks;

  const filteredTasks = useFilteredTasks(tasksToShow, filter)
  if (data.isLoadingProject || !data.currentProject || !data.tasksLoaded) {
    return (
      <div className="p-10">
        <TaskCardSkeleton />
      </div>
    );
  }
  if (isAdmin) {
    return (
      <AdminProjectView
        currentProject={data.currentProject}
        tasks={filteredTasks}
        filter={filter}
        setFilter={setFilter}
        acceptedMembers={permissions.acceptedMembers}
        taskForm={taskForm}
        setEditingTask={ui.setEditingTask}
        editingTask={ui.editingTask}
        setIsModalOpen={ui.setIsModalOpen}
        isModalOpen={ui.isModalOpen}
        deleteTask={handleDeleteTask}
      />
    );
  }

  return (
    <>
      <MemberProjectView
        currentProject={data.currentProject}
        tasks={filteredTasks}
        filter={filter}
        setFilter={setFilter}
        isLoading={data.isLoadingProject}
        updateTaskStatus={() => { }}
        openComments={(taskId) => {
          const task = tasksToShow.find((t: Task) => t._id === taskId);
          setSelectedCommentTask(task ?? null);
        }}
      />

      {selectedCommentTask && (
        <TaskComments taskId={selectedCommentTask._id} />
      )}
    </>
  );
};

export default ProjectDetails;