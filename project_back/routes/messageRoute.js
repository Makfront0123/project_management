import express from "express";
import {
  getPrivateMessages,
  getGlobalMessages,
  deletePrivateMessages,
  deleteGlobalMessages,
  deleteAllMessages,
  uploadMessageAttachment
} from "../controllers/message_controller.js";
import authenticate from "../middlewares/auth_middleware.js";
import { isTeamMember } from "../middlewares/isTeamMember_middleware.js";
import { isTeamAdmin } from "../middlewares/admin_middleware.js";
import { upload } from "../middlewares/upload_middleware.js";
const router = express.Router();

router.get("/private-messages/:teamId/:fromId/:toId", getPrivateMessages);
router.post("/teams/:teamId/messages/attachments", upload.single("file"), authenticate, isTeamMember, uploadMessageAttachment);
router.get("/global-messages/:teamId", getGlobalMessages);
router.delete("/global-messages/:teamId", authenticate, isTeamAdmin, deleteGlobalMessages);
router.delete("/private-messages/:teamId/:fromId/:toId", authenticate, isTeamMember, deletePrivateMessages);
router.delete("/all-messages/:teamId", authenticate, isTeamMember, deleteAllMessages);

export default router;
