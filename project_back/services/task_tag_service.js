
import taskTagRepo from "../repositories/task_tag_repository.js";

class TaskTagService {
    async createTaskTag(data) {
        return await taskTagRepo.createTaskTag(data);
    }

    async removeTagFromTask(taskId, tagId) {
        return await taskTagRepo.removeTagFromTask(taskId, tagId);
    }

    async getAllTagsOfTask(taskId) {
        return await taskTagRepo.getAllTagsOfTask(taskId);
    }

    async getTagOfTask(taskId, tagId) {
        return await taskTagRepo.getTagOfTask(taskId, tagId);
    }
}
export default new TaskTagService();