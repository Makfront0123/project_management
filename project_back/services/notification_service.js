import notificationRepo from "../repositories/notification_repository.js";

class NotificationService {
  async createNotification(data) {
    return await notificationRepo.create(data);
  }
  async getNotifications(userId) {
    return await notificationRepo.getAllByUser(userId); 
  }
  async markNotificationAsRead(notifId) {
    return await notificationRepo.markAsRead(notifId);
  }
}

export default new NotificationService();
