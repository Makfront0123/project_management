import projectRepo from "../repositories/project_repository.js";
class ProjectService {
    async createProject(data) {
        return await projectRepo.createProject(data);
    }
    async getAllProjects() {
        return await projectRepo.getAllProjects();
    }
    async getProjectById(teamId, projectId) {
        return await projectRepo.getProjectById(teamId, projectId);
    }
    async findProjectById(projectId) {
        return await projectRepo.findProjectById(projectId);
    }
    async updateProject(teamId, projectId, data) {
        return await projectRepo.updateProject(teamId, projectId, data);
    }
    async deleteProject(teamId, projectId) {
        return await projectRepo.deleteProject(teamId, projectId);
    }
}
export default new ProjectService();