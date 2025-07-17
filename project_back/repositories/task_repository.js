import Task from "../models/Task.js";
import mongoose from "mongoose";
class TaskRepository {
    async createTask(data) {
        return await Task.create(data);
    }
    async getAllTasksByProject(projectId) {
        return await Task.find({ projectId });
    }
    async getTaskById(projectId, taskId) {
        return await Task.findById({
            _id: new mongoose.Types.ObjectId(taskId),
            projectId: projectId,
        });
    }
    async updateTask(taskId, projectId, data) {
        return await Task.findByIdAndUpdate(
            { _id: new mongoose.Types.ObjectId(taskId), projectId: projectId },
            { $set: data },
            { new: true }
        );
    }

    async deleteTask(projectId, taskId) {
        return await Task.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(taskId), projectId: projectId });
    }

    async findTaskById(taskId) {
       return await Task.findById(taskId).lean(); 
    }
}

export default new TaskRepository();