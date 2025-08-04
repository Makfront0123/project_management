
import { create } from 'zustand';
import toast from 'react-hot-toast';
import { getProjects, getProject, createProject, updateProject, deleteProject } from '../services/project_services';
import type { Project, NewProject } from '../types/projects';

type ProjectStore = {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  page: number;
  limit: number;
  totalPages: number;
  totalProjects: number;
  getProjects: (teamId: string, page?: number, limit?: number) => Promise<void>;
  createProject: (teamId: string, data: NewProject) => Promise<void>;
  getProject: (id: string, teamId: string) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>, teamId: string) => Promise<void>;
  deleteProject: (id: string, teamId: string) => Promise<void>;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  currentProject: null,
  isLoading: false,
  page: 1,
  limit: 10,
  totalPages: 1,
  totalProjects: 0,


  getProjects: async (teamId: string, page = 1, limit = 2) => {
    set({ isLoading: true, projects: [] });
    try {


      const { projects, totalPages, totalProjects } = await getProjects(teamId, page, limit);

      set({
        projects,
        totalPages,
        totalProjects,
        page,
        isLoading: false
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({ isLoading: false });
    }
  },

  getProject: async (id: string, teamId: string) => {
    set({ isLoading: true, currentProject: null });
    try {
      const data = await getProject(id, teamId);
      set({ currentProject: data, isLoading: false });
    } catch (error) {
      console.error("Error fetching project:", error);
      set({ isLoading: false });
    }
  },

  createProject: async (teamId: string, data: NewProject) => {
    set({ isLoading: true });
    try {
      const { message, project } = await createProject(teamId, data);
      set((state) => ({
        projects: [...state.projects, project],
        isLoading: false,
        totalProjects: state.totalProjects + 1,
      }));
      toast.success(message);
    } catch (error) {
      console.error("Error creando proyecto:", error);
      set({ isLoading: false });
    }
  },

  updateProject: async (id: string, data: Partial<Project>, teamId: string) => {
    set({ isLoading: true });
    try {
      const { message, } = await updateProject(id, data, teamId);
      const updatedProject = await getProject(id, teamId);
      set((state) => ({
        projects: state.projects.map((project) =>
          project._id === id ? updatedProject : project
        ),
        isLoading: false,
      }));

      toast.success(message);
    } catch (error) {
      console.error("Error actualizando proyecto:", error);
      set({ isLoading: false });
    }
  },

  deleteProject: async (id: string, teamId: string) => {
    set({ isLoading: true });
    try {
      const { message } = await deleteProject(id, teamId);
      set((state) => ({
        projects: state.projects.filter((p) => p._id !== id),
        isLoading: false,
        totalProjects: state.totalProjects - 1,
      }));
      toast.success(message);
    } catch (error) {
      console.error("Error eliminando proyecto:", error);
      set({ isLoading: false });
    }
  },
}));