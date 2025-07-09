import TaskAssignment from "../models/TaksAssignment.js";
import mongoose from "mongoose";
class TaskAssignmentRepository {
    async createTaskAssignment(data) {
        return await TaskAssignment.create(data);
    }
    async removeUserFromTask(taskId, userId) {
        return await TaskAssignment.findOneAndDelete({
            taskId : new mongoose.Types.ObjectId(taskId),
            userId : new mongoose.Types.ObjectId(userId)
         });
    }
    async getAllUsersAssignedToTask(taskId) {
        return await TaskAssignment.find({ taskId });
    }
    async getUserAssignedToTask(taskId, userId) {
        return await TaskAssignment.findOne({ taskId, userId });
    }
}

export default new TaskAssignmentRepository();