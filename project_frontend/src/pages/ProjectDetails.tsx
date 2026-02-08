import type { Task } from "@/types/task";
import AdminProjectView from "@/components/projectDetails/AdminProjectView";
import MemberProjectView from "@/components/projectDetails/MemberProjectView";
import { useProjectDetails } from "@/hooks/useProjectDetails";
import { Loading } from "@/components/Loading";


const ProjectDetails = () => {
  const {
    currentProject,
    tasks,
    isAdmin,
    isLoading,
    isModalOpen,
    setIsModalOpen,
    setEditingTask,
  } = useProjectDetails();

  const filteredTasks = (tasks ?? []).filter(
    (t: Task) => t.status !== "archived"
  );

  const actions = {
    createTask: () => {
      setEditingTask(null);
      setIsModalOpen(true);
    },

    editTask: (task: Task) => {
      setEditingTask(task);
      setIsModalOpen(true);
    },
  }; const modals = {
    isTaskModalOpen: isModalOpen,

    openTaskModal: () => setIsModalOpen(true),
    closeTaskModal: () => setIsModalOpen(false),
  };


  const memberProps = {
    currentProject,
    tasks,
    isLoading,
    filteredTasks,
    openComments: (taskId: string) => {
      console.log("Abrir comentarios:", taskId);
    },
  };

  const adminProps = {
    currentProject,
    tasks,
 
    filteredTasks,
    actions,
    modals,
  };

  console.log('adminProps', adminProps)
  if (isLoading || !adminProps.currentProject) {
    return <Loading />; // o null
  }
  return (
    <>
      {isAdmin ? (
        <AdminProjectView {...adminProps} />
      ) : (
        <MemberProjectView {...memberProps} />
      )}


    </>
  );
};

export default ProjectDetails;


