import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true }
}, { timestamps: true });

tagSchema.index({ name: 1, teamId: 1 }, { unique: true });

export default mongoose.model('Tag', tagSchema);