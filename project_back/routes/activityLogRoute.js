import express from "express";
import { logAction, getLogsByUser, getLogsByTask } from "../controllers/activity_log_controller.js";

const router = express.Router();

router.post("/logAction", logAction);
router.get("/getLogsByUser", getLogsByUser);
router.get("/getLogsByTask", getLogsByTask);

export default router;