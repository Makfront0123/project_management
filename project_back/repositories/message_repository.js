import Message from "../models/Message.js";
import Team from "../models/Team.js";
import mongoose from "mongoose";
export const MessageRepository = {
  getPrivateMessages: async (teamId, fromId, toId) => {
    console.log("GET PRIVATE MESSAGES", teamId, fromId, toId);
    const messages = await Message.find({
      teamId: new mongoose.Types.ObjectId(teamId),
      $or: [
        {
          sender: new mongoose.Types.ObjectId(fromId),
          receiver: new mongoose.Types.ObjectId(toId)
        },
        {
          sender: new mongoose.Types.ObjectId(toId),
          receiver: new mongoose.Types.ObjectId(fromId)
        }
      ]
    })
      .sort({ createdAt: 1 })
      .populate("sender", "_id name email image")
      .populate("receiver", "_id name email image");

    return messages;
  },
  getGlobalMessages: async (teamId) => {

    return await Message.find({
      teamId: new mongoose.Types.ObjectId(teamId),
      $or: [
        { receiver: null },
        { receiver: { $exists: false } }
      ]
    })
      .sort({ createdAt: 1 })
      .populate("sender", "name email image");

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
    if (!team || !Array.isArray(team.members) || team.members.length === 0) return;

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
  uploadMessageAttachment: async (teamId, file) => {
    const message = await Message.create({
      teamId,
      attachments: file.filename,
    });
    await message.populate("sender", "name email image");
    return message;
  },
};

export default MessageRepository;
