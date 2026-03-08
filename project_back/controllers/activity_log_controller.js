import Activity from "../models/ActivityLog.js";
export const getTaskActivities = async (req, res) => {
    const { taskId } = req.params;

    const activities = await Activity.find({ taskId })
        .populate("user", "name")
        .populate("taskId", "name")
        .populate("projectId", "name")
        .populate("targetUser", "name")
        .populate("teamId", "name")
        .sort({ createdAt: -1 });

    res.json({ activities });
};

export const getTeamActivities = async (req, res) => {
    const { teamId } = req.params;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    const activities = await Activity.find({ teamId })
        .populate("user", "name")
        .populate("taskId", "name")
        .populate("projectId", "name")
        .populate("targetUser", "name")
        .populate("teamId", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Activity.countDocuments({ teamId });

    res.json({
        activities,
        page,
        totalPages: Math.ceil(total / limit),
    });
};
export const getUserActivities = async (req, res) => {
    const { userId } = req.params;

    const activities = await Activity.find({ user: userId })
        .populate("user", "name")
        .populate("targetUser", "name")
        .sort({ createdAt: -1 });

    res.json({ activities });
};