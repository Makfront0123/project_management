import teamService from "../services/team_service.js";
import teamMemberService from "../services/team_member_service.js";
import generateUniqueCode from "../utils/generateUniqueCode.js";

export const createTeam = async (req, res) => {
    try {
        const userId = req.user.id;

        const { name, description } = req.body;
        const code = await generateUniqueCode();

        const teamData = {
            name,
            description,
            code,
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
        const teamId = req.params?.teamId
        const updatedTeam = await teamService.updateTeam(teamId, req.body);
        res.status(200).json({
            message: "Team updated successfully",
            updatedTeam,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteTeam = async (req, res) => {
    try {
        const teamId = req.params.teamId;
        console.log(teamId);
        const team = await teamService.deleteTeam(teamId);
        res.status(200).json({
            message: "Team deleted successfully",
            team,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}