import projectRepo from "../repositories/project_repository.js";
import teamMemberRepo from "../repositories/team_member_repository.js";

export const isTeamMemberFromProject = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const userId = req.user.id;

        if (!projectId) {
            return res.status(400).json({ message: "Missing projectId" });
        }

        const project = await projectRepo.findProjectById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const teamId = project.teamId;
        const member = await teamMemberRepo.getMemberOfTeam(teamId, userId);

        if (!member) {
            return res.status(403).json({ message: "You are not a member of this team" });
        }


        req.teamId = teamId;
        next();
    } catch (error) {
        console.error("isTeamMemberFromProject error:", error);
        res.status(500).json({ message: error.message });
    }
};
