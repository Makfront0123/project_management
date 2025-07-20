import TaskAssignment from "../models/TaksAssignment.js";
import TeamMember from "../models/TeamMember.js";
import mongoose from "mongoose";

class TaskAssignmentRepository {
    async createTaskAssignment(data) {
        return await TaskAssignment.create(data);
    }

    async removeUserFromTask(taskId, userId) {
        return await TaskAssignment.findOneAndDelete({
            taskId: new mongoose.Types.ObjectId(taskId),
            userId: new mongoose.Types.ObjectId(userId),
        });
    }

    async getAllUsersAssignedToTask(taskId) {
        return await TaskAssignment.find({ taskId })
            .populate("userId", "name email")
            .populate("assignedBy", "name")
            .populate("taskId", "name");
    }

    async getUserAssignedToTask(taskId, userId) {
        return await TaskAssignment.findOne({ taskId, userId });
    }

    async getTasksAssignedToUser(userId) {
        const teamMemberships = await TeamMember.find({
            userId: new mongoose.Types.ObjectId(userId),
            status: "accepted"
        });

        const validTeamIds = teamMemberships.map(m => m.teamId.toString());

        const assignments = await TaskAssignment.find({
            userId: new mongoose.Types.ObjectId(userId)
        }).populate({
            path: "taskId",
            populate: {
                path: "projectId",
                select: "teamId name",
            },
        });

        const filtered = assignments.filter(a => {
            const teamId = a.taskId?.projectId?.teamId?.toString();
            return validTeamIds.includes(teamId);
        });

        return filtered;
    }
}

export default new TaskAssignmentRepository();
