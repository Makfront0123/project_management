import express from "express";
import { getTaskActivities } from "../controllers/activity_log_controller.js";

const router = express.Router();

router.get("/activities/task/:taskId", getTaskActivities);
export default router;