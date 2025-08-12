import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { useProjectStore } from "../stores/project_store";
import { useTeamMemberStore } from "../stores/team_member_store";
import { useTeamStore } from "../stores/team_store";

export function useTeamPage() {
  const { teamId } = useParams<{ teamId: string }>();
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
 
  const handlePageChange = (newPage: number) => {
    if (teamId) {
      getProjects(teamId, newPage);
    }
  };

  const handleDeleteTeam = async (teamIdToDelete: string) => {
    if (!teamIdToDelete) return;
    if (
      window.confirm(
        "¿Estás seguro de que quieres eliminar este equipo? Esta acción es irreversible."
      )
    ) {
      try {
        await deleteTeam(teamIdToDelete);
        navigate("/dashboard");
      } catch {
        // Error ya manejado con toast en el store
      }
    }
  };
 
  return {
    teamId,
    navigate,
    teamMemberships,
    teamMembers,
    projects,
    page,
    totalPages,
    isLoading,
    teamsLoading,
    isModalOpen,
    setIsModalOpen,
    isEditTeamModalOpen,
    setIsEditTeamModalOpen,
    team,
    isAdmin,
    fetchTeamMembers,
    deleteMember,
    createProject,
    handlePageChange,
    handleDeleteTeam,
    updateTeam,
  };
}
