import { getTeamIdFromRequest } from "../utils/getTeamIdFromRequest.js";
import teamRepo from "../repositories/team_repository.js";


export const isTeamAdmin = async (req, res, next) => {
    const teamId = await getTeamIdFromRequest(req);

    if (!teamId) return res.status(400).json({ message: "Missing teamId" });

    const team = await teamRepo.getTeamById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    if (team.creator._id.toString() !== req.user.id) {
        return res.status(403).json({ message: "Forbidden: not team admin" });
    }

    next();
};


