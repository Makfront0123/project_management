import express from "express";
import { addTagToTask, removeTagFromTask, getAllTagsOfTask, getTagOfTask } from "../controllers/task_tag_controller.js";
import authenticate from "../middlewares/auth_middleware.js";
import { isTeamMember } from "../middlewares/isTeamMember_middleware.js";
import { isTeamAdmin } from "../middlewares/admin_middleware.js";
const router = express.Router();

router.post("/tasks/:taskId/tags/:tagId", authenticate, isTeamAdmin, addTagToTask);
router.delete("/tasks/:taskId/tags/:tagId", authenticate, isTeamAdmin, removeTagFromTask);
router.get("/tasks/:taskId/tags", authenticate, isTeamMember, getAllTagsOfTask);
router.get("/tasks/:taskId/tags/:tagId", authenticate, isTeamMember, getTagOfTask);

export default router;  