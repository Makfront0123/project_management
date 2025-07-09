import axios from "axios";

const baseUrl = "http://localhost:3000";
export const getProfile = async () => {
    const response = await axios.get(`${baseUrl}/users`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        }

    );
    return response.data;
}

export const updateUser = async (data: Array<string>) => {
    const response = await axios.put(`${baseUrl}/users`, data,

        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        }
    );
    return response.data;
}

export const deleteUser = async () => {
    const response = await axios.delete(`${baseUrl}/users`,

        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        }
    );
    return response.data;
}