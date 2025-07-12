import axios from "axios";
import type { Project } from "../types/projects";
import type { Team } from "../types/team";

const baseUrl = "http://localhost:3000";

export const createProject = async (teamId: Team, data: Array<Project>) => {
    const response = await axios.post(`${baseUrl}/teams/${teamId}/projects`, data);
    return response.data;
}

export const getProjects = async (teamId: Team) => {
    const response = await axios.get(`${baseUrl}/teams/${teamId}/projects`);
    return response.data;
}

export const getProject = async (id: Project, teamId: Team) => {
    const response = await axios.get(`${baseUrl}/teams/${teamId}/projects/${id}`);
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