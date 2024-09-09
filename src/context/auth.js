// src/context/auth.js
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const defaultState = {
    user: null,
    token: null,
    setToken: () => {},
    logout: () => {}
};

const AuthContext = createContext(defaultState);

function AuthProvider({ children }) {
    const [token, setToken] = useState(defaultState.token);
    const [user, setUser] = useState(defaultState.user);

    useEffect(() => {
        // TODO: set user and token
        const _token = localStorage.getItem("@library/token");
        const _user = JSON.parse(localStorage.getItem("@library/user"));
        if (_token) {
            setToken(_token);
            setUser(_user);
        }
    }, []);

    function logout() {
        localStorage.removeItem("@library/token");
        localStorage.removeItem("@library/user");
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ token, user, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth, AuthContext };
