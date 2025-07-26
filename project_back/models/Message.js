import e from "express";
import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: false },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Message", messageSchema);