import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: false,  
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: false, 
    },
    type: {
        type: String,
        required: false,
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed, 
        required: false
    }
}, {
    timestamps: true,
});

export default mongoose.model("Notification", NotificationSchema);