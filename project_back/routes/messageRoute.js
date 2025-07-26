import express from "express";
import Message from "../models/Message.js";
 
const router = express.Router();

 
router.get("/private-messages/:fromId/:toId", async (req, res) => {
  const { fromId, toId } = req.params;

  const messages = await Message.find({
    $or: [
      { sender: fromId, receiver: toId },
      { sender: toId, receiver: fromId },
    ],
  }).sort({ createdAt: 1 }).populate("sender", "name email");

  res.json({ data: messages });
});

router.get("/global-messages/:teamId", async (req, res) => {
  const { teamId } = req.params;
  const messages = await Message.find({
    teamId,
  }).sort({ createdAt: 1 }).populate("sender", "name email");
  res.json({ data: messages });
});


export default router;