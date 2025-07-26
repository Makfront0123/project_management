import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import useMessageStore from '../stores/message_store';
import type { Message } from '../types/message';
import useMessageSound from './useMessageSound';


const usePrivateChat = (fromUserId: string, toUserId: string) => {

    const addMessage = useMessageStore(state => state.addMessage);

    const socketRef = useRef<Socket | null>(null);
    const { playReceivedSound } = useMessageSound();


    useEffect(() => {
        if (!fromUserId || !toUserId) return;
        const socket = io("http://localhost:3000", {
            withCredentials: true,
        });

        socketRef.current = socket;

        socket.emit("joinPrivateChat", { fromUserId, toUserId });

        socket.on("connect", () => { });
        socket.on("disconnect", () => { });



        socket.on("newPrivateMessage", (message: Message) => {

            addMessage(message);
            playReceivedSound();
        });

        return () => {
            socket.disconnect();
        };
    }, [fromUserId, toUserId, addMessage, playReceivedSound]);

    const sendPrivateMessage = useCallback((text: string) => {
        if (!socketRef.current) return;

        socketRef.current.emit("sendPrivateMessage", {
            fromUserId,
            toUserId,
            text,
        });
    }, [fromUserId, toUserId]);

    return {
        sendPrivateMessage,
    };
};

export default usePrivateChat;