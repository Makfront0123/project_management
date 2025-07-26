import { create } from "zustand";
import { createProject, deleteProject, getProject, getProjects, updateProject, } from "../services/project_services";
import type { NewProject, Project } from "../types/projects";
import toast from "react-hot-toast";

type ProjectStore = {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  getProjects: (teamId: string) => Promise<void>;
  createProject: (teamId: string, data: NewProject) => Promise<void>;
  getProject: (id: string, teamId: string) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>, teamId: string) => Promise<void>;
  deleteProject: (id: string, teamId: string) => Promise<void>;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  currentProject: null,
  isLoading: false,

  getProjects: async (teamId: string) => {
    set({ isLoading: true, projects: [] });  
    try {
      const data = await getProjects(teamId);
      set({ projects: data, isLoading: false });
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
      const { message, project } = await updateProject(id, data, teamId);
      set((state) => ({
        projects: state.projects.map((p) =>
          p._id === project._id ? project : p
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
      }));
      toast.success(message);
    } catch (error) {
      console.error("Error eliminando proyecto:", error);
      set({ isLoading: false });
    }
  },
}));
