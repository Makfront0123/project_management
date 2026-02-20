import AdminProjectView from "@/components/projectDetails/AdminProjectView";
import MemberProjectView from "@/components/projectDetails/MemberProjectView";
import { useProjectData } from "@/hooks/projectDetails/useProjectData";
import { useProjectModals } from "@/hooks/useProjectModal";
import { useTaskWorkflows } from "@/hooks/useTaskWorkflows";
import type { Task } from "@/types/task";
import { useState } from "react";

const ProjectDetails = () => {
  const data = useProjectData();
  const ui = useProjectModals();
  const actions = useTaskWorkflows();


  const [selectedCommentTask, setSelectedCommentTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<"all" | "open" | "completed">("all");

  const filteredTasks = data.tasks.filter((task) => {
    if (filter === "open") return task.status === "open";
    if (filter === "completed") return task.status === "completed";
    return true;
  });

  const filteredAssignments = data.taskAssignments.filter((assignment) => {
    const taskId =
      typeof assignment.taskId === "string"
        ? assignment.taskId
        : assignment.taskId?._id;

    const task = data.tasks.find((t) => t._id === taskId);
    if (!task) return false;

    if (filter === "open") return task.status === "open";
    if (filter === "completed") return task.status === "completed";
    return true;
  });

  const pendingAssignments = filteredAssignments.filter((assignment) => {
    const taskId =
      typeof assignment.taskId === "string"
        ? assignment.taskId
        : assignment.taskId?._id;

    const task = data.tasks.find((t) => t._id === taskId);
    return task?.status !== "completed";
  });

  const completedAssignments = filteredAssignments.filter((assignment) => {
    const taskId =
      typeof assignment.taskId === "string"
        ? assignment.taskId
        : assignment.taskId?._id;

    const task = data.tasks.find((t) => t._id === taskId);
    return task?.status === "completed";
  });

  if (!data.team || data.isLoadingProject || !data.currentProject || !data.tasksLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500">
        Loading Project...
      </div>
    );
  }


  if (data.isAdmin) {
    return (
      <AdminProjectView
        currentProject={data.currentProject}
        tasks={filteredTasks}
        deleteTask={(taskId: string) =>
          actions.deleteTask(taskId, data?.currentProject?._id ?? '')
        }
        updateTask={(taskId: string, data: Partial<Task>) =>
          actions.updateTask(taskId, data)
        }
        setEditingTask={ui.setEditingTask}
        editingTask={ui.editingTask}
        setIsModalOpen={ui.setIsModalOpen}
        isModalOpen={ui.isModalOpen}
      />
    );
  }

  return (
    <MemberProjectView
      data={data.currentProject}
      ui={ui}
      actions={actions}
      pendingAssignments={pendingAssignments}
      completedAssignments={completedAssignments}
      selectedCommentTask={selectedCommentTask}
      setSelectedCommentTask={setSelectedCommentTask}
      filter={filter}
      setFilter={setFilter}
    />
  );
};

export default ProjectDetails;