import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthChange,
  loginUser,
  registerUser,
  logoutUser,
} from "../services/auth";
import Spinner from "../components/Common/Spinner";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((userData) => {
      setUser(userData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      await loginUser(email, password);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error.code === "auth/invalid-credential"
            ? "Invalid email or password"
            : "Login failed. Please try again.",
      };
    }
  };

  const register = async (email, password, name, role = "user") => {
    try {
      await registerUser(email, password, name, role);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error.code === "auth/email-already-in-use"
            ? "Email already registered"
            : "Registration failed. Please try again.",
      };
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAdmin: user?.isAdmin || false,
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #F4A460 100%)",
          color: "#5D4037",
        }}
      >
        <Spinner size="large" />
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContext;
