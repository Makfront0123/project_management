
import express from "express";
import { createTeam, getAllTeams, getTeam, updateTeam, deleteTeam, getTeamDashboard, leaveTeam } from "../controllers/team_controller.js";
import { isTeamMember } from "../middlewares/isTeamMember_middleware.js";
import { upload } from "../middlewares/upload_middleware.js";
import { isTeamAdmin } from "../middlewares/admin_middleware.js";
import authenticate from "../middlewares/auth_middleware.js";


const router = express.Router();
router.post("/teams", authenticate, upload.single("image"), createTeam);
router.get("/teams", authenticate, getAllTeams);
router.get("/teams/:id", authenticate, getTeam);
router.get("/teams/:teamId/dashboard", authenticate, getTeamDashboard);
router.put("/teams/:teamId", authenticate, isTeamAdmin, upload.single("image"), updateTeam);
router.delete("/teams/:teamId", authenticate, isTeamAdmin, deleteTeam);
router.delete("/teams/:teamId/leave", authenticate, isTeamMember, leaveTeam);
export default router;