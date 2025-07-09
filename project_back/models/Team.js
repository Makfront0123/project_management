import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: String,
    description: String,
    code: {
        type: String,
        required: true,
        unique: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    
}, { timestamps: true })

export default mongoose.model("Team", teamSchema)