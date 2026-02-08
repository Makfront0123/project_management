import express from "express";
import authenticate from "../middlewares/auth_middleware.js";
import { createProject,getProject, updateProject, deleteProject, getProjectsByTeam, getProjectAnalytics } from "../controllers/project_controller.js";
import { isTeamAdmin } from "../middlewares/admin_middleware.js";
import { isTeamMember } from "../middlewares/isTeamMember_middleware.js";

const router = express.Router();


router.post("/teams/:teamId/projects", authenticate, isTeamAdmin, createProject);
router.get("/teams/:teamId/projects", authenticate, isTeamMember, getProjectsByTeam);
router.get("/teams/:teamId/projects/:projectId", authenticate, isTeamMember, getProject);
router.put("/teams/:teamId/projects/:projectId", authenticate, isTeamAdmin, updateProject);
router.delete("/teams/:teamId/projects/:projectId", authenticate, isTeamAdmin, deleteProject);
router.get(
    "/teams/:teamId/projects/:projectId/analytics",
    getProjectAnalytics
);
export default router;
