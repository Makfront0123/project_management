
import TaskTag from "../models/TaskTag.js";
import mongoose from "mongoose";
class TaskTagRepository {
    async createTaskTag(data) {
        return await TaskTag.create(data);
    }
    async removeTagFromTask(taskId, tagId) {
        return await TaskTag.findOneAndDelete({
            taskId: new mongoose.Types.ObjectId(taskId),
            tagId: new mongoose.Types.ObjectId(tagId)
        });
    }
    async getAllTagsOfTask(taskId) {
        return await TaskTag.find({ taskId });
    }
    async getTagOfTask(taskId, tagId) {
        return await TaskTag.findOne({ taskId, tagId });
    }
    async deleteByTaskId(taskId) {
        return await TaskTag.deleteMany({ taskId });
    }
}

export default new TaskTagRepository();