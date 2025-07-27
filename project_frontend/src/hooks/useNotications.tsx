import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../stores/auth_store';
import useNotificationStore from '../stores/notification_store';
import type { NotificationType } from '../types/notification';


export const useNotifications = () => {
    const { user } = useAuthStore();
    const { addNotification, fetchNotifications } = useNotificationStore();
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        // La conexión solo debe ocurrir si el usuario está autenticado y no hay un socket activo.
        if (user && !socketRef.current) {
            console.log("Condiciones cumplidas. Conectando al socket y cargando notificaciones para el usuario.");

            // Conecta el socket al servidor
            const socket = io("http://localhost:3000", {
                withCredentials: true,
            });
            socketRef.current = socket;

            // Une al usuario a su sala personal para recibir notificaciones
            socket.emit("joinUserRoom", user.id);

            // Carga las notificaciones existentes del usuario
            fetchNotifications(user.id);

            // Escucha los eventos de notificaciones
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
                console.log("Desconectando el socket.");
                socketRef.current.off("newNotification");
                socketRef.current.off("taskCompletedNotification");
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [user, fetchNotifications, addNotification]);

    return socketRef.current;
};