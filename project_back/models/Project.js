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
    }
}, { timestamps: true })

export default mongoose.model("Project", projectSchema)