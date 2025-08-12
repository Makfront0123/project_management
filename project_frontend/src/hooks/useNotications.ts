import { useEffect,  } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../stores/auth_store';
import useNotificationStore from '../stores/notification_store';
 

let socketInstance: Socket | null = null;

export const useNotifications = () => {
    const { user } = useAuthStore();
    const { addNotification, fetchNotifications } = useNotificationStore();

    useEffect(() => {
        if (user && !socketInstance) {
            socketInstance = io(import.meta.env.VITE_API_SOCKET_URL, {
                query: { userId: user.id },
                withCredentials: true,
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
                transports: ['polling'],
            });

            socketInstance.emit("joinUserRoom", user.id);
            fetchNotifications(user.id);

            socketInstance.on("newNotification", (notification) => {
                addNotification(notification);
            });

            socketInstance.on("taskCompletedNotification", (notification) => {
                addNotification(notification);
            });
        }

        return () => {
            // No desconectamos en desmontaje para mantener una sola conexión viva
        };
    }, [user, fetchNotifications, addNotification]);

    return socketInstance;
};
