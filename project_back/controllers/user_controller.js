import userService from "../services/user_service.js";

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const updateUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        const user = await userService.updateUser(userId, data);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userService.deleteUser(userId);
        res.status(200).json({
            message: "User deleted successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const getUserTeamStatus = async (req, res) => {
    try {
        const userId = req.user.id;
        const teams = await userService.getUserTeamStatus(userId);

        if (!teams || teams.length === 0) {
            return res.status(200).json({
                message: "You are not part of any team",
                teams: []
            });
        }

        res.status(200).json({

            teams: teams.map((teamMember) => ({
                teamId: teamMember.teamId._id,
                name: teamMember.teamId.name,
                role: teamMember.role
            }))
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
