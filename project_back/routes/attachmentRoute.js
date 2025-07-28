import express from "express";
import { uploadAttachment, getAllAttachments, deleteAttachment, getAttachment, updateAttachment, deleteByTaskId } from "../controllers/attachment_controller.js";
import { isTeamMember } from "../middlewares/isTeamMember_middleware.js";
import authenticate from "../middlewares/auth_middleware.js";
import upload from "../middlewares/upload_middleware.js";
const router = express.Router();

router.post("/teams/:teamId/tasks/:taskId/attachments", authenticate, isTeamMember, upload.single("file"), uploadAttachment);
router.get("/teams/:teamId/tasks/:taskId/attachments", authenticate, isTeamMember, getAllAttachments);
router.get("/teams/:teamId/attachments/:attachmentId", authenticate, isTeamMember, getAttachment);
router.put("/teams/:teamId/attachments/:attachmentId", authenticate, isTeamMember,upload.single("file"), updateAttachment);
router.delete("/teams/:teamId/attachments/:attachmentId", authenticate, isTeamMember, deleteAttachment);
router.delete("/tasks/:taskId/attachments", authenticate, isTeamMember, deleteByTaskId);

export default router;