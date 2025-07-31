import { create } from "zustand";
import { deleteGlobalMessages, getGlobalMessages, getPrivateMessages } from "../services/message_services";
import type { Message } from "../types/message";
import toast from "react-hot-toast";

interface MessageStore {
    messages: Message[];
    isLoading: boolean;
    getPrivateMessages: (fromId: string, toId: string) => Promise<void>;
    getGlobalMessages: (teamId: string) => Promise<void>;
    addMessage: (message: Message) => void;
    deleteGlobalMessages: (teamId: string) => Promise<void>;
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

    deleteGlobalMessages: async (teamId: string) => {
        set({ isLoading: true });
        const response = await deleteGlobalMessages(teamId);
        const update = await getGlobalMessages(teamId);
        set({ messages: update.data, isLoading: false });
        toast.success(response.message);
    },
}));

export default useMessageStore;