import { create } from "zustand";
import { createProject, getProject, getProjects, } from "../services/project_services";
import type { NewProject, Project } from "../types/projects";
import toast from "react-hot-toast";

type ProjectStore = {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  getProjects: (teamId: string) => Promise<void>;
  createProject: (teamId: string, data: NewProject) => Promise<void>;
  getProject: (id: string, teamId: string) => Promise<void>;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  currentProject: null,
  isLoading: false,

  getProjects: async (teamId: string) => {
    set({ isLoading: true });
    try {
      const data = await getProjects(teamId);
      set({ projects: data, isLoading: false });
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({ isLoading: false });
    }
  },

  getProject: async (id: string, teamId: string) => {
    set({ isLoading: true });
    try {
      const data = await getProject(id, teamId);
      console.log("data", data);
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
}));
