import express from "express";
import { getProfile, updateUser, deleteUser, getUserTeamStatus } from "../controllers/user_controller.js";
import authenticate from "../middlewares/auth_middleware.js";
const router = express.Router();

router.get("/users", authenticate, getProfile);
router.put("/users", authenticate, updateUser);
router.delete("/users", authenticate, deleteUser);
router.get("/users/teamStatus", authenticate, getUserTeamStatus);

export default router;