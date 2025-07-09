import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "member"],
        default: "member"
    },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },

}, { timestamps: true })

export default mongoose.model("TeamMember", teamMemberSchema)