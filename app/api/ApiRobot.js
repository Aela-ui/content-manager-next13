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

export const editContentRobot = async (auth, robotId, contentId) => {
    try {
        console.log(robotId, contentId);
        const response = await axios.patch(`${apiUrl}/robots/${robotId}`, { 
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

export const findAllRobots = async (auth) => {
    try {
        const response = await axios.get(`${apiUrl}/robots`, 
        {
            headers: {
                'authorization': `Bearer ${auth.token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (err) {
        return {
            status: err.response.status,
            error: true,
            message: err.response.data.message,
        };
    }
}

export const findAllUserRobots = async (auth, userId) => {
    try {
        const response = await axios.get(`${apiUrl}/robots/findAllByUserId?userId=${userId}`, 
        {
            headers: {
                'authorization': `Bearer ${auth.token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (err) {
        return {
            status: err.response.status,
            error: true,
            message: err.response.data.message,
        };
    }
}