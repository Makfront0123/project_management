import Message from "../models/Message.js";
import Team from "../models/Team.js";
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
   
    await Message.deleteMany({ teamId });
 
    const team = await Team.findById(teamId).select("members");
    if (!team) return;

    const memberIds = team.members.map(m => m.toString());
 
    await Message.deleteMany({
      $or: memberIds.flatMap((id1) =>
        memberIds
          .filter((id2) => id2 !== id1)
          .map((id2) => ({
            $or: [
              { sender: id1, receiver: id2 },
              { sender: id2, receiver: id1 },
            ],
          }))
      ),
    });
  },
};

export default MessageRepository;
