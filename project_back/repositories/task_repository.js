import TaksAssignment from "../models/TaksAssignment.js";
import Task from "../models/Task.js";

import mongoose from "mongoose";
class TaskRepository {
    async createTask(data) {
        return await Task.create(data);
    }
    async getAllTasksByProject(projectId) {
        return await Task.aggregate([
            {
                $match: {
                    projectId: new mongoose.Types.ObjectId(projectId)
                }
            },

            // Join assignments
            {
                $lookup: {
                    from: "taskassignments",
                    localField: "_id",
                    foreignField: "taskId",
                    as: "assignments"
                }
            },

            // Join users
            {
                $lookup: {
                    from: "users",
                    localField: "assignments.userId",
                    foreignField: "_id",
                    as: "assignedUsers"
                }
            },

            {
                $project: {
                    assignments: 0
                }
            }
        ]);
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

    async deleteByProjectId(projectId) {
        return await Task.deleteMany({ projectId });
    }

    async findTaskById(taskId) {
        return await Task.findById(taskId).lean();
    }

    async markTaskAsCompleted(taskId) {
        return await Task.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(taskId) },
            { $set: { status: "completed" } },
            { new: true }
        );
    }

    async countByProjectId(projectId) {
        return await Task.countDocuments({ projectId });
    }
    async countCompletedByProjectId(projectId) {
        return await Task.countDocuments({ projectId, status: "completed" });
    }


    async getTasksByUser(userId) {
        const assignments = await TaksAssignment.find({ userId });

        const taskIds = assignments.map(a => a.taskId);

        if (!taskIds.length) return [];
        return await Task.find({
            _id: { $in: taskIds }
        })
            .populate("projectId")
            .lean();
    }

    async getTasksWithAssignments(projectId, taskId) {
        return await Task.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(taskId),
                    projectId: new mongoose.Types.ObjectId(projectId),
                },
            },

            // Join assignments
            {
                $lookup: {
                    from: "taskassignments",
                    localField: "_id",
                    foreignField: "taskId",
                    as: "assignments",
                },
            },

            // Join users
            {
                $lookup: {
                    from: "users",
                    localField: "assignments.userId",
                    foreignField: "_id",
                    as: "assignedUsers",
                },
            },

            {
                $project: {
                    name: 1,
                    status: 1,
                    description: 1,
                    assignedUsers: {
                        _id: 1,
                        name: 1,
                        email: 1,
                    },
                },
            },
        ]);
    }
}

export default new TaskRepository();