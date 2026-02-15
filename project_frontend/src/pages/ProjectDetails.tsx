import AdminProjectView from "@/components/AdminProjectView";
import MemberProjectView from "@/components/MemberProjectView";
import { useProjectData } from "@/hooks/useProjectData";
import { useProjectModals } from "@/hooks/useProjectModal";
import { useProjectForm } from "@/hooks/useProjectsForm";
import { useTaskActions } from "@/hooks/useTagsActions";
import type { Task } from "@/types/task";
import { useState } from "react";





const ProjectDetails = () => {
  const data = useProjectData();
  const ui = useProjectModals();
  const actions = useTaskActions();
  const form = useProjectForm(
    data.projectId,
    data.teamId,
    ui.editingTask,
    false,
    data.currentProject
  );

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

  if (!data.team || data.isLoading || !data.currentProject || !data.tasksLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500">
        Loading Project...
      </div>
    );
  }


  if (data.isAdmin) {
    return (
      <AdminProjectView
        data={data}
        ui={ui}
        actions={actions}
        form={form}
        filter={filter}
        setFilter={setFilter}
        filteredTasks={filteredTasks}
        selectedCommentTask={selectedCommentTask}
        setSelectedCommentTask={setSelectedCommentTask}
      />
    );
  }

  return (
    <MemberProjectView
      data={data}
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