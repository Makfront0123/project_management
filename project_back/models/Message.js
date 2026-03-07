import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },

  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

  text: { type: String, default: "" },

  attachments: {
    type: String,
    default: null
  }

}, { timestamps: true });
export default mongoose.model("Message", messageSchema);