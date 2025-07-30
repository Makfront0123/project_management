import { NotificationRepository } from "../repositories/notification_repository.js";

export const createNotification = async (req, res) => {
    const { message, recipient } = req.body;
    try {
        if (!message || !recipient) {
            return res.status(400).json({ message: "Missing parameters" });
        }

        const notification = await NotificationRepository.create({ message, recipient });
        res.status(201).json(notification);
    } catch (err) {
        res.status(500).json({ error: "Error to create notification" });
    }
};

export const getNotificationsForUser = async (req, res) => {
    try {
        const userId = req.user.id;  
        const notifications = await NotificationRepository.getAllByUser(userId);
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: "Error to get notifications" });
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