// context/cart/CartContext.js
import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import useAxios from "../Hooks/useAxios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState([]);

   const axios = useAxios();
  // 👉 Check if a product is loading
const isProductLoading = (productId) => loadingItems.includes(productId);

 
  // Get cart
  const fetchCart = async () => {
    console.log('hello');
    
    try {
      setLoading(true);
      const { data } = await axios.get("/cart", { withCredentials: true });
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  
  // Add product to cart
const addToCart = async (productId, quantity = 1) => {
  try {
    setLoadingItems((prev) => [...prev, productId]); // mark this product as loading

    await axios.post(
      "/cart/add",
      { productId, quantity },
      { withCredentials: true }
    );

    await fetchCart();
  } catch (error) {
    console.error("Error adding to cart:", error);
  } finally {
    setLoadingItems((prev) => prev.filter((id) => id !== productId)); // remove from loading
  }
};

  // Update quantity
  const updateQuantity = async (productId, quantity) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        "/cart/update",
        { productId, quantity },
        { withCredentials: true }
      );
      setCart(data);
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setLoading(false);
    }
  };

  // Remove item
  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      await axios.delete("/cart/remove", {
        data: { productId },
        withCredentials: true,
      });
      await fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setLoading(false);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete("/cart/clear", {
        withCredentials: true,
      });
      setCart(data.cart);
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update cart quantity (alternate version)
  const updateCartQuantity = async (productId, quantity) => {
    try {
      setLoading(true);
      await axios.put(
        "/cart/update",
        { productId, quantity },
        { withCredentials: true }
      );
      await fetchCart();
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,
        addToCart,
        isProductLoading,
        loadingItems,
        updateQuantity,
        removeFromCart,
        clearCart,
        updateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
