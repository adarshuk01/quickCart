import React, { useState } from 'react'

function Payment() {
  const [method, setMethod] = useState('cod') // default COD

  const handlePlaceOrder = () => {
    alert('Order placed successfully with Cash on Delivery!')
    // here you can add API call for placing order
  }

  const handleRazorpay = () => {
    alert('Redirecting to Razorpay...')
    // integrate Razorpay checkout here
  }

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
            checked={method === 'cod'}
            onChange={(e) => setMethod(e.target.value)}
          />
          Cash on Delivery
        </label>

        <label className="flex items-center gap-2 border p-3 rounded-md cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="razorpay"
            checked={method === 'razorpay'}
            onChange={(e) => setMethod(e.target.value)}
          />
          Razorpay
        </label>
      </div>

      {/* Action Button */}
      {method === 'cod' ? (
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
  )
}

export default Payment
