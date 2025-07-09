import express from "express";
import { getProfile, updateUser, deleteUser } from "../controllers/user_controller.js";
import authenticate from "../middlewares/auth_middleware.js";
const router = express.Router();

router.get("/users", authenticate, getProfile);
router.put("/users", authenticate, updateUser);
router.delete("/users", authenticate, deleteUser);

export default router;