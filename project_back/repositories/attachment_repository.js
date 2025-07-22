import Attachment from "../models/Attachment.js";
import mongoose from "mongoose";
class AttachmentRepository {
    async createAttachment(data) {
        return await Attachment.create(data);
    }
    async getAllAttachments(taskId, teamId) {
        return await Attachment.find({ taskId, teamId });
    }
    async getAttachmentById(attachmentId, teamId) {
        return await Attachment.findOne({ _id: attachmentId, teamId });
    }
    async updateAttachment(attachmentId, teamId, data) {
        return await Attachment.findOneAndUpdate(
            { _id: attachmentId, teamId },
            { $set: data },
            { new: true }
        );

    }
    async deleteAttachment(attachmentId, teamId) {
        return await Attachment.findOneAndDelete({ _id: attachmentId, teamId });
    }
}
export default new AttachmentRepository();  