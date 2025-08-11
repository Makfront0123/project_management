import Notification from "../models/Notification.js";

export const NotificationRepository = {
  create: async (data) => {
    return await Notification.create(data);
  },

  getAllByUser: async (userId) => {
    return await Notification.find({ recipient: userId }).sort({ createdAt: -1 });
  },

  markAsRead: async (id) => {
    return await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
  },
  deleteByTeamId: async (teamId) => {
    return await Notification.deleteMany({ team: teamId });
  },

 
  deleteByProjectId: async (projectId) => {
    return await Notification.deleteMany({ project: projectId });
  },

};

export default NotificationRepository;
