import projectRepo from "../repositories/project_repository.js";
import taskRepo from "../repositories/task_repository.js";
import teamMemberRepo from "../repositories/team_member_repository.js";
class ProjectService {
    async createProject(data) {
        return await projectRepo.createProject(data);
    }
    async getAllProjects(teamId, page = 1, limit = 10) {
        return await projectRepo.getAllProjects(teamId, page, limit);
    }
    async getProjectById(teamId, projectId) {
        return await projectRepo.getProjectWithStats(teamId, projectId);
    }
    async getProjectsByTeam(teamId) {
        const projects = await projectRepo.findByTeamIds(teamId);

        if (!projects.length) return [];

        const members = await teamMemberRepo.findMembersByTeamId(teamId);
        const membersCount = members.length;

        const projectIds = projects.map(p => p._id);

        const tasksStats = await taskRepo.countByProjects(projectIds);
        const statsMap = new Map();

        tasksStats.forEach(stat => {
            statsMap.set(
                stat._id.toString(),
                stat
            );
        });

        return projects.map(project => {

            const stat = statsMap.get(project._id.toString()) || {
                total: 0,
                completed: 0
            };

            const progress = stat.total === 0
                ? 0
                : Math.round((stat.completed / stat.total) * 100);

            return {
                ...project.toObject(),
                membersCount,
                totalTasks: stat.total,
                completedTasks: stat.completed,
                progress,
            };
        });
    }

    async getProjectAnalytics(teamId, projectId) {
        const project = await projectRepo.getProjectWithStats(
            teamId,
            projectId
        );

        if (!project) throw new Error("Project not found");

        const timeline = await projectRepo.getTasksOverTime(projectId);

        return {
            ...project,
            tasksTimeline: timeline,
        };
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

    async deleteAllProjects(teamId) {
        return await projectRepo.deleteAllProjects(teamId);
    }
}
export default new ProjectService();