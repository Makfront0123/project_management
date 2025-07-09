import taskAssignmentRepo from "../repositories/task_assignment_repository.js";

class TaskAssignmentService {
    async createTaskAssignment(data) {
        return await taskAssignmentRepo.createTaskAssignment(data);
    }

    async removeUserFromTask( taskId, userId) {
        return await taskAssignmentRepo.removeUserFromTask( taskId, userId);
    }

    async getAllUsersAssignedToTask(taskId) {
        return await taskAssignmentRepo.getAllUsersAssignedToTask(taskId);
    }

    async getUserAssignedToTask(taskId, userId) {
        return await taskAssignmentRepo.getUserAssignedToTask(taskId, userId);
    }
}
export default new TaskAssignmentService();