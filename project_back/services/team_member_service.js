
import teamMemberRepo from "../repositories/team_member_repository.js";

class TeamMemberService {
  async addMember({ teamId, userId, role, status }) {

    return await teamMemberRepo.addMember({ teamId, userId, role, status });
  }
  async removeMember({ teamId, userId, role }) {
    return await teamMemberRepo.removeMember({ teamId, userId, role });
  }
  async getAllMembersOfTeam(teamId) {
    return await teamMemberRepo.getAllMembersOfTeam(teamId);
  }
  async getMemberOfTeam(teamId, userId) {
    return await teamMemberRepo.getMemberOfTeam(teamId, userId);
  }

  async updateMemberOfTeam(teamId, userId, role) {
    return await teamMemberRepo.updateMemberOfTeam(teamId, userId, role);
  }

  async deleteMembersByTeamId(teamId) {
    return await teamMemberRepo.deleteMembersByTeamId(teamId);
  }

  async updateMemberStatus(teamId, userId, data) {
    return await teamMemberRepo.updateMemberStatus(teamId, userId, data);
  }

  async getPendingMembersOfTeam(teamId) {
    return await teamMemberRepo.getPendingMembersOfTeam(teamId);
  }

  
}

export default new TeamMemberService();
