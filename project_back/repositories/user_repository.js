import User from "../models/user.js";

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
}

export default new UserRepository();