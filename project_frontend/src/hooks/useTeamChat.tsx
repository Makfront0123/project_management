import { useCallback, useEffect, useRef } from "react"
import type { Message } from "../types/message"
import { io, type Socket } from "socket.io-client"
import type { User } from "../types/auth"
import useMessageStore from "../stores/message_store"

const useTeamChat = (teamId: string) => {
    const addMessage = useMessageStore((state) => state.addMessage);
    const socketRef = useRef<Socket | null>(null)

    useEffect(() => {
        const socket = io("http://localhost:3000", {
            withCredentials: true,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        socketRef.current = socket

        socket.emit("joinTeamRoom", teamId);


        socket.on("newMessage", (message: Message) => {
            addMessage(message);
        });

        socket.on("connect", () => {

        });

        socket.on("disconnect", () => {

        });

        return () => {
            socket.disconnect();

        };
    }, [addMessage, teamId]);

    const sendMessage = useCallback((text: string, sender: User, receiverId?: string | null) => {

        if (!socketRef.current) return;

        if (!sender?.id) {
            console.error("Falta el ID del usuario, no se puede enviar mensaje");
            return;
        }
        socketRef.current.emit("sendMessage", {
            text,
            teamId,
            sender: {
                _id: sender.id,
                name: sender.name,
                email: sender.email,
            },
            receiverId: receiverId || null,
        });

    }, [teamId]);




    return {
        sendMessage
    }
}

export default useTeamChat;
