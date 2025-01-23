import React, { createContext, useState, useContext, useEffect } from "react"
import { login as apiLogin, logout as apiLogout } from "../api"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (username, password) => {
    const token = await apiLogin(username, password)
    localStorage.setItem("token", token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    apiLogout()
    localStorage.removeItem("token")
    setIsAuthenticated(false)
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

