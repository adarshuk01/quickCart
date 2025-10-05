import React from 'react'
import { Link } from 'react-router-dom'

function CartInfo({ cart }) {
    return (
        <div>
            <div className='flex gap-2 mb-3'>
                <input placeholder='Enter Promocode' className='border border-gray-300 w-full p-2 rounded focus:outline-none ' type="text" />
                <button className='p-2 bg-white border rounded'>Apply</button>
            </div>
            <div className='flex flex-col gap-2'>
                <p className='flex justify-between'>
                    <span>{cart.itemsCount} items:</span>
                    <span>${cart?.originalTotal?.toFixed(2)}</span>
                </p>
                <p className='flex justify-between'>
                    <span>Discount:</span>
                    <span>- ${cart?.totalDiscount?.toFixed(2)}</span>
                </p>
                <p className='flex justify-between'>
                    <span>Delivery cost:</span>
                    <span>${cart?.deliveryCost?.toFixed(2)}</span>
                </p>
                <p className='flex justify-between'>
                    <span>Tax:</span>
                    <span>${cart?.tax?.toFixed(2)}</span>
                </p>
                <hr />
                <p className='flex justify-between text-xl font-semibold'>
                    <span>Total:</span>
                    <span>${cart?.totalPrice?.toFixed(2)}</span>
                </p>

                <Link to={'/checkout'} className='bg-blue-600 text-center border-b-2 border-blue-800 uppercase text-white p-3 font-semibold w-full'>Go to Checkout</Link>
            </div>
        </div>
    )
}

export default CartInfo
