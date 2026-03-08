import TaskAssignment from "../models/TaskAssignment.js";
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
                    name: 1,
                    status: 1,
                    description: 1,
                    priority: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    assignedUsers: {
                        _id: 1,
                        name: 1,
                        email: 1,
                    },
                },
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
        const assignments = await TaskAssignment.find({ userId });

        const taskIds = assignments.map(a => a.taskId);

        if (!taskIds.length) return [];
        return await Task.find({ _id: { $in: taskIds } })
            .populate({
                path: "projectId",
                select: "name teamId", // trae solo lo que necesitas
                populate: { path: "teamId", select: "_id name" } // si teamId es referencia a Team
            })
            .lean();
    }

    async countByProjects(projectIds) {
        return await Task.aggregate([
            {
                $match: {
                    projectId: { $in: projectIds }
                }
            },
            {
                $group: {
                    _id: "$projectId",
                    total: { $sum: 1 },
                    completed: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
                }
            }
        ]);
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

    async getTasksByUserAndProject(userId, projectId) {

        return TaskAssignment.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(userId) }
            },
            {
                $lookup: {
                    from: "tasks",
                    localField: "taskId",
                    foreignField: "_id",
                    as: "task"
                }
            },
            { $unwind: "$task" },
            {
                $match: { "task.projectId": new mongoose.Types.ObjectId(projectId) }
            },
            {
                $replaceRoot: { newRoot: "$task" }
            }
        ]);
    }

    async isTaskAssignedToUser(taskId, userId) {
        return await TaskAssignment.exists({
            taskId: new mongoose.Types.ObjectId(taskId),
            userId: new mongoose.Types.ObjectId(userId)
        });
    }
}


export default new TaskRepository();