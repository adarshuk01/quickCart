import React, { useContext, useEffect } from 'react'
import CartCard from '../components/mycart/CartCard'
import CartInfo from '../components/mycart/CartInfo'
import { CartContext } from '../context/CartContext'

function MyCart() {
  const { cart, fetchCart, removeFromCart, updateCartQuantity } = useContext(CartContext)

  useEffect(() => {
    fetchCart()
    console.log('');
    
  }, [])

  return (
    <div className='px-3'>
      <h1 className='text-xl'>My Cart</h1>
      <p className='font-light '>{cart?.items?.length || 0} products in cart</p>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-4 mt-6'>
        <div className='lg:col-span-8  p- space-y-2'>
          {cart?.items?.length > 0 ? (
            cart.items.map((item) => (
              <CartCard
                key={item.product._id}
                item={item}
                onRemove={removeFromCart}
                onUpdateQty={updateCartQuantity}
              />
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        <div className='lg:col-span-4 border p-3 bg-blue-50 h-fit '>
          {cart ? <CartInfo cart={cart} /> : <p>Loading...</p>}
        </div>
      </div>
    </div>
  )
}

export default MyCart
