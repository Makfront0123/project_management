import express from "express";

import { assignUserToTask, removeUserFromTask, getAllUsersAssignedToTask, getUserAssignedToTask, getTasksAssignedToUser } from "../controllers/task_assignment_controller.js";
import authenticate from "../middlewares/auth_middleware.js";
import { isTeamAdmin } from "../middlewares/admin_middleware.js";
import { isTeamMember } from "../middlewares/isTeamMember_middleware.js";
const router = express.Router();

router.post("/tasks/:taskId/assignments", authenticate, isTeamAdmin, assignUserToTask);
router.delete("/tasks/:taskId/assignments/:userId", authenticate, isTeamAdmin, removeUserFromTask);
router.get("/tasks/:taskId/assignments", authenticate,isTeamMember, getAllUsersAssignedToTask);
router.get("/tasks/:taskId/assignments/:userId",authenticate,isTeamMember, getUserAssignedToTask);
router.get("/user/tasks/:taskId/assignments",authenticate, getTasksAssignedToUser);   

export default router;