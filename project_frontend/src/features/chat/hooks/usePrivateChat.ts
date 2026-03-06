import { useEffect, useRef, useCallback, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import useMessageStore from '../store/message_store';
import type { Message } from '../types/message';
import useMessageSound from './useMessageSound';
const usePrivateChat = (fromUserId: string, toUserId: string) => {

    const { messages, isLoading, getPrivateMessages, addMessage } = useMessageStore();
    const { playReceivedSound } = useMessageSound();

    const socketRef = useRef<Socket | null>(null);

    const [text, setText] = useState("");
    const [error, setError] = useState<string | undefined>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // cargar historial
    useEffect(() => {
        if (fromUserId && toUserId) {
            getPrivateMessages(fromUserId, toUserId);
        }
    }, [fromUserId, toUserId, getPrivateMessages]);

    // socket
    useEffect(() => {

        if (!socketRef.current) {

            socketRef.current = io(import.meta.env.VITE_API_SOCKET_URL, {
                withCredentials: true,
                transports: ["websocket"],
            });

            socketRef.current.on("newPrivateMessage", (message: Message) => {
                addMessage(message);
                playReceivedSound();
            });
        }

        return () => {
            socketRef.current?.off("newPrivateMessage");
        };

    }, [addMessage, playReceivedSound]);

    // join room
    useEffect(() => {

        if (!socketRef.current) return;
        if (!fromUserId || !toUserId) return;

        socketRef.current.emit("joinPrivateChat", {
            fromUserId,
            toUserId,
        });

        return () => {
            socketRef.current?.emit("leavePrivateChat", {
                fromUserId,
                toUserId,
            });
        };

    }, [fromUserId, toUserId]);

    const sendMessage = useCallback(async (e: React.FormEvent) => {

        e.preventDefault();

        if (!text.trim()) {
            setError("Message required");
            return;
        }

        setIsSubmitting(true);

        socketRef.current?.emit("sendPrivateMessage", {
            fromUserId,
            toUserId,
            text,
        });

        setText("");
        setError(undefined);
        setIsSubmitting(false);

    }, [text, fromUserId, toUserId]);

    return {
        messages,
        text,
        setText,
        error,
        isLoading,
        isSubmitting,
        sendMessage
    };
};

export default usePrivateChat;