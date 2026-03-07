import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import useMessageStore from "../store/message_store";
import useMessageSound from "./useMessageSound";
import type { Message } from "../types/message";
import { uploadMessageAttachment } from "@/features/attachment/services/attachment_services";
const usePrivateChat = (
    teamId: string,
    fromUserId: string,
    toUserId: string
) => {

    const { messages, isLoading, getPrivateMessages, addMessage } = useMessageStore();
    const { playReceivedSound, playSentSound } = useMessageSound();

    const socketRef = useRef<Socket | null>(null);

    const [file, setFile] = useState<File | null>(null);
    const [text, setText] = useState("");
    const [error, setError] = useState<string | undefined>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // cargar historial
    useEffect(() => {

        if (teamId && fromUserId && toUserId) {
            getPrivateMessages(teamId, fromUserId, toUserId);
        }

    }, [teamId, fromUserId, toUserId, getPrivateMessages]);

    // socket
    useEffect(() => {

        socketRef.current = io(import.meta.env.VITE_API_SOCKET_URL, {
            withCredentials: true,
            transports: ["websocket"],
        });

        const socket = socketRef.current;

        socket.on("connect", () => {

            console.log("✅ Socket conectado:", socket.id);

            if (fromUserId && toUserId) {
                socket.emit("joinPrivateChat", {
                    fromUserId,
                    toUserId
                });
            }

        });

        socket.on("newPrivateMessage", (message: Message) => {

            addMessage(message);
            playReceivedSound();

        });

        return () => {
            socket.off("newPrivateMessage");
            socket.disconnect();
        };

    }, [addMessage, fromUserId, toUserId, playReceivedSound]);



    const sendMessage = useCallback(async (e: React.FormEvent) => {

        e.preventDefault();

        if (!text.trim() && !file) {
            setError("Message or attachment required");
            return;
        }

        try {

            setIsSubmitting(true);

            let attachmentUrl: string | undefined;

            if (file) {

                const upload = await uploadMessageAttachment(
                    teamId,
                    file
                );

                attachmentUrl = upload.url;

            }

            socketRef.current?.emit("sendPrivateMessage", {
                teamId,
                fromUserId,
                toUserId,
                text,
                attachments: attachmentUrl
            });

            playSentSound();

            setText("");
            setFile(null);
            setError(undefined);

        } catch (err) {

            console.error(err);
            setError("Failed to send message");

        } finally {

            setIsSubmitting(false);

        }

    }, [text, file, teamId, fromUserId, toUserId, playSentSound]);



    return {
        messages,
        text,
        setText,
        error,
        isLoading,
        isSubmitting,
        sendMessage,
        file,
        setFile
    };

};

export default usePrivateChat;