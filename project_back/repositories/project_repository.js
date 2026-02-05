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

const { ObjectId } = mongoose.Types;
class ProjectRepository {
    isValidId(id) {
        return ObjectId.isValid(id);
    }

    toObjectId(id) {
        return new ObjectId(id);
    }

    async createProject(data) {
        return await Project.create(data);
    }
    async getAllProjects(teamId, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;


            const projects = await Project.find({ teamId })
                .skip(skip)
                .limit(limit);


            const totalProjects = await Project.countDocuments({ teamId });


            const totalPages = Math.ceil(totalProjects / limit);

            return {
                projects,
                totalPages,
                totalProjects,
            };
        } catch (error) {
            console.error("Error fetching projects with pagination:", error);
            throw error;
        }
    }
    async getProjectById(teamId, projectId) {
        return await Project.findOne({
            _id: new mongoose.Types.ObjectId(projectId),
            teamId: teamId,
        });
    }

    async getProjectWithStats(teamId, projectId) {

        if (!this.isValidId(teamId) || !this.isValidId(projectId)) {
            return null;
        }

        const result = await Project.aggregate([
            {
                $match: {
                    _id: this.toObjectId(projectId),
                    teamId: this.toObjectId(teamId),
                },
            },

            // Tasks
            {
                $lookup: {
                    from: "tasks",
                    localField: "_id",
                    foreignField: "projectId",
                    as: "tasks",
                },
            },

            // Members
            {
                $lookup: {
                    from: "teammembers",
                    localField: "teamId",
                    foreignField: "teamId",
                    as: "members",
                },
            },

            // Stats
            {
                $addFields: {
                    totalTasks: { $size: "$tasks" },

                    completedTasks: {
                        $size: {
                            $filter: {
                                input: "$tasks",
                                as: "task",
                                cond: { $eq: ["$$task.status", "completed"] },
                            },
                        },
                    },

                    pendingTasks: {
                        $size: {
                            $filter: {
                                input: "$tasks",
                                as: "task",
                                cond: { $ne: ["$$task.status", "completed"] },
                            },
                        },
                    },

                    membersCount: { $size: "$members" },
                },
            },

            // Progress
            {
                $addFields: {
                    progress: {
                        $cond: [
                            { $eq: ["$totalTasks", 0] },
                            0,
                            {
                                $round: [
                                    {
                                        $multiply: [
                                            { $divide: ["$completedTasks", "$totalTasks"] },
                                            100,
                                        ],
                                    },
                                    0,
                                ],
                            },
                        ],
                    },
                },
            },

            // Cleanup
            {
                $project: {
                    tasks: 0,
                    members: 0,
                },
            },
        ]);

        return result[0] || null;
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

    async findByTeamIds(teamIds) {
        return await Project.find({
            teamId: { $in: teamIds }
        }).sort({ createdAt: -1 });
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
    async getProjectsWithStatsByUser(teamIds) {
        return Project.aggregate([
            {
                $match: {
                    teamId: { $in: teamIds }
                }
            },

            // Join tasks
            {
                $lookup: {
                    from: "tasks",
                    localField: "_id",
                    foreignField: "projectId",
                    as: "tasks"
                }
            },

            // Join members
            {
                $lookup: {
                    from: "teammembers",
                    localField: "teamId",
                    foreignField: "teamId",
                    as: "members"
                }
            },

            {
                $addFields: {
                    totalTasks: { $size: "$tasks" },

                    completedTasks: {
                        $size: {
                            $filter: {
                                input: "$tasks",
                                as: "task",
                                cond: { $eq: ["$$task.status", "completed"] }
                            }
                        }
                    },

                    pendingTasks: {
                        $size: {
                            $filter: {
                                input: "$tasks",
                                as: "task",
                                cond: { $ne: ["$$task.status", "completed"] }
                            }
                        }
                    },

                    membersCount: { $size: "$members" }
                }
            },
            {
                $addFields: {
                    progress: {
                        $cond: [
                            { $eq: ["$totalTasks", 0] },
                            0,
                            {
                                $multiply: [
                                    { $divide: ["$completedTasks", "$totalTasks"] },
                                    100
                                ]
                            }
                        ]
                    }
                }
            },

            {
                $project: {
                    tasks: 0,
                    members: 0
                }
            }
        ]);
    }

    // ===============================
    // TIMELINE
    // ===============================
    async getTasksOverTime(projectId) {

        if (!this.isValidId(projectId)) return [];

        return Task.aggregate([
            {
                $match: {
                    projectId: this.toObjectId(projectId),
                },
            },

            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt",
                        },
                    },
                    count: { $sum: 1 },
                },
            },

            { $sort: { _id: 1 } },

            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    count: 1,
                },
            },
        ]);


    }
}

export default new ProjectRepository();
