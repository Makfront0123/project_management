import messageRepository from "../repositories/message_repository.js";

export const getPrivateMessages = (teamId, fromId, toId) => {
  return messageRepository.getPrivateMessages(teamId, fromId, toId);
};
export const getGlobalMessages = (teamId) => {
  return messageRepository.getGlobalMessages(teamId);
};

export const deleteGlobalMessages = (teamId) => {
  return messageRepository.deleteGlobalMessages(teamId);
};

export const deletePrivateMessages = (fromId, toId) => {
  return messageRepository.deletePrivateMessages(fromId, toId);
};

export const deleteAllMessages = (teamId) => {
  return messageRepository.deleteAllMessages(teamId);
};

export const uploadMessageAttachment = (teamId, file) => {
  return messageRepository.uploadMessageAttachment(teamId, file);
};