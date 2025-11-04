import React, { useContext, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { CartContext } from '../../context/CartContext';

function ShippingAddress({ onContinue }) {
  const axios = useAxios();
  const { cart, fetchCart } = useContext(CartContext);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    zip: '',
    city: '',
    state: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContinue = async () => {
    if (!form.firstName || !form.lastName || !form.address1 || !form.zip || !form.city || !form.state) {
      alert("Please fill all required fields");
      return;
    }

  

    try {
      setLoading(true);

      const shippingAddress = {
        fullName: `${form.firstName} ${form.lastName}`,
        address: form.address1,
        city: form.city,
        postalCode: form.zip,
        country: form.state,
      };

      const res = await axios.post("/orders", {
       
        items: cart.items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        shippingAddress,
        paymentMethod: "razorpay",
        totalAmount: cart.totalPrice,
      });
      console.log(res);
      

      const order = res.data.savedOrder;
      if (!order) {
        alert("Order creation failed");
        return;
      }

      onContinue(order); // ✅ Pass order details to payment step
    } catch (err) {
      console.error("Error creating order:", err.response?.data || err.message);
      alert("Error creating order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name *"
          value={form.firstName}
          onChange={handleChange}
          className="border p-3 rounded-md w-full"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name *"
          value={form.lastName}
          onChange={handleChange}
          className="border p-3 rounded-md w-full"
        />
      </div>

      <input
        type="text"
        name="address1"
        placeholder="Address 1 - Street or P.O. Box *"
        value={form.address1}
        onChange={handleChange}
        className="border p-3 rounded-md w-full"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="zip"
          placeholder="Zip Code *"
          value={form.zip}
          onChange={handleChange}
          className="border p-3 rounded-md w-full"
        />
        <input
          type="text"
          name="city"
          placeholder="City *"
          value={form.city}
          onChange={handleChange}
          className="border p-3 rounded-md w-full"
        />
        <input
          type="text"
          name="state"
          placeholder="State *"
          value={form.state}
          onChange={handleChange}
          className="border p-3 rounded-md w-full"
        />
      </div>

      <button
        type="button"
        onClick={handleContinue}
        disabled={loading}
        className={`mt-4 px-6 py-3 rounded-md font-medium text-white ${
          loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
        }`}
      >
        {loading ? "Processing..." : "Continue to payment"}
      </button>
    </form>
  );
}

export default ShippingAddress;
