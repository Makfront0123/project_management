import Project from "../models/Project.js";
import Task from "../models/Task.js";
import TaskAssignment from "../models/TaksAssignment.js";
import TagTask from "../models/TaskTag.js";
import Tag from "../models/Tag.js";
import Attachment from "../models/Attachment.js";
import mongoose from "mongoose";
class ProjectRepository {
    async createProject(data) {
        return await Project.create(data);
    }
    async getAllProjects() {
        return await Project.find();
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


    async getProjectByIdOnly(projectId) {
        return await Project.findById(new mongoose.Types.ObjectId(projectId));
    }

    async findProjectById(projectId) {
        return await Project.findById(new mongoose.Types.ObjectId(projectId));
    }
    async deleteProjectCascade(teamId, projectId) {
        const project = await this.getProjectById(teamId, projectId);
        if (!project) return;
        const tasks = await Task.find({ projectId });
        const taskIds = tasks.map(t => t._id);


        await TaskAssignment.deleteMany({ taskId: { $in: taskIds } });
        await TagTask.deleteMany({ taskId: { $in: taskIds } });
        await Attachment.deleteMany({ taskId: { $in: taskIds } });
        await Task.deleteMany({ _id: { $in: taskIds } });
        await Tag.deleteMany({ projectId });



        const deletedProject = await Project.findByIdAndDelete(projectId);

        return deletedProject;
    }
}

export default new ProjectRepository();
