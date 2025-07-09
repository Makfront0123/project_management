import Team from "../models/Team.js";

class TeamRepository {

    async getAllTeams() {
        return await Team.find().populate("creator", "name email");
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
        return await Team.findOne(
            { _id: teamId },
        );
    }
}

const teamRepository = new TeamRepository();
export default teamRepository;
