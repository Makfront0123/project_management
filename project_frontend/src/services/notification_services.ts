import axios from "axios";
import { useAuthStore } from "../stores/auth_store";

const baseUrl = "/api/v1/";

export const createNotification = async (message: string, recipientId: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.post(`${baseUrl}notifications`, {
        message,
        recipient: recipientId,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log("api response:", response.data);

    return response.data;
};

export const getNotificationsForUser = async (userId: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.get(`${baseUrl}notifications?recipient=${userId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
};

export const markNotificationAsRead = async (id: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.patch(`${baseUrl}notifications/${id}/read`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
};