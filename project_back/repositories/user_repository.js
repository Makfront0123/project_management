import User from "../models/user.js";
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

    async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    }

    async getUserTeamStatus(id) {
        return await TeamMember.find({ userId: id,status:"accepted" }).populate("teamId");
    }
}

export default new UserRepository();