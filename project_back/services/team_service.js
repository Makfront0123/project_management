import teamRepo from "../repositories/team_repository.js";
import projectRepo from "../repositories/project_repository.js";
import notificationRepo from "../repositories/notification_repository.js";
import teamMemberRepo from "../repositories/team_member_repository.js";
import messageRepo from "../repositories/message_repository.js";
import taskRepo from "../repositories/task_repository.js";
class TeamService {
    async getAllTeams(page = 1, limit = 4) {
        return await teamRepo.getAllTeams(page, limit);
    }

    async getTeamById(id) {
        return await teamRepo.getTeamById(id);
    }

    async updateTeam(id, data) {
        const team = await teamRepo.getTeamById(id);
        if (!team) throw new Error("Team not found");

        return await teamRepo.updateTeam(id, data);
    }

    async deleteTeam(id) {
        const team = await teamRepo.getTeamById(id);
        if (!team) throw new Error("Team not found");

        await teamMemberRepo.deleteMembersByTeamId(id);


        const projectData = await projectRepo.getAllProjects(id);


        const projectsToDelete = projectData.projects;

        if (Array.isArray(projectsToDelete)) {
            for (const project of projectsToDelete) {
                await projectRepo.deleteProjectCascade(id, project._id);
            }
        }
        await notificationRepo.deleteByTeamId(id);
        await messageRepo.deleteAllMessages(team._id);

        const deletedTeam = await teamRepo.deleteTeam(id);

        return deletedTeam;
    }

    async getTeamDashboard(teamId) {
        const team = await teamRepo.getTeamById(teamId);
        if (!team) throw new Error("Team not found");

        const members = await teamMemberRepo.findMembersByTeamId(teamId);

        const projects = await projectRepo.findByTeamIds(teamId);

        const projectsWithStats = await Promise.all(
            projects.map(async (project) => {

                const totalTasks = await taskRepo.countByProjectId(project._id);
                const completedTasks = await taskRepo.countCompletedByProjectId(project._id);

                const progress = totalTasks === 0
                    ? 0
                    : Math.round((completedTasks / totalTasks) * 100);

                return {
                    ...project.toObject(),
                    totalTasks,
                    completedTasks,
                    progress
                };
            })
        );

        return {
            ...team.toObject(),
            membersCount: members.length,
            projects: projectsWithStats
        };
    }


    async createTeam(data) {
        return await teamRepo.createTeam(data);
    }
    async getConfirmationCode(teamId) {
        return await teamRepo.getConfirmationCode(teamId);
    }
}

export default new TeamService();