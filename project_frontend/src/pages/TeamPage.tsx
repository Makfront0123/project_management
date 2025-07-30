import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import Modal from "../components/Modal";
import Paginator from "../components/Paginator";
import Table from "../components/Table";
import TeamMenuButton from "../components/TeamMenuButton";
import { useForm } from "../hooks/useForm";
import { useNotifications } from "../hooks/useNotications";
import { useProjectStore } from "../stores/project_store";
import { useTeamMemberStore } from "../stores/team_member_store";
import { useTeamStore } from "../stores/team_store";
import type { ProjectForm } from "../types/projects";
import type { CreateTeamFormValue } from "../types/team";

const TeamPage = () => {
  const { teamId } = useParams<{ teamId: string }>();
  useNotifications();

  const navigate = useNavigate();

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
    page, 
    totalPages,  
  } = useProjectStore();

  const { updateTeam, deleteTeam } = useTeamStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamsLoading, setTeamsLoading] = useState(true);
  const [isEditTeamModalOpen, setIsEditTeamModalOpen] = useState(false);

 
  const handlePageChange = (newPage: number) => {
    if (teamId) {
      getProjects(teamId, newPage);
    }
  };

  const handleDeleteTeam = async (teamId: string) => {
    if (!teamId) return;

    if (window.confirm("¿Estás seguro de que quieres eliminar este equipo? Esta acción es irreversible.")) {
      try {
        await deleteTeam(teamId);
        navigate('/dashboard');
      } catch (error) {
        console.error("Error al eliminar el equipo:", error);
      }
    }
  };

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
      if (!values.name.trim()) errors.name = "Name is required";
      if (!values.description.trim()) errors.description = "Description is required";
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

  const {
    values: editTeamValues,
    errors: editTeamErrors,
    isSubmitting: isEditingTeam,
    handleChange: handleEditTeamChange,
    handleSubmit: handleEditTeamSubmit,
  } = useForm<CreateTeamFormValue>({
    initialValues: {
      name: team?.name || '',
      description: team?.description || '',
    },
    onSubmit: async (formValues) => {
      if (!teamId) return;
      try {
        await updateTeam(formValues, teamId);
        setIsEditTeamModalOpen(false);
      } catch (err) {
        console.error("Error al actualizar el equipo:", err);
      }
    },
  });

  if (teamsLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center mt-40">
        <p className="text-gray-500 text-xl">Loading team...</p>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="w-full h-full flex items-center justify-center mt-40">
        <p className="text-gray-500 text-xl">Team not found</p>
      </div>
    );
  }

  return (
    <div className="flex w-full h-screen">
      <div className="w-full overflow-y-auto mt-0 px-4">
        <div className="flex items-center justify-between px-20">
          <h2 className="text-3xl mb-13 text-white font-light">{team.name}</h2>
          <div className="flex item-center gap-2">
            {isAdmin && (
              <Link
                to={`/team/${team.teamId}/requests`}
                className="px-4 py-2 bg-blue-600 mx-auto text-white rounded-md mb-12"
              >
                View requests
              </Link>
            )}
            <Link
              to={`/team/${team.teamId}/chat`}
              className="px-4 py-2 bg-green-600 mx-auto text-white rounded-md mb-12"
            >
              Enter the team chat
            </Link>
            {isAdmin && (
              <TeamMenuButton onDelete={() => handleDeleteTeam(teamId ?? '')} onEdit={() => setIsEditTeamModalOpen(true)} />
            )}
          </div>
        </div>
        {teamMembers.length === 0 ? (
          <p className="text-gray-500">This team has no members yet.</p>
        ) : (
          <ul className="space-y-2 w-full px-0 min-h-[130vh] block text-white">
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
      <div className="w-1/3 h-screen px-4 py-8">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-6 mt-14 text-white">Proyects</h2>
          {isLoading ? (
            <p className="text-gray-500">Loading projects...</p>
          ) : (
            <>
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
              {totalPages > 1 && (
                <Paginator
                  page={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}  
                />
              )}
            </>
          )}
          {!projects.length && (
            <div className="flex flex-col items-center justify-center mt-40">
              <p className="text-gray-500">No projects in this team.</p>
              {isAdmin && (
                <div className="flex items-center mt-20 gap-x-10">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-3 border-2 border-gray-600 text-white rounded-lg cursor-pointer hover:scale-105 transition"
                  >
                    Create project
                  </button>
                </div>
              )}
            </div>
          )}
          {isAdmin && projects.length > 0 && (
            <div className="flex items-center mt-20 gap-x-10">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-3 border-2 border-gray-600 text-white rounded-lg cursor-pointer hover:scale-105 transition"
              >
                Create project
              </button>
            </div>
          )}
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
              <label className="block text-sm font-medium">Project name</label>
              <input
                name="name"
                value={values.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
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
              {isSubmitting ? "Create..." : "Create project"}
            </button>
          </form>
        </Modal>
      )}
      {isAdmin && (
        <Modal
          isOpen={isEditTeamModalOpen}
          onClose={() => setIsEditTeamModalOpen(false)}
          title="Edit team"
        >
          <form onSubmit={handleEditTeamSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Team name</label>
              <input
                name="name"
                value={editTeamValues.name}
                onChange={handleEditTeamChange}
                className="w-full p-2 border rounded"
              />
              {editTeamErrors.name && <p className="text-red-500 text-sm">{editTeamErrors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={editTeamValues.description}
                onChange={handleEditTeamChange}
                className="w-full p-2 border rounded"
              />
              {editTeamErrors.description && <p className="text-red-500 text-sm">{editTeamErrors.description}</p>}
            </div>
            <button
              type="submit"
              disabled={isEditingTeam}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isEditingTeam ? "Saving..." : "Save changes"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default TeamPage;