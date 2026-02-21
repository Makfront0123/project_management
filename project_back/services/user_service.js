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

    async getUserTeamStatus(userId) {
        const teamMembers = await userRepo.getUserTeamStatus(userId);

        if (!teamMembers.length) return [];

        const enrichedTeams = await Promise.all(
            teamMembers
                .filter(tm => tm.teamId)
                .map(async (tm) => {
                    const membersCount = await userRepo.countTeamMembers(tm.teamId._id);

                    return {
                        teamId: tm.teamId._id,
                        name: tm.teamId.name,
                        role: tm.role,
                        createdAt: tm.teamId.createdAt,
                        members: membersCount
                    };
                })
        );

        return enrichedTeams;
    }
    async getUserByEmail(email) {
        return await userRepo.getUserByEmail(email);
    }
}

export default new UserService();