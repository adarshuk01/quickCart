import React from 'react'

function Banner() {
    return (
        <div className='text-xl   bg-[url(https://images.unsplash.com/photo-1681823891968-9a530172145f?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center'>
            <div className='bg-blue-500/70 py-4 px-6 flex justify-center lg:justify-between items-center flex-wrap'>
            <div className='flex gap-2 text-white items-center justify-center flex-wrap'>
                <h1 className='bg-gray-900 text-white uppercase font-extrabold w-fit px-4 py-3  rounded -rotate-6'>big sale</h1>
                <h1 className='font-bold text-center'>ALL NEW FASHION BRANDS ITEMS UP TO 70% OFF</h1>
                <span className='font-semibold text-sm text-gray-200  '>Online Purchases Only</span>
                </div>
                <button className='cursor-pointer text-sm text-gray-900 bg-white px-6 py-4 rounded uppercase font-semibold'>view sale</button>
            </div>

        </div>
    )
}

export default Banner
