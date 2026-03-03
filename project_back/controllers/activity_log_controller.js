import Activity from "../models/ActivityLog.js";
export const getTaskActivities = async (req, res) => {
    const { taskId } = req.params;

    const activities = await Activity.find({ taskId })
        .populate("user", "name")
        .populate("taskId", "name")
        .populate("projectId", "name")
        .populate("teamId", "name")
        .sort({ createdAt: -1 });

    res.json({ activities });
};

export const getTeamActivities = async (req, res) => {
    const { teamId } = req.params;

    const activities = await Activity.find({ teamId })
        .populate("user", "name")
        .populate("taskId", "name")
        .populate("projectId", "name")
        .populate("teamId", "name")
        .sort({ createdAt: -1 })
        .limit(20);

    res.json({ activities });
};
export const getUserActivities = async (req, res) => {
    const { userId } = req.params;

    const activities = await Activity.find({ user: userId })
        .populate("user", "name")
        .sort({ createdAt: -1 });

    res.json({ activities });
};