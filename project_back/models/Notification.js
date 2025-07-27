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
}, {
    timestamps: true,
});

export default mongoose.model("Notification", NotificationSchema);