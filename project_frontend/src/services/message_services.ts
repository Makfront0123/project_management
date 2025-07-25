import axios from "axios";
 
const baseUrl = "/api/v1";

export const getPrivateMessages = async (fromId: string, toId: string) => {
    const response = await axios.get(`${baseUrl}/private-messages/${fromId}/${toId}`);
    return response.data;
};

export const getGlobalMessages = async (teamId: string) => {
    const response = await axios.get(`${baseUrl}/global-messages/${teamId}`);
    return response.data;
};