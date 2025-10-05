import React from 'react'

function Banner2() {
  return (
    <div className='bg-[url(http://cdn.shopify.com/s/files/1/1613/0109/files/shop4_home_banner2.jpg)] bg-cover flex  items-center justify-center flex-wrap gap-5 lg:gap-10 py-12 px-6'>
        <h1 className='w-fit text-end text-white text-3xl font-extrabold'>TOP FASHION <br /> DEALS</h1>
        <button className='uppercase font-semibold bg-black px-8 py-2 runded text-white cursor-pointer'>view sale</button>
        <div className='uppercase text-white'> 
            <h2 className='bg-white text-black font-semibold px-4 py-2'>Exclusive COUPON</h2>
            <div className='flex text-xl items-center mt-2 -ml-7'>
                <p className='rotate-90 mirror font-semibold h-fit w-fit -mr-2 text-sm '>upto</p>
                <span className=''> <span className='bg-red-400 px-4 py-1'>$100</span>  <span className='bg-transparent'>Off</span> </span>
            </div>
        </div>
      
    </div>
  )
}

export default Banner2
