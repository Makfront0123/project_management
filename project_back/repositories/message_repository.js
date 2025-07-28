import Message from "../models/Message.js";

export const MessageRepository = {
  getPrivateMessages: async (fromId, toId) => {
    return await Message.find({
      $or: [
        { sender: fromId, receiver: toId },
        { sender: toId, receiver: fromId },
      ],
    }).sort({ createdAt: 1 }).populate("sender", "name email");
  },

  getGlobalMessages: async (teamId) => {
    return await Message.find({ teamId })
      .sort({ createdAt: 1 })
      .populate("sender", "name email");
  },

  deletePrivateMessages: async (fromId, toId) => {
    return await Message.deleteMany({
      $or: [
        { sender: fromId, receiver: toId },
        { sender: toId, receiver: fromId },
      ],
    });
  },

  deleteGlobalMessages: async (teamId) => {
    return await Message.deleteMany({ teamId });
  },

  deleteAllMessages: async (teamId) => {
    return await Message.deleteMany({ teamId });
  },
};

export default MessageRepository;
