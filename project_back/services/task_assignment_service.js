import taskAssignmentRepo from "../repositories/task_assignment_repository.js";
import TaskAssignment from "../models/TaskAssignment.js";
class TaskAssignmentService {
    async createTaskAssignment(data) {
        return await taskAssignmentRepo.createTaskAssignment(data);
    }

    async removeUserFromTask(taskId, userId) {
        return await taskAssignmentRepo.removeUserFromTask(taskId, userId);
    }

    async deleteAllAssignmentsByUserId(userId) {
        return await taskAssignmentRepo.deleteAllAssignmentsByUserId(userId);
    }

    async deleteAllAssignmentsByTeamId(teamId) {
        return await taskAssignmentRepo.deleteAllAssignmentsByTeamId(teamId);
    }

    async getAllUsersAssignedToTask(taskId) {
        return await taskAssignmentRepo.getAllUsersAssignedToTask(taskId);
    }

    async getUserAssignedToTask(taskId, userId) {
        return await taskAssignmentRepo.getUserAssignedToTask(taskId, userId);
    }
    async getTasksAssignedToUser(userId) {
        return await taskAssignmentRepo.getTasksAssignedToUser(userId);
    }
    async deleteByTaskId(taskId) {
        return await taskAssignmentRepo.deleteByTaskId(taskId);
    }
    async deleteAssignmentsByUsers(userIds) {
        return await TaskAssignment.deleteMany({
            userId: { $in: userIds.map(id => new mongoose.Types.ObjectId(id)) }
        });
    }
    async deleteAssignmentsByUserId(userId) {
        return await TaskAssignment.deleteMany({
            userId: new mongoose.Types.ObjectId(userId),
        });
    }
}
export default new TaskAssignmentService();