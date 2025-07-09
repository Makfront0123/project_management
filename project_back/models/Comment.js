import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment: String,
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

 
}, { timestamps: true })

export default mongoose.model("Comment", commentSchema)