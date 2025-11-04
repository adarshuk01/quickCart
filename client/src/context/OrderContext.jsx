// src/context/OrderContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import useAxios from "../Hooks/useAxios";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const axios=useAxios()

  // ✅ Fetch orders of the logged-in user
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token"); // assuming JWT stored here
      const res = await axios.get("/orders/my-orders",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      

      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        fetchOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// ✅ Custom hook for easy access
export const useOrders = () => useContext(OrderContext);
