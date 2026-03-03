import attachmentService from "../services/attachment_service.js";
import Activity from "../models/ActivityLog.js";
import projectService from "../services/project_service.js";
import taskService from "../services/task_service.js";
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

        const task = await taskService.findTaskById(taskId);
        const project = await projectService.findProjectById(task.projectId);

        await Activity.create({
            teamId: project.teamId,
            projectId: project._id,
            taskId: task._id,
            user: req.user.id,
            type: "attachment-uploaded",
            message: `uploaded attachment "${file.originalname}"`,
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

        const task = await taskService.findTaskById(attachment.taskId);
        const project = await projectService.findProjectById(task.projectId);

        await Activity.create({
            teamId: project.teamId,
            projectId: project._id,
            taskId: task._id,
            user: req.user.id,
            type: "attachment-updated",
            message: "Attachment updated",
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

        const task = await taskService.findTaskById(attachment.taskId);
        const project = await projectService.findProjectById(task.projectId);

        await Activity.create({
            teamId: project.teamId,
            projectId: project._id,
            taskId: task._id,
            user: req.user.id,
            type: "attachment-deleted",
            message: "Attachment deleted",
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