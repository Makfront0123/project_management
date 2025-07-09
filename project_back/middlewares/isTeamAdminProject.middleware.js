import projectRepo from "../repositories/project_repository.js";
import teamRepo from "../repositories/team_repository.js";

export const isTeamAdminFromProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    if (!projectId) {
      return res.status(400).json({ message: "Missing projectId" });
    }

    const project = await projectRepo.getProjectByIdOnly(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const team = await teamRepo.getTeamById(project.teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    if (!team.creator || team.creator._id.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden: not team admin" });
    }

    req.teamId = project.teamId;
    next();
  } catch (error) {
    console.error("Middleware error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
