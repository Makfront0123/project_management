import tagRepo from "../repositories/tag_repository.js";
class TagService {
    async createTag(name, teamId) {
        return await tagRepo.createTag(
            name,
            teamId
        );
    }

    async getAllTags(teamId) {
        return await tagRepo.getAllTags(teamId);
    }

    async getTagById(tagId, teamId) {
        return await tagRepo.getTagById(tagId, teamId);
    }

    async updateTag(tagId, teamId, data) {
        return await tagRepo.updateTag(tagId, teamId, data);
    }

    async deleteTag(tagId, teamId) {
        return await tagRepo.deleteTag(tagId, teamId);

    }
}

export default new TagService();