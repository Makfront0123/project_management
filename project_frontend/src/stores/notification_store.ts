// useNotificationStore.ts
import { create } from "zustand";
import {  getNotificationsForUser, markNotificationAsRead } from "../services/notification_services";
import type { NotificationType } from "../types/notification";

interface NotificationStore {
    notifications: NotificationType[];
    isLoading: boolean;
    fetchNotifications: (userId: string) => Promise<void>;
    addNotification: (notif: NotificationType) => void;
    getUnreadCount: () => number;
    markNotificationAsRead: (id: string) => Promise<void>;
}

const useNotificationStore = create<NotificationStore>((set, get) => ({
    notifications: [],
    isLoading: false,
    fetchNotifications: async () => {
        set({ isLoading: true });
        try {
            const notificationsData = await getNotificationsForUser();

            set({ notifications: notificationsData, isLoading: false });
        } catch (error) {
            console.error("Error fetching notifications:", error);
            set({ isLoading: false });
        }
    },
    addNotification: (notif) => set((state) => {
        if (state.notifications.some(n => n._id === notif._id)) return state;
        return { notifications: [notif, ...state.notifications] };
    })
    ,

    getUnreadCount: () => {
        const { notifications } = get();
        return notifications.filter((notif) => notif.read === false).length;
    },
    markNotificationAsRead: async (id: string) => {
        set({ isLoading: true });
        await markNotificationAsRead(id);
        const updatedNotifications = await getNotificationsForUser();
        set({ notifications: updatedNotifications, isLoading: false });
    },
}));

export default useNotificationStore;