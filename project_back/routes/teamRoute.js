import express from "express";
import { createTeam, getAllTeams, getTeam, updateTeam, deleteTeam } from "../controllers/team_controller.js";

import { isTeamAdmin } from "../middlewares/admin_middleware.js";
import authenticate from "../middlewares/auth_middleware.js";


const router = express.Router();
router.post("/teams",authenticate ,createTeam);
router.get("/teams",authenticate, getAllTeams);
router.get("/teams/:id",authenticate ,getTeam);
router.put("/teams/:teamId",authenticate, isTeamAdmin, updateTeam);
router.delete("/teams/:teamId",authenticate, isTeamAdmin, deleteTeam);

export default router;