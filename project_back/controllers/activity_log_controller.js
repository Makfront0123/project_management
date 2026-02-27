import Activity from "../models/ActivityLog.js";
export const getTaskActivities = async (req, res) => {
    const { taskId } = req.params;

    const activities = await Activity.find({ taskId })
        .populate("user", "name")
        .sort({ createdAt: -1 });

    res.json({ activities });
};