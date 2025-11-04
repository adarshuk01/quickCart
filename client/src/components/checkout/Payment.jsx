import React, { useState } from "react";
import useAxios from "../../Hooks/useAxios";

function Payment({ orderId, totalAmount }) {
  const [method, setMethod] = useState("cod");
  const axios = useAxios();

  const baseURL =
    import.meta.env.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL;
  const razorpayKey =
    import.meta.env.VITE_RAZORPAY_KEY_ID || process.env.REACT_APP_RAZORPAY_KEY_ID;
      console.log('razorpayKey',razorpayKey);
    

  // 🧩 Utility: Load Razorpay SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // 🧾 COD handler
  const handlePlaceOrder = async () => {
    try {
      const { data } = await axios.post(`/orders`, {
        items: cartItems,
        shippingAddress,
        paymentMethod: "cod",
      });
      alert(`✅ Order placed successfully! Order ID: ${data._id}`);
    } catch (error) {
      console.error(error);
      alert("Error placing order");
    }
  };

 const handleRazorpay = async () => {
  try {
    await loadRazorpayScript();

    const { data } = await axios.post("/orders/create-razorpay-order", {
      amount: totalAmount,
      orderId,
    });

    console.log('razorpayKey',razorpayKey);
    

    const options = {
      key: razorpayKey,
      amount: data.amount,
      currency: data.currency,
      order_id: data.razorpayOrderId,
      name: "My Shop",
      description: "Order Payment",
      handler: async function (response) {
        const verifyRes = await axios.post("/orders/verify-payment", response);
        if (verifyRes.data.success) {
          alert("✅ Payment successful!");
        } else {
          alert("❌ Payment verification failed!");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error(error);
    alert("Error starting payment");
  }
};


  return (
    <div className="mt-4 space-y-4">
      <h3 className="font-semibold text-lg">Select Payment Method</h3>

      {/* Payment Options */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 border p-3 rounded-md cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={method === "cod"}
            onChange={(e) => setMethod(e.target.value)}
          />
          Cash on Delivery
        </label>

        <label className="flex items-center gap-2 border p-3 rounded-md cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="razorpay"
            checked={method === "razorpay"}
            onChange={(e) => setMethod(e.target.value)}
          />
          Razorpay
        </label>
      </div>

      {/* Action Button */}
      {method === "cod" ? (
        <button
          onClick={handlePlaceOrder}
          className="bg-black text-white px-6 py-3 rounded-md font-medium w-full"
        >
          Place Order
        </button>
      ) : (
        <button
          onClick={handleRazorpay}
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium w-full"
        >
          Pay Now
        </button>
      )}
    </div>
  );
}

export default Payment;
