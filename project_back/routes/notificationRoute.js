import express from "express";
import authenticate  from "../middlewares/auth_middleware.js";
import { createNotification, getNotificationsForUser, markNotificationAsRead, deleteNotificationsByTeamId } from "../controllers/notification_controller.js";
import { isTeamMember } from "../middlewares/isTeamMember_middleware.js";

const router = express.Router();

router.post("/notifications", authenticate,  createNotification);
router.get("/notifications", authenticate,  getNotificationsForUser);
router.patch("/notifications/:id/read", authenticate,  markNotificationAsRead);
router.delete("/notifications/:teamId", authenticate, isTeamMember,  deleteNotificationsByTeamId);


export default router;
