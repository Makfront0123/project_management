import { useEffect } from "react";

import { useForm } from "@/hooks/useForm";

import type { Task } from "@/types/task";
import { Loading } from "@/components/Loading";
import AdminProjectView from "@/components/projectDetails/AdminProjectView";
import MemberProjectView from "@/components/projectDetails/MemberProjectView";
import TaskModal from "@/components/projectDetails/TaskModal";
import { useProjectDetails } from "@/hooks/useProjectDetails";

/* ---------------- TYPES ---------------- */

interface TaskFormValues {
  name: string;
  description: string;
}

/* ---------------- COMPONENT ---------------- */

const ProjectDetails = () => {
  const data = useProjectDetails();

  const {
    // data
    currentProject,
    tasks,
    tags,
    team,

    // ui
    isLoading,
    isModalOpen,
    showAssignModal,
    isTagModalOpen,
    isProjectModalOpen,

    setIsModalOpen,
    setShowAssignModal,
    setIsTagModalOpen,
    setIsProjectModalOpen,

    editingTask,
    setEditingTask,

    handleDeleteTask,

    assignTask,
    onCompleteAssignedTask,

    createTask,
    updateTask,
  } = data;

  /* ---------------- FILTER ---------------- */

  const filteredTasks = tasks.filter(
    (t: Task) => t.status !== "archived"
  );

  /* ---------------- FORM ---------------- */

  const form = useForm<TaskFormValues>({
    initialValues: {
      name: "",
      description: "",
    },

    validate: (values) => {
      const errors: Partial<TaskFormValues> = {};

      if (!values.name.trim()) {
        errors.name = "El nombre es obligatorio";
      }

      if (!values.description.trim()) {
        errors.description = "La descripción es obligatoria";
      }

      return errors;
    },

    onSubmit: async (values) => {
      if (!currentProject) return;

      if (editingTask) {
        await updateTask(editingTask._id, values);
      } else {
        await createTask({
          ...values,
          projectId: currentProject._id,
        });
      }

      setIsModalOpen(false);
    },
  });

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setValues,
  } = form;

  /* ---------------- SYNC EDIT MODE ---------------- */

  useEffect(() => {
    if (editingTask) {
      setValues({
        name: editingTask.name,
        description: editingTask.description,
      });
    } else {
      setValues({
        name: "",
        description: "",
      });
    }
  }, [editingTask, isModalOpen, setValues]);

  /* ---------------- LOADING ---------------- */

  if (!team || isLoading || !currentProject) {
    return <Loading />;
  }

  /* ---------------- ACTIONS ---------------- */

  const actions = {
    createTask: () => {
      setEditingTask(null);
      setIsModalOpen(true);
    },

    editTask: (task: Task) => {
      setEditingTask(task);
      setIsModalOpen(true);
    },

    deleteTask: handleDeleteTask,

    assignTask,

    updateTaskStatus: onCompleteAssignedTask,
  };

  /* ---------------- MODALS ---------------- */

  const modals = {
    isTaskModalOpen: isModalOpen,
    isAssignModalOpen: showAssignModal,
    isTagModalOpen: isTagModalOpen,
    isProjectModalOpen: isProjectModalOpen,

    openTaskModal: () => setIsModalOpen(true),
    closeTaskModal: () => setIsModalOpen(false),

    openAssignModal: () => setShowAssignModal(true),
    closeAssignModal: () => setShowAssignModal(false),

    openTagModal: () => setIsTagModalOpen(true),
    closeTagModal: () => setIsTagModalOpen(false),

    openProjectModal: () => setIsProjectModalOpen(true),
    closeProjectModal: () => setIsProjectModalOpen(false),
  };

  /* ---------------- PROPS ---------------- */

  const memberProps = {
    currentProject,
    tasks,
    filteredTasks,
    isLoading,

    updateTaskStatus: onCompleteAssignedTask,

    openComments: (taskId: string) => {
      console.log("Abrir comentarios:", taskId);
    },
  };

  const adminProps = {
    currentProject,
    tasks,
    filteredTasks,
    tags,
    actions,
    modals,
  };

  /* ---------------- RENDER ---------------- */

  return (
    <>
      {data.isAdmin ? (
        <AdminProjectView {...adminProps} />
      ) : (
        <MemberProjectView {...memberProps} />
      )}

      {/* MODAL CREAR / EDITAR */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        values={values}
        errors={errors}
        isSubmitting={isSubmitting}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEditing={!!editingTask}
      />
    </>
  );
};

export default ProjectDetails;
