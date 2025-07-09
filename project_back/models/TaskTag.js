import mongoose from 'mongoose';

const taskTagSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  tagId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }
}, { timestamps: true });

export default mongoose.model('TaskTag', taskTagSchema);
