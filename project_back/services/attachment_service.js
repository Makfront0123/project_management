import attachmentRepo from "../repositories/attachment_repository.js";

class AttachmentService {
    async createAttachment(data) {
        return await attachmentRepo.createAttachment(data);
    }

    async getAllAttachments( taskId, teamId) {
        return await attachmentRepo.getAllAttachments( taskId, teamId);
    }

    async getAttachmentById(attachmentId, teamId) {
        return await attachmentRepo.getAttachmentById(attachmentId, teamId);
    }

    async updateAttachment(attachmentId, teamId, data) {
        return await attachmentRepo.updateAttachment(attachmentId,teamId ,data);
    }

    async deleteAttachment(attachmentId,teamId) {
        return await attachmentRepo.deleteAttachment(attachmentId,teamId);
    }
}

export default new AttachmentService();