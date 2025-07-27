import Notification from "../models/Notification.js";

export const NotificationRepository = {
  create: async ({ message, recipient }) => {
    return await Notification.create({ message, recipient });
  },

  getAllByUser: async (userId) => {
    return await Notification.find({ recipient: userId }).sort({ createdAt: -1 });
  },

  markAsRead: async (id) => {
    return await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
  }
};
