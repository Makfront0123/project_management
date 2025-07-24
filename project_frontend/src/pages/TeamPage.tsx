import { useEffect, useMemo, useState } from "react";
import { useTeamMemberStore } from "../stores/team_member_store";
import { Link, useParams } from "react-router";
import { useProjectStore } from "../stores/project_store";
import { useForm } from "../hooks/useForm";
import Table from "../components/Table";
import Modal from "../components/Modal";
import type { ProjectForm } from "../types/projects";

const TeamPage = () => {
  const { teamId } = useParams<{ teamId: string }>();

  const {
    teamMemberships,
    teamMembers,
    fetchTeamMembers,
    deleteMember,
    getUserTeamStatus,
  } = useTeamMemberStore();

  const {
    projects,
    isLoading,
    getProjects,
    createProject,
  } = useProjectStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamsLoading, setTeamsLoading] = useState(true);

  const team = useMemo(() => {
    return teamMemberships.find((t) => t.teamId === teamId);
  }, [teamId, teamMemberships]);

  const isAdmin = team?.role === "admin";

  useEffect(() => {
    const loadData = async () => {
      await getUserTeamStatus();
      setTeamsLoading(false);
    };
    loadData();
  }, [getUserTeamStatus]);

  useEffect(() => {
    if (teamId) {
      getProjects(teamId);
      fetchTeamMembers(teamId);
    }
  }, [teamId, getProjects, fetchTeamMembers]);

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useForm<ProjectForm>({
    initialValues: { name: "", description: "" },
    validate: (values) => {
      const errors: Partial<Record<keyof ProjectForm, string>> = {};
      if (!values.name.trim()) errors.name = "El nombre es obligatorio";
      if (!values.description.trim()) errors.description = "La descripción es obligatoria";
      return errors;
    },
    onSubmit: async (formValues) => {
      if (!teamId) return;
      try {
        await createProject(teamId, formValues);
        setIsModalOpen(false);
      } catch (err) {
        console.error("Error al crear proyecto:", err);
      }
    },
  });

  if (teamsLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center mt-40">
        <p className="text-gray-500 text-xl">Cargando equipo...</p>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="w-full h-full flex items-center justify-center mt-40">
        <p className="text-gray-500 text-xl">Equipo no encontrado</p>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full">
      <div className="min-w-6xl h-full">
        <div className="mt-20">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-4">{team.name}</h2>
            {isAdmin && (
              <Link
                to={`/team/${team.teamId}/requests`}
                className="px-4 py-2 bg-blue-600 mx-auto text-white rounded-md mb-10"
              >
                Ver Solicitudes
              </Link>
            )}
          </div>

          {teamMembers.length === 0 ? (
            <p className="text-gray-500">Este equipo aún no tiene miembros.</p>
          ) : (
            <ul className="space-y-2 w-full px-20">
              {teamMembers
                .filter((member) => member.teamId === teamId && member.status === "accepted")
                .map((member) => (
                  <Table
                    key={member._id}
                    member={member}
                    onDelete={isAdmin ? deleteMember : undefined}
                  />
                ))}
            </ul>
          )}
        </div>
      </div>

      <div className="w-full h-screen bg-gray-400">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-6 mt-14">Proyectos</h2>

          {isLoading ? (
            <p className="text-gray-500">Cargando proyectos...</p>
          ) : (
            <ul className="space-y-2 w-full px-20">
              {projects.map((project) => (
                <Link
                  to={`/team/${team.teamId}/project/${project._id}`}
                  key={project._id}
                  className="flex flex-col gap-y-2 items-start justify-between p-5 rounded-lg bg-white shadow hover:shadow-xl shadow-gray-300 transition"
                >
                  <p className="text-xl font-medium">{project.name}</p>
                  <p>{project.description}</p>
                </Link>
              ))}
            </ul>
          )}

          {!projects.length && (
            <div className="flex flex-col items-center justify-center mt-40">
              <p className="text-gray-500">No hay proyectos en este equipo.</p>
              {isAdmin && (
                <div className="flex items-center mt-20 gap-x-10">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-3 border-2 border-gray-600 rounded-lg cursor-pointer hover:scale-105 transition"
                  >
                    Crear Proyecto
                  </button>
                </div>
              )}
            </div>


          )}

          {
            isAdmin && projects.length > 0 &&
            <div className="flex items-center mt-20 gap-x-10">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-3 border-2 border-gray-600 rounded-lg cursor-pointer hover:scale-105 transition"
              >
                Crear Proyecto
              </button>
            </div>
          }
        </div>
      </div>

      {isAdmin && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Crear nuevo proyecto"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Nombre del proyecto</label>
              <input
                name="name"
                value={values.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Descripción</label>
              <textarea
                name="description"
                value={values.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Creando..." : "Crear Proyecto"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default TeamPage;
