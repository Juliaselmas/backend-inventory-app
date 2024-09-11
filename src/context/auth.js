//"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    // Funktion för att sätta token (eller user)
    const setToken = (token) => {
      setUser({ token });
      localStorage.setItem("@library/token", token);
    };
  
    const logout = () => {
      setUser(null);
      localStorage.removeItem("@library/token");
    };
  
    useEffect(() => {
      const token = localStorage.getItem("@library/token");
      if (token) {
        setUser({ token });
      }
      setLoading(false);
    }, []);
  
    // Lägg till konsolutskrift här
    console.log({ user, setToken, logout, loading });
  
    return (
      <AuthContext.Provider value={{ user, setToken, logout, loading }}>
        {children}
      </AuthContext.Provider>
    );
  }
  

export function useAuth() {
  return useContext(AuthContext);
}

/*
import { createContext, useContext, useEffect, useState } from "react"


const defaultState = {
    user: null,
    token: null,
    setToken: () => {},
    logout: () => {}
}

const AuthContext = createContext(defaultState)

function AuthProvider({ children }) {
    const [token, setToken] = useState(defaultState.token);
    
    useEffect(() => {
        //TODO set token
        const _token = localStorage.getItem("@library/token")
        if(_token) {
            setToken(_token)
        }
    },[])

    function logout() {
        localStorage.removeItem("@library/token")
        setToken(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                user: null,
                setToken,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    return useContext(AuthContext)
}

export { AuthProvider, useAuth }
*/
/*
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
*/