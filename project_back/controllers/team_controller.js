import teamService from "../services/team_service.js";
import teamMemberService from "../services/team_member_service.js";
import generateUniqueCode from "../utils/generateUniqueCode.js";
import projectService from "../services/project_service.js";
import taskService from "../services/task_service.js";
import taskAssignmentService from "../services/task_assignment_service.js";
import messageService from "../services/message_service.js";

export const createTeam = async (req, res) => {
    try {
        const userId = req.user.id;

        const { name, description, image } = req.body;
        const code = await generateUniqueCode();

        const teamData = {
            name,
            description,
            code,
            image,
            creator: userId,
        };

        const team = await teamService.createTeam(teamData);

        await teamMemberService.addMember({
            teamId: team._id,
            userId,
            role: "admin",
            status: "accepted",
        });

        res.status(201).json({
            message: "Team created successfully",
            team,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const leaveTeam = async (req, res) => {
    try {
        const { teamId } = req.params;
        const userId = req.user.id;

        const member = await teamMemberService.getMemberOfTeam(teamId, userId);
        if (!member) {
            return res.status(404).json({ message: "You are not part of this team" });
        }

        if (member.role === "admin") {
            const admins = await teamMemberService.getAdminsOfTeam(teamId);

            if (admins.length === 1) {
                return res.status(400).json({
                    message: "You are the only admin. Transfer ownership before leaving."
                });
            }
        }

        await teamMemberService.removeMember({ teamId, userId });

        const admins = await teamMemberService.getAdminsOfTeam(teamId);
        const leavingMemberName = req.user.name;

        const notifications = await Promise.all(
            admins
                .filter(admin => admin.userId.toString() !== userId)
                .map(admin =>
                    notificationService.createNotification({
                        recipient: admin._id,
                        message: `${leavingMemberName} has left the team`,
                        type: "member_left_team",
                        read: false,
                        metadata: { teamId, userId }
                    })
                )
        );

        req.io.to(`user_${admin}`).emit("newNotification", notifications);

        res.status(200).json({ message: "You left the team successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getTeamDashboard = async (req, res) => {
    try {
        const teamId = req.params.teamId;
        const team = await teamService.getTeamDashboard(teamId);
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllTeams = async (req, res) => {
    const teams = await teamService.getAllTeams(req.query.page, req.query.limit);
    res.status(200).json(teams);
};
export const getTeam = async (req, res) => {
    const team = await teamService.getTeamById(req.params.id);
    res.status(200).json(team);
};

export const updateTeam = async (req, res) => {
    try {
        const teamId = req.params.teamId

        const data = {
            ...req.body
        }

        if (req.file) {
            data.image = req.file.path
        }

        if (req.body.removeImage === "true") {
            data.image = null
        }

        const updatedTeam = await teamService.updateTeam(teamId, data)

        res.json({
            message: "Team updated successfully",
            team: updatedTeam
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteTeam = async (req, res) => {
    try {
        const { teamId } = req.params;

        await teamMemberService.deleteMembersByTeamId(teamId);

        await taskAssignmentService.deleteAllAssignmentsByTeamId(teamId);
        const projects = await projectService.getProjectsByTeamId(teamId);
        for (const project of projects) {
            await taskService.deleteTasksByProjectId(project._id);
        }

        await projectService.deleteAllProjects(teamId);

        await notificationService.deleteAllByTeamId(teamId);

        await Activity.deleteMany({ teamId: new mongoose.Types.ObjectId(teamId) });

        await messageService.deleteAllMessages(teamId);

        const team = await teamService.deleteTeam(teamId);

        res.status(200).json({
            message: "Team and all related data deleted successfully",
            team,
        });

    } catch (error) {
        console.error("DELETE TEAM ERROR:", error.stack);
        res.status(500).json({ message: error.message });
    }
};