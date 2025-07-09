import express from "express";
import { createTag, getAllTags, getTag, deleteTag, updateTag } from "../controllers/tag_controller.js";
import { isTeamAdmin } from "../middlewares/admin_middleware.js";
import { isTeamMember } from "../middlewares/isTeamMember_middleware.js";
import authenticate from "../middlewares/auth_middleware.js";
const router = express.Router();

router.post("/teams/:teamId/tags", authenticate, isTeamAdmin, createTag);
router.get("/teams/:teamId/tags", authenticate, isTeamMember, getAllTags);
router.get("/teams/:teamId/tags/:tagId", authenticate, isTeamMember, getTag);
router.delete("/teams/:teamId/tags/:tagId", authenticate, isTeamAdmin, deleteTag);
router.put("/teams/:teamId/tags/:tagId", authenticate, isTeamAdmin, updateTag);

export default router;