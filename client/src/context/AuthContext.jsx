import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [loading, setloading] = useState(false)
  const navigate=useNavigate()

  const signup = async (userData) => {
    setloading(true)
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', userData);
      console.log('✅ Signup Success:', res.data);
      localStorage.setItem('token',res.data.token)
      return { success: true, message: res.data.message };
    } catch (err) {
      console.error('❌ Signup Error:', err.response?.data || err.message);
      return { success: false, message: err.response?.data?.error || "Signup failed" };
    } finally {
      setloading(false)

    }
  };

  const verifyOtp=async(userData)=>{
    setloading(true)
    try {
      const res=await axios.post('http://localhost:5000/api/auth/verify-otp',userData)
      console.log(res);  
      navigate('/')
    } catch (error) {
      console.log(error);
      
      
    }finally{
     setloading(false)
    }
  }

   const login = async (email, password) => {
    setloading(true)
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login',{ email, password});
      console.log('✅ Login Success:', res.data);
      localStorage.setItem('token',res.data.token)
      navigate('/')
      return { success: true, message: res.data.message };
    } catch (err) {
      console.error('❌ Login Error:', err.response?.data || err.message);
      return { success: false, message: err.response?.data?.error || "Signup failed" };
    } finally {
      setloading(false)

    }
  };



  return (
    <AuthContext.Provider value={{ signup,loading,verifyOtp,login }}>{children}</AuthContext.Provider>
  )

}