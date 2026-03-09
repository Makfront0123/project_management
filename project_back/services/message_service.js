import messageRepository from "../repositories/message_repository.js";

class MessageService {
  async getPrivateMessages(teamId, fromId, toId) {
    return await messageRepository.getPrivateMessages(teamId, fromId, toId);
  }
  async getGlobalMessages(teamId) {
    return await messageRepository.getGlobalMessages(teamId);
  }
  async deletePrivateMessages(fromId, toId) {
    return await messageRepository.deletePrivateMessages(fromId, toId);
  }
  async deleteGlobalMessages(teamId) {
    return await messageRepository.deleteGlobalMessages(teamId);
  }
  async deleteAllMessages(teamId) {
    return await messageRepository.deleteAllMessages(teamId);
  }
  async uploadMessageAttachment(teamId, file) {
    return await messageRepository.uploadMessageAttachment(teamId, file);
  }
}

export default new MessageService();


/*
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
*/