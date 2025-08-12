import teamMemberService from "../services/team_member_service.js";
import teamService from "../services/team_service.js";
import notificationService from "../services/notification_service.js";
export const addMemberToTeam = async (req, res) => {
    try {
        const { teamId } = req.params;
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        const existing = await teamMemberService.getMemberOfTeam(teamId, userId);

        if (existing) {
            if (existing.status === "accepted") {
                return res.status(400).json({ message: "User is already a member of the team." });
            } else {
                const updated = await teamMemberService.updateMemberStatus(teamId, userId, { status: "accepted" });
                return res.status(200).json({ message: "Member Added", member: updated });
            }
        }

        const teamMember = await teamMemberService.addMember({
            teamId,
            userId,
            role: "member",
            status: "accepted",
        });

        res.status(201).json({ message: "Member Added", member: teamMember });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const acceptRequestToJoinTeam = async (req, res) => {
    try {
        const { teamId, userId } = req.params;

        const existingMember = await teamMemberService.getMemberOfTeam(teamId, userId);

        if (!existingMember) {
            return res.status(404).json({ message: "Request not found." });
        }

        if (existingMember.status === "accepted") {
            return res.status(400).json({ message: "User is already a member of this team." });
        }

        if (existingMember.status !== "pending") {
            return res.status(400).json({ message: "Only pending requests can be accepted." });
        }

        
        const updated = await teamMemberService.updateMemberStatus(teamId, userId, { status: "accepted" });

        const notificationMessage = `${req.user.name} accepted your request to join the team`;

        const notification = await notificationService.createNotification({
            recipient: userId,
            message: notificationMessage,
            type: "join_request_accepted",
            read: false,
            metadata: {
                teamId,
                redirectTo: `/team/${teamId}`
            }
        });

        req.io.to(`user_${userId}`).emit("newNotification", notification);

        res.status(200).json({
            message: "Request accepted successfully",
            member: updated,
            notification
        });

    } catch (error) {
        res.status(500).json({ message: "Error on server" });
    }
};


export const requestToJoinTeam = async (req, res) => {
    try {
        const userId = req.user.id;
        const { teamId } = req.params;

        const existingMember = await teamMemberService.getMemberOfTeam(teamId, userId);

        if (existingMember) {
            if (existingMember.status === "accepted") {
                return res.status(400).json({ message: "You are already a member of this team." });
            }

            if (existingMember.status === "pending") {
                return res.status(400).json({ message: "You have already requested to join this team." });
            }

            return res.status(400).json({ message: "You cannot resend the request." });
        }

        const teamMember = await teamMemberService.addMember({
            teamId,
            userId,
            role: "member",
            status: "pending",
        });

        const admins = await teamMemberService.getAdminsOfTeam(teamId);
        const notificationMessage = `${req.user.name} has requested to join your team`;


        const createdNotifications = [];

        for (const admin of admins) {
            const notification = await notificationService.createNotification({
                recipient: admin.userId,
                message: notificationMessage,
                type: "join_request",
                read: false,
                metadata: {
                    teamId,
                    redirectTo: `/team/${teamId}/requests`
                }
            });

            createdNotifications.push(notification);

            req.io.to(`user_${admin.userId}`).emit("newNotification", notification);
        }

        res.status(201).json({
            message: "Request sent",
            member: teamMember,
            notifications: createdNotifications
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const rejectRequestToJoinTeam = async (req, res) => {
    try {
        const { teamId, userId } = req.params;

        const existingMember = await teamMemberService.getMemberOfTeam(teamId, userId);
        if (!existingMember) {
            return res.status(404).json({ message: "Request not found." });
        }

        if (existingMember.status !== "pending") {
            return res.status(400).json({ message: "Only pending requests can be rejected." });
        }
        const notificationMessage = `${req.user.name} rejected your request to join the team`;

        const notification = await notificationService.createNotification({
            recipient: userId,
            message: notificationMessage,
            type: "join_request",
            read: false,
        });
        req.io.to(`user_${userId}`).emit("newNotification", notification);

        await teamMemberService.removeMember({ teamId, userId });


        res.status(200).json({
            message: "Request rejected and deleted successfully",
            notification
        });
    } catch (error) {
        res.status(500).json({ message: "Error on server" });
    }
};

export const getAllMembersOfTeam = async (req, res) => {
    try {
        const { teamId } = req.params;
        const members = await teamMemberService.getAllMembersOfTeam(teamId);
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMemberOfTeam = async (req, res) => {
    try {
        const { teamId, userId } = req.params;
        const teamMember = await teamMemberService.getMemberOfTeam(teamId, userId);

        if (!teamMember) {
            return res.status(404).json({ message: "Member not found" });
        }

        res.status(200).json(teamMember);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteMembersOfTeam = async (req, res) => {
    try {
        const { teamId } = req.params;
        await teamMemberService.deleteMembersByTeamId(teamId);
        res.status(200).json({ message: "Members deleted from the team" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteMemberOfTeam = async (req, res) => {
    try {
        const { teamId, userId } = req.params;
        const requesterId = req.user.id;

        if (!userId || !teamId) {
            return res.status(400).json({ message: "Missing data" });
        }

        const member = await teamMemberService.getMemberOfTeam(teamId, userId);
        if (!member) {
            return res.status(404).json({ message: "The user does not belong to the team" });
        }


        if (member.role === "admin" && userId === requesterId) {
            return res.status(403).json({ message: "You cannot delete yourself if you are an administrator" });
        }

        await teamMemberService.removeMember({ teamId, userId });

        res.status(200).json({ message: "Member deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTeamCode = async (req, res) => {
    try {
        const { teamId } = req.params;
        const verified = await teamService.getConfirmationCode(teamId);
        if (!verified) return res.status(404).json({ message: "No code found" });

        return res.status(200).json({ code: verified.code });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const confirmJoinWithCode = async (req, res) => {
    try {
        const { teamId } = req.params;
        const { code } = req.body;

        console.log("teamId:", teamId);

        const verified = await teamService.getConfirmationCode(teamId);
        if (!verified) return res.status(404).json({ message: "Verification code not found" });

        if (verified.code !== code) return res.status(400).json({ message: "Invalid code" });

        res.status(201).json({ message: "Verificacion Exitosa" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPendingRequests = async (req, res) => {
    try {
        const userId = req.user.id;
        const requests = await teamMemberService.getPendingRequests(userId);
        res.status(200).json(requests.map(r => r.teamId));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPendingMembersOfTeam = async (req, res) => {
    try {
        const { teamId } = req.params;
        const pendingMembers = await teamMemberService.getPendingMembersOfTeam(teamId);
        res.status(200).json(pendingMembers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


