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

export const deleteContent = async (auth, contentId) => {
    try {
      console.log('Token:', auth.token);
      const response = await axios.delete(`${apiUrl}/contents/${contentId}`, {
        headers: {
          'authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
      });
  
      return response;
    } catch (err) {
      console.error('Error:', err); // Log the error to the console
      if (err.response) {
        return {
          status: err.response.status,
          error: true,
          message: err.response.data.message,
        };
      } else {
        return {
          status: 500,
          error: true,
          message: 'An error occurred during the delete request.',
        };
      }
    }
  };

export const editContent = async (auth, contentId) => {
    try {
        const response = await axios.post(`${apiUrl}/contents/${contentId}`, { 
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

export const findAllContents = async (auth) => {
    try {
        const response = await axios.get(`${apiUrl}/contents`, {
            headers: {
                'authorization': `Bearer ${auth.token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (err) {
        return {
            error: true,
            message: err.response,
        };
    }
}