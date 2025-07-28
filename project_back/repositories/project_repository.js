import Project from "../models/Project.js";
import Task from "../models/Task.js";
import taskAssignmentRepo from "./task_assignment_repository.js";
import tagTaskRepo from "./task_tag_repository.js";
import taskRepo from "./task_repository.js";
import tagRepo from "./tag_repository.js";
import attachmentRepo from "./attachment_repository.js";
import commentRepo from "./comment_repository.js";
import notificationRepo from "./notification_repository.js";
import mongoose from "mongoose";
class ProjectRepository {
    async createProject(data) {
        return await Project.create(data);
    }
    async getAllProjects(teamId) {
        return await Project.find({ teamId });
    }
    async getProjectById(teamId, projectId) {
        return await Project.findOne({
            _id: new mongoose.Types.ObjectId(projectId),
            teamId: teamId,
        });
    }
    async updateProject(teamId, projectId, data) {
        return await Project.findOneAndUpdate(
            {
                _id: new mongoose.Types.ObjectId(projectId),
                teamId: new mongoose.Types.ObjectId(teamId)
            },
            { $set: data },
            { new: true }
        );
    }



    async findProjectById(projectId) {
        return await Project.findById(new mongoose.Types.ObjectId(projectId));
    }
    async deleteProjectCascade(teamId, projectId) {
        const project = await this.getProjectById(teamId, projectId);
        if (!project) return;
        const tasks = await Task.find({ projectId });
        const taskIds = tasks.map(t => t._id);


        await taskAssignmentRepo.deleteByTaskId(taskIds);
        await commentRepo.deleteByProjectId(projectId);
         await tagRepo.deleteByTeamId(teamId);
        await tagTaskRepo.deleteByTaskId(taskIds);
        await attachmentRepo.deleteByTaskId(taskIds);
        await taskRepo.deleteByProjectId(projectId);
        await notificationRepo.deleteByProjectId(projectId);
        



        const deletedProject = await Project.findByIdAndDelete(projectId);

        return deletedProject;
    }
}

export default new ProjectRepository();
