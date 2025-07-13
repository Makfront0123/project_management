import teamMemberService from "../services/team_member_service.js";
import teamService from "../services/team_service.js";
import TeamMember from "../models/TeamMember.js";
export const addMemberToTeam = async (req, res) => {
    try {
        const { teamId } = req.params;
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "userId es requerido" });
        }

        const existing = await teamMemberService.getMemberOfTeam(teamId, userId);

        if (existing) {
            if (existing.status === "accepted") {
                return res.status(400).json({ message: "El usuario ya es miembro del equipo." });
            } else {
                const updated = await teamMemberService.updateMemberStatus(teamId, userId, { status: "accepted" });
                return res.status(200).json({ message: "Solicitud aprobada", member: updated });
            }
        }

        const teamMember = await teamMemberService.addMember({
            teamId,
            userId,
            role: "member",
            status: "accepted",
        });

        res.status(201).json({ message: "Miembro agregado", teamMember });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const requestToJoinTeam = async (req, res) => {
    try {
        const userId = req.user.id;
        const { teamId } = req.params;

        const existingMember = await teamMemberService.getMemberOfTeam(teamId, userId);

        if (existingMember) {
            if (existingMember.status === "accepted") {
                return res.status(400).json({ message: "Ya eres miembro de este equipo." });
            }

            if (existingMember.status === "pending") {
                return res.status(400).json({ message: "Ya has solicitado unirte a este equipo." });
            }


            return res.status(400).json({ message: "No puedes volver a enviar la solicitud." });
        }

        const teamMember = await teamMemberService.addMember({
            teamId,
            userId,
            role: "member",
            status: "pending",
        });

        res.status(201).json({ message: "Solicitud enviada", teamMember });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const rejectRequestToJoinTeam = async (req, res) => {
    try {
        const { teamId, userId } = req.params;

        const existingMember = await teamMemberService.getMemberOfTeam(teamId, userId);
        if (!existingMember) {
            return res.status(404).json({ message: "La solicitud no existe." });
        }

        if (existingMember.status !== "pending") {
            return res.status(400).json({ message: "Solo se pueden rechazar solicitudes pendientes." });
        }

        await teamMemberService.removeMember({ teamId, userId });

        res.status(200).json({
            message: "Solicitud rechazada y eliminada correctamente",
        });
    } catch (error) {
        res.status(500).json({ message: "Error del servidor" });
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
            return res.status(404).json({ message: "Miembro no encontrado" });
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
        res.status(200).json({ message: "Miembros eliminados del equipo" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteMemberOfTeam = async (req, res) => {
    try {
        const { teamId, userId } = req.params;
        const requesterId = req.user.id;

        if (!userId || !teamId) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        const member = await teamMemberService.getMemberOfTeam(teamId, userId);
        if (!member) {
            return res.status(404).json({ message: "El usuario no pertenece al equipo" });
        }


        if (member.role === "admin" && userId === requesterId) {
            return res.status(403).json({ message: "No puedes eliminarte a ti mismo si eres administrador" });
        }

        await teamMemberService.removeMember({ teamId, userId });

        res.status(200).json({ message: "Miembro eliminado correctamente" });
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


