"use client"
import React from "react";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = React.useState({
    token: "",
    });

    const setUserAuthInfo = ({ token }) => {
        const auth = localStorage.setItem("token", token);

        setAuthState({
            token: auth,
        });
    };

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