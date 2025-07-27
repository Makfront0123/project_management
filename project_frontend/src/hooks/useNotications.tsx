 

import { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

import type { NotificationType } from "../types/notification";
import { useAuthStore } from "../stores/auth_store";
import useNotificationStore from "../stores/notification_store";

 
export const useNotifications = (teamId: string | undefined) => {
    const { user } = useAuthStore();

    const { addNotification, fetchNotifications } = useNotificationStore();

    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
   
        if (user && teamId && !socketRef.current) {
            console.log("Condiciones cumplidas. Conectando al socket y cargando notificaciones.");



           
            const socket = io("http://localhost:3000", {
                withCredentials: true,
            });
            socketRef.current = socket;

            socket.emit("joinUserRoom", user.id);
            fetchNotifications(user.id);

            socket.on("newNotification", (notification: NotificationType) => {
                console.log("📩 Notificación general recibida:", notification);
                addNotification(notification);
            });

            socket.on("taskCompletedNotification", (notification: NotificationType) => {
                console.log("✅ Notificación de tarea completada:", notification);
                addNotification(notification);
            });
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.off("newNotification");
                socketRef.current.off("taskCompletedNotification");
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [user, teamId, fetchNotifications, addNotification]);


    return socketRef.current;
};