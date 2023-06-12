"use client"
import React, { useEffect } from "react";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = React.useState({
    token: "",
    });

    const setUserAuthInfo = ({ token }) => {
        setAuthState({
            token: token,
        });
    };

    useEffect(() => {
        setAuthState({ token: localStorage.getItem('token')});
    }, []);

    useEffect(() => {
        localStorage.setItem("token", authState.token);
    }, [authState])

    // checks if the user is authenticated or not
    const isUserAuthenticated = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return false;
        }

        return true
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