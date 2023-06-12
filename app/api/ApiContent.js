import axios from "axios";
import { apiUrl } from "./Api";

export const createContent = async (auth, title, description, model, userId, isPublic, categories) => {
    try {
        console.log(auth, title, description, model, userId, isPublic, categories);
        const response = await axios.post(`${apiUrl}/contents`, { 
            title: title, 
            description: description, 
            model: model, 
            userId: userId, 
            isPublic: isPublic, 
            categories: categories
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

export const uploadContent = async (auth, contentId, file) => {
    try {
        const response = await axios.post(`${apiUrl}/contents/${contentId}/upload`, { 
            file: file
        },
        {
            headers: {
                'authorization': `Bearer ${auth.token}`,
                'Content-Type': 'multipart/form-data',
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