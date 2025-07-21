import tagService from "../services/tag_service.js";

export const createTag = async (req, res) => {
    try {
        const teamId = req.params.teamId;
        const name = req.body.name;

        const tag = await tagService.createTag(name, teamId);
        res.status(201).json({
            message: "Tag created successfully",
            tag,
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const getAllTags = async (req, res) => {
    try {
        const teamId = req.params.teamId;
        const tags = await tagService.getAllTags(teamId);
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const getTag = async (req, res) => {
    try {
        const tagId = req.params.tagId;
        const teamId = req.params.teamId;

        console.log("tagId:", tagId);
        console.log("teamId:", teamId);
        const tag = await tagService.getTagById(tagId, teamId);
        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const deleteTag = async (req, res) => {
    try {
        const tagId = req.params.tagId;
        const teamId = req.params.teamId;

        const deletedTag = await tagService.deleteTag(tagId, teamId);
        res.status(200).json({ message: "Tag deleted successfully", deletedTag });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateTag = async (req, res) => {
    try {
        const tagId = req.params.tagId;
        const teamId = req.params.teamId;

        const { name } = req.body;

        const data = {
            name,
        }


        const updatedTag = await tagService.updateTag(tagId, teamId, data);
        if (!updatedTag) {
            return res.status(404).json({ message: "Tag not found for this team" });
        }
        res.status(200).json({
            message: "Tag updated successfully",
            updatedTag,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}