import { create } from "zustand";
import { getGlobalMessages, getPrivateMessages } from "../services/message_services";
import type { Message } from "../types/message";

interface MessageStore {
    messages: Message[];
    isLoading: boolean;
    getPrivateMessages: (fromId: string, toId: string) => Promise<void>;
    getGlobalMessages: (teamId: string) => Promise<void>;
    addMessage: (message: Message) => void;
}

const useMessageStore = create<MessageStore>((set) => ({
    messages: [],
    isLoading: false,
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    getPrivateMessages: async (fromId: string, toId: string) => {
        set({ isLoading: true });
        const response = await getPrivateMessages(fromId, toId);

        set({ messages: response.data, isLoading: false });
    },

    getGlobalMessages: async (teamId: string) => {
        set({ isLoading: true });
        const response = await getGlobalMessages(teamId);

        set({ messages: response.data, isLoading: false });
    },
}));

export default useMessageStore;