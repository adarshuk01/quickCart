import React, { useContext, useEffect, useState } from 'react'
import ShippingAddress from '../components/checkout/ShippingAddress'
import Payment from '../components/checkout/Payment'
import { CartContext } from '../context/CartContext'

function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(1)
  const { cart, fetchCart } = useContext(CartContext)
  const [orderDetails, setOrderDetails] = useState(null);

  console.log(cart);

  useEffect(() => {
    fetchCart()
    console.log('');

  }, [])

  return (
    <div className="p-">
      {/* Page Title */}
      <h1 className="  lg:text-2xl text-xl font- uppercase px-4  mb-2">Checkout</h1>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Order Summary (Top on mobile, right side on desktop) */}
        <div className="order-1 lg:order-2 lg:col-span-4 border rounded-lg p-6 bg-white h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cart?.items?.length > 0 ? (
            cart.items.map((item) => (
              <div key={item._id} className="mb-2 flex justify-between">
                <div className="flex gap-3 items-center">
                  <img
                    className="rounded-lg h-[60px] w-[60px] object-cover border"
                    src={item.product?.images?.[0] || "https://via.placeholder.com/150"}
                    alt={item.product?.name}
                  />
                  <h3 className="capitalize">
                    {item.product?.name} X {item?.quantity}
                  </h3>
                </div>
                <p>${item?.itemTotal}</p>
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
          <hr />
          <p className="mt-2 text-lg font-light flex justify-between">
            <span>Shipping:</span> <span className="font-bold">Free</span>
          </p>
          <hr className="my-2" />
          <p className="mt-2 text-lg flex font-light justify-between">
            <span>Total:</span> <span className="font-bold">${cart?.totalPrice}</span>
          </p>
        </div>

        {/* Steps (Below on mobile, left side on desktop) */}
        <div className="order-2 lg:order-1 lg:col-span-8 space-y-6">
          {/* Step 1 - Address */}
          <div className="border rounded-lg p-6 bg-white">
            <div className="flex items-center mb-4">
              <span
                className={`w-8 h-8 flex items-center justify-center rounded-full font-bold mr-3 ${activeStep >= 1
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-700"
                  }`}
              >
                1
              </span>
              <h2 className="text-xl font-semibold">Shipping address</h2>
            </div>
            <ShippingAddress  onContinue={(order) => {
              
    setOrderDetails(order);
    setActiveStep(2);
  }} />
          </div>

          {/* Step 2 - Payment */}
          <div className="border rounded-lg p-6 bg-white">
            <div className="flex items-center mb-4">
              <span
                className={`w-8 h-8 flex items-center justify-center rounded-full font-bold mr-3 ${activeStep === 2
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-700"
                  }`}
              >
                2
              </span>
              <h2 className="text-xl font-semibold">Payment</h2>
            </div>

{activeStep === 2 && orderDetails && (
  <Payment orderId={orderDetails._id} totalAmount={orderDetails.totalAmount} />
)}          </div>
        </div>
      </div>

    </div>
  )
}

export default CheckoutPage
