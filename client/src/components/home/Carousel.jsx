import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Carousel() {
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    const imageData = [
        {
            src: "https://purepng.com/public/uploads/large/purepng.com-mens-jeansgarmentlower-bodydenimjeans-1421526362615sqofu.png",
            price: "$46",
            containerStyle: 'absolute z-10 -top-5',
            priceBoxStyle: 'flex items-center',
        },
        {
            src: "https://static.vecteezy.com/system/resources/previews/050/704/762/non_2x/mint-green-shirt-isolated-on-transparent-background-png.png",
            price: "$56",
            containerStyle: 'absolute -bottom-5 right-0',
            priceBoxStyle: 'flex items-center rotate-12',
        },
        {
            src: "https://png.pngtree.com/png-clipart/20241106/original/pngtree-casual-blue-shoes-png-image_16687598.png",
            price: "$67",
            containerStyle: 'absolute top-1/3 md:top-1/3 lg:top-0 -right-10 lg:right-0',
            priceBoxStyle: 'flex items-center -rotate-6',
        },
        {
            src: "https://pngimg.com/d/cap_PNG5684.png",
            price: "$88",
            containerStyle: 'absolute bottom-1/5 md:bottom-1/5 -left-10  lg:bottom-0',
            priceBoxStyle: 'flex items-center rotate-12',
        }
    ];

    return (
        <div className='h-[350px] bg-gray-100 md:h-[550px] lg:h-[550px] flex justify-evenly  flex-wrap items-center'>
           
          
            <div className='space-y-2 text-center bg-white shadow-sm  px-12 py-4 rounded'>
                <h2 className=' text-lg lg:text-3xl font-thin'>Extra</h2>
                <h1 className=' text-xl lg:text-6xl font-extrabold text-red-600'>20% OFF</h1>
                <h2 className=' text-xl lg:text-3xl font-light'>ACCESSORIES</h2>
                <h1 className=' text-lg lg:text-3xl font-thin'>Summer Sale</h1>
                <button className='bg-gray-800 text-white px-2 lg:px-6 py-4 uppercase text-sm lg:text-xl font-bold'>Shop all sale</button>
            </div>
        </div>
    );
}

export default Carousel;
