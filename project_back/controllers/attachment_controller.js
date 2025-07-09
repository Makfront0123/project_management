import attachmentService from "../services/attachment_service.js";

export const uploadAttachment = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { teamId } = req.params;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "Missing file" });
        }

        const data = {
            taskId,
            teamId,
            fileName: file.originalname,
            fileUrl: `/uploads/${file.filename}`,
            uploadedBy: req.user.id,
        };

        const attachment = await attachmentService.createAttachment(data);
        res.status(201).json({
            message: "Attachment created successfully",
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

export const updateAttachment = async(req, res) => {
     try {
        const { attachmentId,teamId } = req.params;
        const file = req.file;
        const data = {
            fileName: file.originalname,
            fileUrl: `/uploads/${file.filename}`,
        }
        const updatedAttachment = await attachmentService.updateAttachment(attachmentId,teamId, data);
        res.status(200).json({
            message: "Attachment updated successfully",
            updatedAttachment,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const deleteAttachment = async (req, res) => {
    try {
        const { attachmentId,teamId } = req.params;
        await attachmentService.deleteAttachment(attachmentId, teamId);
        res.status(200).json({ message: "Attachment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}
 