import { create } from "zustand";
import toast from "react-hot-toast";

import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getProjectsByUser,
  getProjectAnalytics,
} from "../services/project_services";

import type { Project, NewProject } from "../types/projects";

/* ================= TYPES ================= */

type ProjectStore = {
  projects: Project[];
  currentProject: Project | null;
  analytics: Project | null;

  /* Loadings */
  isLoadingProjects: boolean;
  isLoadingProject: boolean;
  isLoadingAnalytics: boolean;

  page: number;
  limit: number;
  totalPages: number;
  totalProjects: number;

  /* Actions */
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

  getProjectsByUser: () => Promise<void>;

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

/* ================= STORE ================= */

export const useProjectStore = create<ProjectStore>((set) => ({
  /* State */

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

  /* ================= PROJECTS ================= */

  getProjects: async (teamId, page = 1, limit = 10) => {
    set({
      isLoadingProjects: true,
      projects: [],
    });

    try {
      const {
        projects,
        totalPages,
        totalProjects,
      } = await getProjects(teamId, page, limit);

      set({
        projects,
        totalPages,
        totalProjects,
        page,
        isLoadingProjects: false,
      });

    } catch (error) {
      console.error("Error fetching projects:", error);

      set({ isLoadingProjects: false });
    }
  },

  /* ================= SINGLE PROJECT ================= */

  getProject: async (projectId, teamId) => {
    set({
      isLoadingProject: true,
      currentProject: null,
    });

    try {
      const data = await getProject(projectId, teamId);

      set({
        currentProject: data,
        isLoadingProject: false,
      });

    } catch (error) {
      console.error("Error fetching project:", error);

      set({ isLoadingProject: false });
    }
  },

  /* ================= ANALYTICS ================= */

  getProjectAnalytics: async (teamId, projectId) => {
    set({ isLoadingAnalytics: true });

    try {
      const data = await getProjectAnalytics(teamId, projectId);

      set({
        analytics: data,
        isLoadingAnalytics: false,
      });

    } catch (error) {
      console.error("Error fetching analytics:", error);

      set({ isLoadingAnalytics: false });
    }
  },

  /* ================= USER PROJECTS ================= */

  getProjectsByUser: async () => {
    set({ isLoadingProjects: true });

    try {
      const projects = await getProjectsByUser();

      set({
        projects,
        isLoadingProjects: false,
      });

    } catch (error) {
      console.error("Error fetching projects:", error);

      set({ isLoadingProjects: false });
    }
  },

  /* ================= CREATE ================= */

  createProject: async (teamId, data) => {
    set({ isLoadingProject: true });

    try {
      const { message, project } = await createProject(teamId, data);

      set((state) => ({
        projects: [...state.projects, project],
        totalProjects: state.totalProjects + 1,
        isLoadingProject: false,
      }));

      toast.success(message);

    } catch (error) {
      console.error("Error creando proyecto:", error);

      set({ isLoadingProject: false });
    }
  },

  /* ================= UPDATE ================= */

  updateProject: async (id, data, teamId) => {
    set({ isLoadingProject: true });

    try {
      const { message } = await updateProject(id, data, teamId);

      const updatedProject = await getProject(id, teamId);

      set((state) => ({
        projects: state.projects.map((project) =>
          project._id === id ? updatedProject : project
        ),
        isLoadingProject: false,
      }));

      toast.success(message);

    } catch (error) {
      console.error("Error actualizando proyecto:", error);

      set({ isLoadingProject: false });
    }
  },

  /* ================= DELETE ================= */

  deleteProject: async (id, teamId) => {
    set({ isLoadingProject: true });

    try {
      const { message } = await deleteProject(id, teamId);

      set((state) => ({
        projects: state.projects.filter((p) => p._id !== id),
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
