import userRepo from "../repositories/user_repository.js";
class UserService {
    async getProfile(id) {
        return await userRepo.getProfile(id);
    }

    async getUserById(id) {
        return await userRepo.getUserById(id);
    }

    async updateUser(id, data) {
        return await userRepo.updateUser(id, data);
    }

    async deleteUser(id) {
        return await userRepo.deleteUser(id);
    }
}

export default new UserService();