import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useProjectStore } from "../stores/project_store";
import { useTeamMemberStore } from "../stores/team_member_store";
import Modal from "../components/Modal";
import type { Task } from "../types/task";

import { useForm } from "../hooks/useForm";
import useTaskStore from "../stores/task_store";
import useTaskAssignamentStore from "../stores/task_assignament_store";

type TaskFormValues = {
  name: string;
  description: string;
};

const ProjectDetails = () => {
  const { currentProject, isLoading, getProject } = useProjectStore();
  const { tasks, createTask, getTasks, deleteTask, updateTask } = useTaskStore();
  const { teamMemberships, getAllMembersOfTeam, teamMembers, getUserTeamStatus } = useTeamMemberStore();
  const { taskAssignments, getTasksToUserAssignments, assignTask, getAllUsersAssignedToTask } = useTaskAssignamentStore();
  const { projectId, teamId } = useParams<{ projectId: string; teamId: string }>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [tasksLoaded, setTasksLoaded] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedUserId, setSelectedUserId] = useState("");





  const team = useMemo(() => {
    return teamMemberships.find((t) => t.teamId === teamId);
  }, [teamId, teamMemberships]);


  const acceptedMembers = useMemo(() => {
    return teamMembers.filter(m => m.status === "accepted" && m.role !== "admin");
  }, [teamMembers]);


  const isAdmin = team?.role === "admin";

  const validate = (values: TaskFormValues) => {
    const errors: Partial<Record<keyof TaskFormValues, string>> = {};
    if (!values.name.trim()) errors.name = "El nombre es obligatorio";
    if (!values.description.trim()) errors.description = "La descripción es obligatoria";
    return errors;
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    setValues,
  } = useForm<TaskFormValues>({
    initialValues: { name: "", description: "" },
    validate,
    onSubmit: async (values: TaskFormValues) => {
      if (!projectId) return;

      if (editingTask) {
        await updateTask(editingTask._id, values, projectId);
        setEditingTask(null);
      } else {
        await createTask(projectId, values);
      }

      setIsModalOpen(false);
      setValues({ name: "", description: "" });
      await getTasks(projectId);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!projectId || !teamId) return;

      await getUserTeamStatus();
      await getProject(projectId, teamId);
      await getTasks(projectId);

      const loadedTasks = useTaskStore.getState().tasks;

      await getAllMembersOfTeam(teamId);

      // Limpiar taskAssignments antes
      useTaskAssignamentStore.setState({ taskAssignments: [] });

      if (isAdmin) {
        for (const task of loadedTasks) {
          await getAllUsersAssignedToTask(task._id, teamId);
        }

        const uniqueAssignments = Array.from(
          new Map(useTaskAssignamentStore.getState().taskAssignments.map(a => [a._id, a])).values()
        );
        useTaskAssignamentStore.setState({ taskAssignments: uniqueAssignments });

      } else {
        await getTasksToUserAssignments(projectId);
      }



      setTasksLoaded(true);
    };

    fetchData();
  }, [getUserTeamStatus, getProject, getTasks, projectId, teamId, getAllMembersOfTeam, getTasksToUserAssignments, getAllUsersAssignedToTask, isAdmin]);

  if (!team) {
    return <p className="text-gray-500 w-full h-screen flex items-center justify-center">Cargando equipo...</p>;
  }

  if (isLoading) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <p className="text-gray-500">Cargando proyecto...</p>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <p className="text-gray-500 w-full h-full flex items-center justify-center">
        Proyecto no encontrado
      </p>
    );
  }

  if (!tasksLoaded) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <p className="text-gray-500">Cargando tareas...</p>
      </div>
    );
  }

  const findAssignmentForTask = (taskId: string) => {
    const { taskAssignments } = useTaskAssignamentStore.getState();
    return taskAssignments.find((a) => a.taskId?._id === taskId);  
  };

  console.log("Asignaciones al usuario:", taskAssignments);





  return (
    <div className="flex flex-col gap-8 w-full h-full p-20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">📋 Tareas del proyecto</h2>
        {isAdmin && (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            onClick={() => {
              setEditingTask(null);
              setValues({ name: "", description: "" });
              setIsModalOpen(true);
            }}
          >
            ➕ Crear tarea
          </button>
        )}
      </div>

      {!isAdmin && taskAssignments?.length === 0 && (
        <div className="flex items-center justify-center">
          <p className="text-gray-500">No hay tareas asignadas para este usuario</p>
        </div>
      )}


      {!isAdmin && Array.isArray(taskAssignments) && taskAssignments.length > 0 && (
        <div className="flex flex-col gap-4">
          {taskAssignments.map((assignment) => {
            const task = assignment.taskId;
 
            if (!task || !task.name || !task.description) return null;

            return (
              <div
                key={assignment._id}
                className="bg-gray-100 flex items-center justify-between p-4 rounded-lg"
              >
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{task.name}</p>
                  <p className="text-gray-600">{task.description}</p>
                  <p className="text-sm text-gray-400">
                    Asignado el {new Date(assignment.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}


      {isAdmin && tasks.map((task: Task) => {
        const assignment = findAssignmentForTask(task._id);
        const assignedUser = assignment?.userId;

        return (
          <div
            key={task._id}
            className="bg-gray-100 flex items-center justify-between p-4 rounded-lg"
          >
            <div className="flex flex-col">
              <p className="text-lg font-semibold">{task.name}</p>
              <p className="text-gray-600">{task.description}</p>
              {assignedUser && (
                <p className="text-sm text-gray-500 mt-1">
                  Asignada a: <strong>{assignedUser.name}</strong>
                </p>
              )}
            </div>

            <div className="flex gap-x-5 items-center">
              {assignedUser ? (
                <button
                  className="px-5 py-2 rounded-md bg-red-500 text-white"
                  onClick={async () => {
                    await useTaskAssignamentStore.getState().unassignTask(task._id, assignedUser._id);
                    await getTasksToUserAssignments(projectId!);  
                  }}
                >
                  ❌ Quitar asignación
                </button>
              ) : (
                <button
                  className="px-5 py-2 rounded-md bg-purple-500 text-white"
                  onClick={() => {
                    setSelectedTask(task);
                    setShowAssignModal(true);
                  }}
                >
                  Asignar Tarea
                </button>
              )}

              <button
                onClick={() => {
                  setEditingTask(task);
                  setValues({ name: task.name, description: task.description });
                  setIsModalOpen(true);
                }}
                className="px-5 py-2 rounded-md bg-blue-500 text-white"
              >
                Editar
              </button>

              <button
                onClick={async () => {
                  if (!projectId) return;
                  await deleteTask(task._id, projectId);
                  await getTasks(projectId);
                }}
                className="px-5 py-2 rounded-md bg-red-500 text-white"
              >
                Eliminar
              </button>


            </div>
          </div>
        );
      })}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
          setValues({ name: "", description: "" });
        }}
        title={editingTask ? "Editar tarea" : "Crear nueva tarea"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Nombre de la tarea"
              className="border p-2 w-full rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Descripción"
              className="border p-2 w-full rounded"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isSubmitting
              ? editingTask
                ? "Actualizando..."
                : "Creando..."
              : editingTask
                ? "Actualizar tarea"
                : "Guardar tarea"}
          </button>
        </form>
      </Modal>

      {showAssignModal && (
        <Modal
          isOpen={showAssignModal}
          onClose={() => {
            setShowAssignModal(false);
            setSelectedTask(null);
            setSelectedUserId("");
          }}
          title="Asignar tarea a un miembro"
        >
          <div className="space-y-4">
            <label className="block font-semibold">Miembro del equipo:</label>
            <select
              className="w-full border p-2 rounded"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">Selecciona un miembro</option>
              {acceptedMembers.map((member) => (
                <option key={member._id} value={member.userId._id}>
                  {member.userId.name} ({member.userId.email})
                </option>
              ))}
            </select>

            <button
              className="bg-green-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
              disabled={!selectedUserId || !selectedTask}
              onClick={async () => {
                try {
                  await assignTask(selectedTask!._id, selectedUserId);
                  setShowAssignModal(false);
                  setSelectedTask(null);
                  setSelectedUserId("");
                } catch (err) {
                  console.error("Error al asignar tarea:", err);
                }
              }}
            >
              ✅ Asignar tarea
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProjectDetails;
