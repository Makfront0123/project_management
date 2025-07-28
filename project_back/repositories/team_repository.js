import Team from "../models/Team.js";

class TeamRepository {
    async getAllTeams(page = 1, limit = 4) {
        const skip = (page - 1) * limit;
        const teams = await Team.find()
            .skip(skip)
            .limit(limit)
            .populate("creator", "name email");

        const totalTeams = await Team.countDocuments();

        const totalPages = Math.ceil(totalTeams / limit);

        return {
            teams,
            totalPages,
            totalTeams,
        };

    }
    async getTeamById(id) {
        return await Team.findById(id).populate("creator", "name email");
    }

    async updateTeam(id, data) {
        return await Team.findByIdAndUpdate(id, data, { new: true }).populate("creator", "name email");
    }

    async deleteTeam(id) {
        return await Team.findByIdAndDelete(id);
    }

    async createTeam(data) {
        const team = await Team.create(data);

        return await Team.findById(team._id).populate("creator", "name email");
    }

    async getConfirmationCode(teamId) {
        return await Team.findById(teamId).select('code');
    }

}

const teamRepository = new TeamRepository();
export default teamRepository;
