import teamRepo from "../repositories/team_repository.js";
 
class TeamService {
    async getAllTeams() {
        return await teamRepo.getAllTeams();
    }

    async getTeamById(id) {
        return await teamRepo.getTeamById(id);
    }

    async updateTeam(id, data) {
        const team = await teamRepo.getTeamById(id);
        if (!team) throw new Error("Team not found");

        return await teamRepo.updateTeam(id, data);
    }

    async deleteTeam(id) {
        const team = await teamRepo.getTeamById(id);
        if (!team) throw new Error("Team not found");
        const deletedTeam = await teamRepo.deleteTeam(id);
        if (!deletedTeam) throw new Error("Team not found");
        await teamMemberRepo.deleteMembersByTeamId(id);
        return deletedTeam;
    }

    async createTeam(data) {
        return await teamRepo.createTeam(data);
    }
    async getConfirmationCode(teamId ) {
        return await teamRepo.getConfirmationCode(teamId );
    }
}

export default new TeamService();