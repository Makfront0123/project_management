import taskRepo from "../repositories/task_repository.js";
import projectService from "./project_service.js";
 

class TaskService {
    async createTask(data) {
        return await taskRepo.createTask(data);
    }

    async getAllTasksByProject(projectId) {
        return await taskRepo.getAllTasksByProject(projectId);
    }

    async getTaskById(projectId, taskId) {
        return await taskRepo.getTaskById(projectId, taskId);
    }

    async findTaskById(taskId) {
        return await taskRepo.findTaskById(taskId);
    }

    async findTaskWithTeam(taskId) {
        const task = await taskRepo.findTaskById(taskId);
        if (!task) return null;

        const project = await projectService.findProjectById(task.projectId);
        if (!project) return null;

        return { task, teamId: project.teamId };
    }

    async updateTask(taskId, projectId, data) {
        return await taskRepo.updateTask(taskId, projectId, data);
    }

    async deleteTask(projectId, taskId) {
        return await taskRepo.deleteTask(projectId, taskId);
    }
}

export default new TaskService();
