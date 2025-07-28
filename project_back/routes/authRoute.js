import express from "express";
import { register, login, logout } from "../controllers/auth_controller.js";
import upload from "../middlewares/upload_middleware.js";
const router = express.Router();
router.post("/register", upload.single('image'), register);
router.post("/login", login);
router.post("/logout", logout);

export default router;