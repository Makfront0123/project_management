import * as messageService from "../services/message_service.js";

export const getPrivateMessages = async (req, res) => {
  try {
    const { fromId, toId } = req.params;
    const messages = await messageService.getPrivateMessages(fromId, toId);
    res.json({ data: messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGlobalMessages = async (req, res) => {
  try {
    const { teamId } = req.params;
    const messages = await messageService.getGlobalMessages(teamId);
    res.json({ data: messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGlobalMessages = async (req, res) => {
  try {
    const { teamId } = req.params;
    const result = await messageService.deleteGlobalMessages(teamId);
    res.json({
      message: "Team messages deleted successfully",
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePrivateMessages = async (req, res) => {
  try {
    const { teamId, fromId, toId } = req.params;
 
    const result = await messageService.deletePrivateMessages(fromId, toId);
    res.json({
      message: "Messages deleted successfully",
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const deleteAllMessages = async (req, res) => {
  try {
    const { teamId } = req.params;
    const result = await messageService.deleteAllMessages(teamId);
    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};