import { create } from "zustand";
import toast from "react-hot-toast";

import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getProjectsByTeam,
  getProjectAnalytics,
} from "../services/project_services";
import type { NewProject, Project } from "../types/projects";

type ProjectStore = {
  projects: Project[];
  currentProject: Project | null;
  analytics: Project | null;

  isLoadingProjects: boolean;
  isLoadingProject: boolean;
  isLoadingAnalytics: boolean;

  page: number;
  limit: number;
  totalPages: number;
  totalProjects: number;

  getProjects: (
    teamId: string,
    page?: number,
    limit?: number
  ) => Promise<void>;

  getProject: (
    id: string,
    teamId: string
  ) => Promise<void>;

  getProjectAnalytics: (
    teamId: string,
    projectId: string
  ) => Promise<void>;

  getProjectsByTeam: (teamId: string) => Promise<void>;

  createProject: (
    teamId: string,
    data: NewProject
  ) => Promise<void>;

  updateProject: (
    id: string,
    data: Partial<Project>,
    teamId: string
  ) => Promise<void>;

  deleteProject: (
    id: string,
    teamId: string
  ) => Promise<void>;
};
export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  currentProject: null,
  analytics: null,

  isLoadingProjects: false,
  isLoadingProject: false,
  isLoadingAnalytics: false,

  page: 1,
  limit: 10,
  totalPages: 1,
  totalProjects: 0,

  getProjects: async (teamId, page = 1, limit = 10) => {
    set({ isLoadingProjects: true, projects: [] });
    try {
      const { projects, totalPages, totalProjects } = await getProjects(teamId, page, limit);
      set({ projects, totalPages, totalProjects, page, isLoadingProjects: false });
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({ isLoadingProjects: false });
    }
  },

  getProject: async (projectId, teamId) => {
    set({ isLoadingProject: true });
    try {
      const project = await getProject(projectId, teamId);
      set({ currentProject: project, isLoadingProject: false });
      return project; // 🔹 retornamos para poder usar después
    } catch (error) {
      console.error("Error fetching project:", error);
      set({ isLoadingProject: false });
      throw error;
    }
  },

  getProjectAnalytics: async (teamId, projectId) => {
    set({ isLoadingAnalytics: true });
    try {
      const data = await getProjectAnalytics(teamId, projectId);
      set({ analytics: data, isLoadingAnalytics: false });
    } catch (error) {
      console.error("Error fetching analytics:", error);
      set({ isLoadingAnalytics: false });
    }
  },

  getProjectsByTeam: async (teamId: string) => {
    set({ isLoadingProjects: true });
    try {
      const projects = await getProjectsByTeam(teamId);
      set({ projects, isLoadingProjects: false });
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({ isLoadingProjects: false });
    }
  },

  createProject: async (teamId, data) => {
    set({ isLoadingProject: true });

    try {
      const { message } = await createProject(teamId, data);

      await get().getProjectsByTeam(teamId);

      set({ isLoadingProject: false });

      toast.success(message);
    } catch (error) {
      console.error("Error creando proyecto:", error);
      set({ isLoadingProject: false });
    }
  },
  updateProject: async (id, data, teamId) => {
    set({ isLoadingProject: true });
    try {
      const { message } = await updateProject(id, data, teamId);
      const updatedProject = await getProject(id, teamId);

      set((state) => ({
        projects: state.projects.map((project) =>
          project._id === id ? updatedProject : project
        ),
        currentProject:
          state.currentProject?._id === id ? updatedProject : state.currentProject,
        isLoadingProject: false,
      }));

      toast.success(message);
    } catch (error) {
      console.error("Error actualizando proyecto:", error);
      set({ isLoadingProject: false });
    }
  },

  deleteProject: async (id, teamId) => {
    set({ isLoadingProject: true });
    try {
      const { message } = await deleteProject(id, teamId);
      set((state) => ({
        projects: state.projects.filter((p) => p._id !== id),
        currentProject:
          state.currentProject?._id === id ? null : state.currentProject,
        totalProjects: state.totalProjects - 1,
        isLoadingProject: false,
      }));
      toast.success(message);
    } catch (error) {
      console.error("Error eliminando proyecto:", error);
      set({ isLoadingProject: false });
    }
  },
}));