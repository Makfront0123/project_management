import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: String,
    description: String,

    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ["active", "completed", "archived", "cancelled"],
        default: "active"
    }
}, { timestamps: true })

export default mongoose.model("Project", projectSchema)