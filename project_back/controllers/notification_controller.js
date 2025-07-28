import { NotificationRepository } from "../repositories/notification_repository.js";

export const createNotification = async (req, res) => {
    const { message, recipient } = req.body;
    try {
        console.log(message, recipient);
        if (!message || !recipient) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        const notification = await NotificationRepository.create({ message, recipient });
        res.status(201).json(notification);
    } catch (err) {
        res.status(500).json({ error: "Error al crear notificación" });
    }
};

export const getNotificationsForUser = async (req, res) => {
    try {
        const userId = req.user.id;  
        const notifications = await NotificationRepository.getAllByUser(userId);
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener notificaciones" });
    }
};

export const markNotificationAsRead = async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await NotificationRepository.markAsRead(id);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Error al marcar como leída" });
    }
};

export const deleteNotificationsByTeamId = async (req, res) => {
    const { teamId } = req.params;
    try {
        await NotificationRepository.deleteByTeamId(teamId);
        res.status(200).json({ message: "Notificaciones eliminadas" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar notificaciones" });
    }
};