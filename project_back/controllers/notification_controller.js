import { NotificationRepository } from "../repositories/notification_repository.js";
import TeamMember from "../models/TeamMember.js";
export const createNotification = async (req, res) => {
    const { message } = req.body;
    const teamId = req.teamMember.teamId;

    try {
        if (!message) return res.status(400).json({ message: "Missing parameters" });
        const notification = await NotificationRepository.create({
            message,
            recipient: req.teamMember._id,
            team: teamId
        });

        const admins = await TeamMember.find({ teamId, role: "admin", status: "accepted" });
        await Promise.all(
            admins.filter(a => !a._id.equals(req.teamMember._id)).map(admin =>
                NotificationRepository.create({ message, recipient: admin._id, team: teamId })
            )
        );

        res.status(201).json({ message: "Notifications sent", notification });
    } catch (err) {
        res.status(500).json({ error: "Error to create notification" });
    }
};
export const getNotificationsForUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const notifications = await NotificationRepository.getAllByUser(userId);

        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const markNotificationAsRead = async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await NotificationRepository.markAsRead(id);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Error to mark notification as read" });
    }
};

export const deleteNotificationsByTeamId = async (req, res) => {
    const { teamId } = req.params;
    try {
        await NotificationRepository.deleteByTeamId(teamId);
        res.status(200).json({ message: "Notifications deleted" });
    } catch (err) {
        res.status(500).json({ error: "Error to delete notifications" });
    }
};