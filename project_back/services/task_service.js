import taskRepo from "../repositories/task_repository.js";
import projectService from "./project_service.js";
import Attachment from "../models/Attachment.js";
import TagTask from "../models/TaskTag.js";
import Comment from "../models/Comment.js";
import TaskAssignment from "../models/TaksAssignment.js";
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
        
        const task = await taskRepo.findTaskById(taskId);
        if (!task || task.projectId.toString() !== projectId) {
            throw new Error('Tarea no encontrada o no pertenece al proyecto');
        }

        
        await taskRepo.deleteTask(projectId, taskId);

        
        await Promise.all([
            Comment.deleteMany({ taskId }),
            TaskAssignment.deleteMany({ taskId }),
            TagTask.deleteMany({ taskId }),
            Attachment.deleteMany({ taskId }),
        ]);
    }
    async markTaskAsCompleted(taskId) {
        return await taskRepo.markTaskAsCompleted(taskId);
    }
}

export default new TaskService();
