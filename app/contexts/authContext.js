"use client"
import React, { useEffect } from "react";
import jwt_decode from 'jwt-decode';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = React.useState({
        loading: true,
        token: "",
        user: null,
    });

    const setUserAuthInfo = ({ token, data }) => {
        setAuthState({
            loading: false,
            token: token,
            user: data
        });
    };

    useEffect(() => {
        if(localStorage.getItem('token')) {
            setAuthState({ 
                loading: false,
                token: localStorage.getItem('token'), 
                user: jwt_decode(localStorage.getItem('token'))
            });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("token", authState.token);
    }, [authState])

    // checks if the user is authenticated or not
    const isUserAuthenticated = () => {
        return authState.user;
    };

    return (
    <AuthContext.Provider
        value={{
        authState,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated
        }}
    >
        {children}
    </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };