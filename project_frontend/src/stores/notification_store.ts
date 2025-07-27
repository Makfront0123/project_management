// useNotificationStore.ts

import { create } from "zustand";
import { createNotification, getNotificationsForUser } from "../services/notification_services";
import type { NotificationType } from "../types/notification";

interface NotificationStore {
    notifications: NotificationType[];
    isLoading: boolean;
    fetchNotifications: (userId: string) => Promise<void>;
    addNotification: (notification: NotificationType) => Promise<void>;
    getUnreadCount: () => number;
}

const useNotificationStore = create<NotificationStore>((set, get) => ({
    notifications: [],
    isLoading: false,
    fetchNotifications: async (userId: string) => {
        set({ isLoading: true });
        const response = await getNotificationsForUser(userId);
      
        set({ notifications: response.data, isLoading: false });
    },
    addNotification: async (notification: NotificationType) => {
        set({ isLoading: true });
        const response = await createNotification(notification.message, notification.recipient._id);
        set({ notifications: [...get().notifications, response.data], isLoading: false });
    },

    getUnreadCount: () => {
        const { notifications } = get();
        return notifications.filter((notif) => notif.read === false).length;
    },
}));

export default useNotificationStore;