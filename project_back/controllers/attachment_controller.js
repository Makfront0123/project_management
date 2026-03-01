import attachmentService from "../services/attachment_service.js";
import Activity from "../models/ActivityLog.js";
export const uploadAttachment = async (req, res) => {
    try {
        const { taskId, teamId } = req.params;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "Missing file" });
        }

        const existingAttachment = await attachmentService.getByTaskAndUser(
            taskId,
            req.user.id
        );

        const data = {
            taskId,
            teamId,
            fileName: file.originalname,
            fileUrl: file.path,
            uploadedBy: req.user.id,
        };

        let attachment;

        if (existingAttachment) {
            attachment = await attachmentService.updateAttachment(
                existingAttachment._id,
                teamId,
                data
            );
        } else {
            attachment = await attachmentService.createAttachment(data);
        }

        await Activity.create({
            taskId,
            user: req.user.id,
            type: "attachment-uploaded",
            message: "Attachment uploaded",
        });

        res.status(200).json({
            message: "Attachment uploaded successfully",
            attachment,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllAttachments = async (req, res) => {
    try {
        const { taskId, teamId } = req.params;
        const attachments = await attachmentService.getAllAttachments(
            taskId,
            teamId
        );
        res.status(200).json(attachments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getAttachment = async (req, res) => {
    try {
        const { attachmentId, teamId } = req.params;
        const attachment = await attachmentService.getAttachmentById(attachmentId, teamId);
        res.status(200).json(attachment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateAttachment = async (req, res) => {
    try {

        const { attachmentId, teamId } = req.params;
        const file = req.file;

        const attachment = await attachmentService.getAttachmentById(
            attachmentId,
            teamId
        );

        const data = {
            fileName: file.originalname,
            fileUrl: file.path
        };

        const updatedAttachment = await attachmentService.updateAttachment(
            attachmentId,
            teamId,
            data
        );

        await Activity.create({
            taskId: attachment.taskId,
            user: req.user.id,
            type: "attachment-updated",
            message: "Attachment updated"
        });

        res.status(200).json({
            message: "Attachment updated successfully",
            updatedAttachment
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAttachment = async (req, res) => {
    try {

        const { attachmentId, teamId } = req.params;

        const attachment = await attachmentService.getAttachmentById(
            attachmentId,
            teamId
        );

        await attachmentService.deleteAttachment(
            attachmentId,
            teamId
        );

        await Activity.create({
            taskId: attachment.taskId,
            user: req.user.id,
            type: "attachment-deleted",
            message: "Attachment deleted"
        });

        res.status(200).json({
            message: "Attachment deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteByTaskId = async (req, res) => {
    try {
        const { taskId } = req.params;
        await attachmentService.deleteByTaskId(taskId);
        await Activity.create({
            taskId: taskId,
            user: req.user.id,
            type: "attachment-deleted",
            message: "Attachments deleted",
        });
        res.status(200).json({ message: "Attachments deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}