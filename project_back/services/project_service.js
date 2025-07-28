import projectRepo from "../repositories/project_repository.js";
class ProjectService {
    async createProject(data) {
        return await projectRepo.createProject(data);
    }
    async getAllProjects(teamId, page = 1, limit = 10) {
        return await projectRepo.getAllProjects(teamId, page, limit);
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

    async deleteProjectCascade(teamId, projectId) {
        return await projectRepo.deleteProjectCascade(teamId, projectId);
    }
}
export default new ProjectService();