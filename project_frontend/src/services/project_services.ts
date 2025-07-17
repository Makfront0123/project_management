import axios from "axios";
import type { NewProject, Project } from "../types/projects";
import type { Team } from "../types/team";
import { useAuthStore } from "../stores/auth_store";
const baseUrl = "/api/v1";

 
export const createProject = async (
    teamId: string,
    data: NewProject
): Promise<{ message: string; project: Project }> => {
    const token = useAuthStore.getState().token;

    const response = await axios.post(`${baseUrl}/teams/${teamId}/projects`, {
        name: data.name,
        description: data.description,
        teamId,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return {
        message: response.data.message,
        project: response.data.project,
    };
};


export const getProjects = async (teamId: string) => {
 
    const token = useAuthStore.getState().token;
    const response = await axios.get(`${baseUrl}/teams/${teamId}/projects`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const getProject = async (id: string, teamId: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.get(`${baseUrl}/teams/${teamId}/projects/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const updateProject = async (id: string, data: Array<Project>, teamId: Team) => {
    const response = await axios.put(`${baseUrl}/teams/${teamId}/projects/${id}`, data);
    return response.data;
}

export const deleteProject = async (id: Project, teamId: Team) => {
    const response = await axios.delete(`${baseUrl}/teams/${teamId}/projects/${id}`);
    return response.data;
}

export const getProjectsByTeam = async (teamId: Team) => {
    const response = await axios.get(`${baseUrl}/teams/${teamId}/projects`);
    return response.data;
}