// src/context/OrderContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

const OrderContext = createContext();

// Custom hook
export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderToEdit, setOrderToEdit] = useState(null);

  // ✅ Fetch all orders (admin)
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = sessionStorage.getItem("token");
      const res = await axiosInstance.get( `/orders` );
      console.log('orders',res);
      

      setOrders(res.data.data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete an order
  const deleteOrder = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      await axiosInstance.delete(
        `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders((prev) => prev.filter((order) => order._id !== id));
      setFilteredOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  // ✅ Search or filter orders by orderId, user name, or city
  const searchAndFilter = (query) => {
    if (!query) {
      setFilteredOrders([]);
      return;
    }

    const lower = query.toLowerCase();

    const filtered = orders.filter((order) => {
      const userName =
        `${order.user?.firstname || ""} ${order.user?.lastname || ""}`.toLowerCase();
      const city = order.shippingAddress?.city?.toLowerCase() || "";
      const orderId = order._id?.toLowerCase() || "";
      return (
        userName.includes(lower) ||
        city.includes(lower) ||
        orderId.includes(lower)
      );
    });

    setFilteredOrders(filtered);
  };

  // ✅ Fetch orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        filteredOrders,
        loading,
        error,
        fetchOrders,
        deleteOrder,
        searchAndFilter,
        orderToEdit,
        setOrderToEdit,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
