import { getTeamIdFromRequest } from "../utils/getTeamIdFromRequest.js";
import teamMemberRepo from "../repositories/team_member_repository.js";

export const isTeamMember = async (req, res, next) => {
    const teamId = await getTeamIdFromRequest(req);
    const userId = req.user?.id;

    if (!teamId || !userId) {
        return res.status(400).json({ message: "Missing teamId or userId" });
    }

    const teamMember = await teamMemberRepo.getMemberOfTeam(teamId, userId);

    if (!teamMember || teamMember.status !== "accepted") {
        return res.status(403).json({ message: "Access denied: not a team member" });
    }

    next();
};
