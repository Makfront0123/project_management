import projectRepo from "../repositories/project_repository.js";
import teamMemberRepo from "../repositories/team_member_repository.js";
import taskRepo from "../repositories/task_repository.js";
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
    async getProjectsByUser(userId) {
        const teams = await teamMemberRepo.findTeamsByUserId(userId);
        const teamIds = teams.map(t => t.teamId);
        const projects = await projectRepo.findByTeamIds(teamIds);

        const projectsWithStats = await Promise.all(
            projects.map(async (project) => {
                const members = await teamMemberRepo.findMembersByTeamId(project.teamId);

                const totalTasks = await taskRepo.countByProjectId(project._id);
                const completedTasks = await taskRepo.countCompletedByProjectId(project._id);
                const progress = totalTasks === 0
                    ? 0
                    : Math.round((completedTasks / totalTasks) * 100);

                return {
                    ...project.toObject(),
                    membersCount: members.length,
                    totalTasks,
                    completedTasks,
                    progress
                };
            })
        );

        return projectsWithStats;
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