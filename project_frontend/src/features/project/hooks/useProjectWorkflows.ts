import { useCallback } from "react";
import { useNavigate } from "react-router";

import { useProjectStore } from "@/features/project/store/project_store";
import useTagStore from "@/features/tag/store/tag_store";


interface EditProjectParams {
  projectId: string;
  teamId: string;
  name: string;
  description: string;
}

interface CreateProjectParams {
  name: string;
  description: string;
  teamId: string;
}

interface ProjectWorkflows {
  loadProject: (projectId: string, teamId: string) => Promise<void>;
  loadProjects: (teamId: string) => Promise<void>;
  updateProject: (params: EditProjectParams) => Promise<void>;
  deleteProject: (projectId: string, teamId: string) => Promise<void>;
  createProject: (params: CreateProjectParams) => Promise<void>;
}

export const useProjectWorkflows = (): ProjectWorkflows => {
  const navigate = useNavigate();
  const projectStore = useProjectStore();
  const tagStore = useTagStore();



  const loadProjects = useCallback(
    async (activeTeamId: string) => {
      await projectStore.getProjects(activeTeamId);
    },
    [projectStore]
  );

  const loadProject = useCallback(
    async (projectId: string, teamId: string) => {
      await Promise.all([
        projectStore.getProject(projectId, teamId),
        tagStore.getAllTags(teamId),
      ]);
    },
    [projectStore, tagStore]
  );

  const updateProject = useCallback(
    async ({
      projectId,
      teamId,
      name,
      description,
    }: EditProjectParams) => {
      await projectStore.updateProject(
        projectId,
        { name, description },
        teamId
      );
    },
    [projectStore]
  );

  const createProject = useCallback(
    async ({ name, description, teamId }: CreateProjectParams) => {
      await projectStore.createProject(
        teamId,
        {
          name,
          description,
        }
      );
    },
    [projectStore]
  );

  const deleteProject = useCallback(
    async (projectId: string, teamId: string) => {
      await projectStore.deleteProject(projectId, teamId);

      navigate(`/team/${teamId}/projects`);
    },
    [projectStore, navigate]
  );

  return {
    loadProject,
    updateProject,
    deleteProject,
    createProject,
    loadProjects,

  };
};