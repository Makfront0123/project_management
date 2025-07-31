import express from "express";
import {
  getPrivateMessages,
  getGlobalMessages,
  deletePrivateMessages,
  deleteGlobalMessages,
  deleteAllMessages,
} from "../controllers/message_controller.js";
import authenticate from "../middlewares/auth_middleware.js";
import {isTeamMember} from "../middlewares/isTeamMember_middleware.js";
import {isTeamAdmin} from "../middlewares/admin_middleware.js";

const router = express.Router();

router.get("/private-messages/:fromId/:toId", getPrivateMessages);
router.get("/global-messages/:teamId", getGlobalMessages);
router.delete("/global-messages/:teamId", authenticate, isTeamAdmin, deleteGlobalMessages);
router.delete("/private-messages/:fromId/:toId", authenticate, isTeamMember, deletePrivateMessages);
router.delete("/all-messages/:teamId", authenticate, isTeamMember, deleteAllMessages);

export default router;
