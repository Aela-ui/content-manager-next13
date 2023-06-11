import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const apiUrl = process.env.API_URL;

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${apiUrl}/auth/login`, { 
                email: email,
                password: password
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            token: response.data.token,
            data: jwt_decode(response.data.token),
        };
    } catch (err) {
        return {
            error: true,
            message: err.response,
        };
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    return 0;
};

export async function forgotPassword(email) {
    try {
        return await Axios.put(`${apiUrl}/auth/forgotPassword`, {
            email,
        });
    } catch (err) {
        return err;
    }
}