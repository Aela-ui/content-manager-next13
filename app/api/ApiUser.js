import axios from "axios";
import { apiUrl } from "./Api";

export const createUser = async (auth, name, email, password, categories) => {
    try {
        const response = await axios.post(`${apiUrl}/users`, { 
                name: name,
                email: email,
                password: password,
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