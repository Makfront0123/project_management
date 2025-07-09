import express from "express";
import { createComment, getAllCommentsByTask, getComment, deleteComment } from "../controllers/comment_controller.js";
import { isTeamMember } from "../middlewares/isTeamMember_middleware.js";
import authenticate from "../middlewares/auth_middleware.js";
const router = express.Router();

router.post("/task/:taskId/comment", authenticate, isTeamMember, createComment);
router.get("/task/:taskId/comment", authenticate, isTeamMember, getAllCommentsByTask);
router.get("/task/:taskId/comment/:commentId", authenticate, isTeamMember, getComment);
router.delete("/task/:taskId/comment/:commentId", authenticate, isTeamMember, deleteComment);

export default router;  