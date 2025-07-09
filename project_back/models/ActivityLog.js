import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: String,
  entity_type: String,
  entity_id: mongoose.Schema.Types.ObjectId,
 
}, { timestamps: true });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
