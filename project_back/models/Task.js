import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name: String,
    description: String,

    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },

    dueDate: {
        type: Date,
        required: false
    },

    priority: {
        type: String,
        enum: ["low", "medium", "high", "urgent"],
        default: "medium"
    },

    status: {
        type: String,
        enum: ["open", "in progress", "done"],
        default: "open"
    },
}, { timestamps: true })
export default mongoose.model("Task", taskSchema)