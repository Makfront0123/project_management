import TeamMember from "../models/TeamMember.js";

class TeamMemberRepository {
  async addMember(data) {
    return await TeamMember.create(data);
  }

  async deleteMembersByTeamId(teamId) {
    return await TeamMember.deleteMany({ teamId });
  }

  async removeMember(data) {
    return await TeamMember.findOneAndDelete({ teamId: data.teamId, userId: data.userId });
  }


  async getAllMembersOfTeam(teamId) {
    return await TeamMember.find({ teamId }).populate('userId', 'name email');
  }

  async getMemberOfTeam(teamId, userId) {
    return await TeamMember.findOne({ teamId, userId });
  }

  async updateMemberOfTeam(teamId, userId, role) {
    return await TeamMember.findOneAndUpdate({ teamId, userId }, { $set: { role } });
  }
  async updateMemberStatus(teamId, userId, data) {
    return await TeamMember.findOneAndUpdate(
      { teamId, userId },
      { $set: data },
      { new: true }
    );
  }

  async deleteMemberByTeamId(teamId) {
    return await TeamMember.deleteMany({ teamId });
  }
  async getPendingMembersOfTeam(teamId) {
    return await TeamMember.find({ teamId, status: 'pending' }).populate('userId', 'name email');
  }
  async getPendingRequests(userId) {
    return await TeamMember.find({ userId, status: 'pending' });
  }


}

export default new TeamMemberRepository();
