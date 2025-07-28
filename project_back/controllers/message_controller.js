import * as messageService from "../services/message_service.js";

export const getPrivateMessages = async (req, res) => {
  const { fromId, toId } = req.params;
  const messages = await messageService.getPrivateMessages(fromId, toId);
  res.json({ data: messages });
};

export const getGlobalMessages = async (req, res) => {
  const { teamId } = req.params;
  const messages = await messageService.getGlobalMessages(teamId);
  res.json({ data: messages });
};

export const deleteGlobalMessages = async (req, res) => {
  const { teamId } = req.params;
  const result = await messageService.deleteGlobalMessages(teamId);
  res.json({ data: result });
};

export const deletePrivateMessages = async (req, res) => {
  const { fromId, toId } = req.params;
  const result = await messageService.deletePrivateMessages(fromId, toId);
  res.json({ data: result });
};


export const deleteAllMessages = async (req, res) => {
  const { teamId } = req.params;
  const result = await messageService.deleteAllMessages(teamId);
  res.json({ data: result });
};