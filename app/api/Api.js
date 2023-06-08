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
            message: err,
        };
    }
};

export const logout = () => {
    localStorage.removeItem('user');
    return 0;
};

export const handleResponse = async (response) => {
    try {
        if (response.status !== 200) {
            if (response.status === 401 || response.status === 500) {
                logout();
                History.push('/login');
                window.location.reload();
            }
            const error =
                (response.data && response.data.message) || response.statusText;
            throw error;
        }
        return response.data;
    } catch (err) {
        logout();
    }
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