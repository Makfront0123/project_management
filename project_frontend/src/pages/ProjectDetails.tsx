import type { Task } from "@/types/task";
import AdminProjectView from "@/components/projectDetails/AdminProjectView";
import MemberProjectView from "@/components/projectDetails/MemberProjectView";
import { useProjectDetails } from "@/hooks/useProjectDetails";
import { Loading } from "@/components/Loading";
import { useTaskWorkflows } from "@/hooks/useTaskWorkflows";


const ProjectDetails = () => {
  const {
    currentProject,
    tasks,
    isAdmin,
    isLoading,
    setEditingTask,
    setIsModalOpen,
    isModalOpen   // 👈 agregar esto
  } = useProjectDetails();

  const { deleteTask, updateTask } = useTaskWorkflows();
  const filteredTasks = (tasks ?? []).filter(
    (t: Task) => t.status !== "archived"
  );

  if (isLoading || !currentProject) {
    return <Loading />;
  }
  return (
    <>
      {isAdmin ? (
        <AdminProjectView
          currentProject={currentProject}
          tasks={filteredTasks}
          deleteTask={deleteTask}
          updateTask={updateTask}
          setEditingTask={setEditingTask}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />

      ) : (
        <MemberProjectView
          currentProject={currentProject}
          tasks={filteredTasks}
        />
      )}


    </>
  );
};

export default ProjectDetails;


