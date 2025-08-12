import projectService from "../services/project_service.js";
import notificationService from "../services/notification_service.js";
import teamMemberService from "../services/team_member_service.js";
export const createProject = async (req, res) => {
    try {
        const owner_id = req.user.id;
        const { name, description } = req.body;
        const { teamId } = req.params;

        if (!name || !teamId) {
            return res.status(400).json({ message: "Missing required fields: name or teamId" });
        }

        const data = {
            name,
            description,
            teamId,
            ownerId: owner_id,
        };

        const project = await projectService.createProject(data);
 
        const members = await teamMemberService.getAllMembersOfTeam(teamId);
        const recipients = members
            .filter(m => m.userId.toString() !== owner_id)
            .map(m => m.userId);

        
        const notifications = await Promise.all(
            recipients.map(recipientId =>
                notificationService.createNotification({
                    recipient: recipientId,
                    message: `${req.user.name} ha creado el proyecto "${name}" en tu equipo.`,
                    type: "new_project",
                    read: false,
                    metadata: {
                        teamId,
                        projectId: project._id,
                        redirectTo: `/team/${teamId}/projects/${project._id}`
                    }
                })
            )
        );
        notifications.forEach((notif, index) => {
            req.io.to(`user_${recipients[index]}`).emit("newNotification", notif);
        });

        res.status(201).json({
            message: "Project created successfully",
            project,
            notificationsCount: notifications.length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAllProjects = async (req, res) => {
    try {
        const { teamId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const data = await projectService.getAllProjects(teamId, page, limit);

        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getProject = async (req, res) => {
    try {
        const { teamId, projectId } = req.params;

        const project = await projectService.getProjectById(teamId, projectId);
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { teamId, projectId } = req.params;


        const data = {
            name: req.body.name,
            description: req.body.description,
        }
        const updatedProject = await projectService.updateProject(teamId, projectId, data);
        res.status(200).json({
            message: "Project updated successfully",
            updatedProject,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const deleteProject = async (req, res) => {
    try {
        const { teamId, projectId } = req.params;

        const deletedProject = await projectService.deleteProjectCascade(
            teamId,
            projectId
        );

        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({
            message: "Project and related data deleted successfully",
            deletedProject,
        });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ message: error.message });
    }
};
