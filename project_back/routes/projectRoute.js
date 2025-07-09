import express from "express";
import authenticate from "../middlewares/auth_middleware.js";
import { createProject, getAllProjects, getProject, updateProject, deleteProject } from "../controllers/project_controller.js";
import { isTeamAdmin } from "../middlewares/admin_middleware.js";
import { isTeamMember } from "../middlewares/isTeamMember_middleware.js";

const router = express.Router();


router.post("/teams/:teamId/projects", authenticate, isTeamAdmin, createProject);
router.get("/teams/:teamId/projects", authenticate, isTeamMember, getAllProjects);
router.get("/teams/:teamId/projects/:projectId", authenticate, isTeamMember, getProject);
router.put("/teams/:teamId/projects/:projectId", authenticate, isTeamAdmin, updateProject);
router.delete("/teams/:teamId/projects/:projectId", authenticate, isTeamAdmin, deleteProject);

export default router;
