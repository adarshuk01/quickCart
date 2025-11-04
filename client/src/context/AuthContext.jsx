import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxios from "../Hooks/useAxios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Access the previous route info
  const axiosInstance = useAxios();

  const signup = async (userData) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/signup", userData);
      console.log("✅ Signup Success:", res.data);
      localStorage.setItem("token", res.data.token);
      return { success: true, message: res.data.message };
    } catch (err) {
      console.error("❌ Signup Error:", err.response?.data || err.message);
      return { success: false, message: err.response?.data?.error || "Signup failed" };
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (userData) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/verify-otp", userData);
      console.log("✅ OTP Verified:", res);
      navigate("/");
    } catch (error) {
      console.error("❌ OTP Verification Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      console.log("✅ Login Success:", res.data);
      localStorage.setItem("token", res.data.token);

    

      return { success: true, message: res.data.message };
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data || err.message);
      return { success: false, message: err.response?.data?.error || "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ signup, loading, verifyOtp, login }}>
      {children}
    </AuthContext.Provider>
  );
};
