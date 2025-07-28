import Tag from "../models/Tag.js";
import mongoose from "mongoose";
class TagRepository {
    async createTag(name, teamId) {
        return await Tag.create({ name, teamId });
    }
    async getAllTags(teamId) {
        return await Tag.find({ teamId });
    }
    async getTagById(tagId, teamId) {
        return await Tag.findOne({
            _id: tagId,
            teamId: new mongoose.Types.ObjectId(teamId)
        });
    };
    async updateTag(tagId, teamId, data) {
        return await Tag.findOneAndUpdate(
            { _id: tagId, teamId: new mongoose.Types.ObjectId(teamId) },
            { $set: data },
            { new: true }
        );
    }
    async deleteTag(tagId, teamId) {
        return await Tag.findOneAndDelete({
            _id: new mongoose.Types.ObjectId(tagId),
            teamId: new mongoose.Types.ObjectId(teamId)
        });
    }
    async deleteByTeamId(teamId) {
        return await Tag.deleteMany({ teamId });
    }
}

export default new TagRepository();