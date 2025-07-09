import express from "express";
import { addMemberToTeam, requestToJoinTeam, rejectRequestToJoinTeam, getAllMembersOfTeam, getMemberOfTeam,confirmJoinWithCode ,deleteMembersOfTeam, deleteMemberOfTeam } from "../controllers/team_member_controller.js";
import {isTeamMember} from "../middlewares/isTeamMember_middleware.js";
import authenticate from "../middlewares/auth_middleware.js";
import { isTeamAdmin } from "../middlewares/admin_middleware.js";

const router = express.Router();


router.post("/teams/:teamId/join-requests", authenticate, requestToJoinTeam);
router.delete("/teams/:teamId/join-requests/:userId", authenticate, isTeamAdmin, rejectRequestToJoinTeam);
router.post("/teams/:teamId/members", authenticate, isTeamAdmin, addMemberToTeam);
router.post("/teams/:teamId/members/confirm", authenticate, isTeamMember, confirmJoinWithCode);
router.get("/teams/:teamId/members", authenticate, getAllMembersOfTeam);
router.get("/teams/:teamId/members/:userId", authenticate, getMemberOfTeam);
router.delete("/teams/:teamId/members/:userId", authenticate, isTeamAdmin, deleteMemberOfTeam);
router.delete("/teams/:teamId/members", authenticate, isTeamAdmin, deleteMembersOfTeam);

export default router;
