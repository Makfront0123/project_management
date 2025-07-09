import express from "express";
import authenticate from "../middlewares/auth_middleware.js";
import { isTeamMemberFromProject } from "../middlewares/isTeamMemberProject.middleware.js";
import { createTask, getAllTasksByProject, getTask, updateTask, deleteTask } from "../controllers/task_controller.js";
import { isTeamAdminFromProject } from "../middlewares/isTeamAdminProject.middleware.js";
const router = express.Router();

router.post("/projects/:projectId/tasks", authenticate, isTeamAdminFromProject, createTask);
router.get("/projects/:projectId/tasks", authenticate, isTeamMemberFromProject, getAllTasksByProject);
router.get("/projects/:projectId/tasks/:taskId", authenticate, isTeamMemberFromProject, getTask);
router.put("/projects/:projectId/tasks/:taskId", authenticate, isTeamAdminFromProject, updateTask);
router.delete("/projects/:projectId/tasks/:taskId", authenticate, isTeamAdminFromProject, deleteTask);

export default router;