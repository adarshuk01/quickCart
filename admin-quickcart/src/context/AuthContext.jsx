import { createContext } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate=useNavigate()
  
  const adminLogin = async (email, password) => {
    try {
      const res = await axiosInstance.post("/auth/admin/login", { email, password });
      console.log(res.data);
      localStorage.setItem('adminToken',res.data.token)
      navigate('/')

      return res.data; // Return data so caller can use it
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error; // Re-throw so caller can handle it
    }
  };

  return (
    <AuthContext.Provider value={{ adminLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
