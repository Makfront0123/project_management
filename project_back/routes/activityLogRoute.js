import express from "express";
import { getTaskActivities, getTeamActivities,getUserActivities } from "../controllers/activity_log_controller.js";
import authenticate from "../middlewares/auth_middleware.js";
import { isTeamMember } from "../middlewares/isTeamMember_middleware.js";

const router = express.Router();

router.get("/activities/team/:teamId", authenticate, isTeamMember, getTeamActivities);
router.get("/activities/task/:taskId", authenticate, isTeamMember, getTaskActivities);
router.get("/activities/user/:userId", authenticate, isTeamMember, getUserActivities);
export default router;