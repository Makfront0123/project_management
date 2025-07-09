import mongoose from "mongoose";

const taskAssignmentSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
   
}, { timestamps: true })

export default mongoose.model("TaskAssignment", taskAssignmentSchema)