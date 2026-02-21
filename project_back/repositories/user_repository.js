import User from "../models/User.js";
import TeamMember from "../models/TeamMember.js";
class UserRepository {
    async getProfile(id) {
        return await User.findById(id);
    }
    async getUserById(id) {
        return await User.findById(id);
    }

    async updateUser(id, data) {
        return await User.findByIdAndUpdate(id, { $set: data }, { new: true });
    }

    async getUserByEmail(email) {
        return await User.findOne({ email });
    }

    async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    }
    async getUserTeamStatus(userId) {
        return await TeamMember
            .find({ userId, status: "accepted" })
            .populate("teamId");
    }

    async countTeamMembers(teamId) {
        return await TeamMember.countDocuments({
            teamId,
            status: "accepted"
        });
    }
}

export default new UserRepository();