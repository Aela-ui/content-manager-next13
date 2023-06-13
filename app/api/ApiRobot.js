import axios from "axios";
import { apiUrl } from "./Api";

export const createRobot = async (auth, name, mac, model, users, contentId) => {
    try {
        const response = await axios.post(`${apiUrl}/robots`, { 
            nickname: name, 
            mac: mac, 
            model: model, 
            users: users, 
            contentId: contentId, 
        },
        {
            headers: {
                'authorization': `Bearer ${auth.token}`,
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (err) {
        return {
            status: err.response.status,
            error: true,
            message: err.response.data.message,
        };
    }
}