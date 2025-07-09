import Project from "../models/Project.js";
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

    async deleteProject(teamId, projectId) {
        return await Project.findByIdAndDelete(
            {
                _id: new mongoose.Types.ObjectId(projectId),
                teamId: new mongoose.Types.ObjectId(teamId)
            }
        );
    }

    async getProjectByIdOnly(projectId) {
        return await Project.findById(new mongoose.Types.ObjectId(projectId));
    }

    async findProjectById(projectId) {
        return await Project.findById(new mongoose.Types.ObjectId(projectId));
    }
}

export default new ProjectRepository();
