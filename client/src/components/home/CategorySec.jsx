import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';

function CategorySec({ label }) {
    const categoryData = [
        {
            name: "Electronics",
            image: "https://phonokart.com/cdn/shop/files/4_4a60a003-cf0c-4f5c-9b1d-43ddfb15d285.png?v=1688025970",
            stock: 9
        },
        {
            name: "Fashion",
            image: "https://rosepng.com/wp-content/uploads/2024/08/s11728_black_tshirt_isolated_on_white_background_-stylize_20_d2e8bdb7-c5bb-4a1d-8085-18bfe81c48de_0-photoroom.png",
            stock: 9
        },
        {
            name: "Home & Living",
            image: "https://png.pngtree.com/png-vector/20240123/ourmid/pngtree-black-sofa-seat-for-decorative-png-image_11463791.png",
            stock: 9
        },
        {
            name: "Beauty & Health",
            image: "https://cdn-icons-png.flaticon.com/512/2965/2965567.png",
            stock:9
        },
        {
            name: "Sports & Outdoors",
            image: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
            stock:9
        },
        {
            name: "Books",
            image: "https://static.vecteezy.com/system/resources/previews/012/896/697/non_2x/2-closed-book-with-black-cove-free-png.png",
        },
        // {
        //     name: "Toys",
        //     image: "https://cdn-icons-png.flaticon.com/512/2930/2930036.png",
        // },
        // {
        //     name: "Grocery",
        //     image: "https://cdn-icons-png.flaticon.com/512/3132/3132693.png",
        // },
        {
            name: "Footwear",
            image: "https://pngimg.com/d/men_shoes_PNG7475.png",
        },
        // {
        //     name: "Watches & Accessories",
        //     image: "https://cdn-icons-png.flaticon.com/512/2938/2938791.png",
        // },
    ];
   const {categories}=useContext(ProductContext)
    const scrollRef = useRef(null)
    const scrollAmount = 300

    const scrollLeft = () => {
        if (!scrollRef.current) return
        const container = scrollRef.current
        if (container.scrollLeft === 0) {
            container.scrollLeft = container.scrollWidth
        } else {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
        }
    }

    const scrollRight = () => {
        if (!scrollRef.current) return
        const container = scrollRef.current
        const maxScrollLeft = container.scrollWidth - container.clientWidth
        if (Math.ceil(container.scrollLeft) >= maxScrollLeft) {
            container.scrollLeft = 0
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        }
    }
    return (
        <div>
            {/* Section Header */}
            <div className='flex items-center gap-2 mb-6 '>
                <span className='h-[0.1px] w-full bg-gray-300'></span>
                <span className='uppercase text-nowrap text-xl font-bold text-gray-700'>
                    {label}
                </span>
                <span className='h-[0.1px] w-full bg-gray-300'></span>
            </div>
            {/* Carousel Wrapper with Arrows */}
            <div className='relative '>
                {/* Left Arrow */}
                <button
                    onClick={scrollLeft}
                    className='absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10'
                >
                    <ChevronLeft />
                </button>

                {/* Right Arrow */}
                <button
                    onClick={scrollRight}
                    className='absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10'
                >
                    <ChevronRight />
                </button>

                {/* Scrollable Product List */}
                <div
                    ref={scrollRef}
                    className='flex gap-2 overflow-x-scroll py-4  scroll-smooth no-scrollbar px-10'
                >
                    {categories.map((item, index) => (
                        <Link to={`/${item.name}`} key={index} className='shrink-0 flex flex-col justify-top bg-blue-800 shadow-lg cursor-pointer w-[250px] h-[250px] overflow-hidden   rounded-full '>
                            <div>
                                <img
                                    className='h-[160px] bg-white filter grayscale'
                                    width={250}
                                    src={item.image}
                                    alt=""
                                />
                                <div className='text-center text-lg text-white  w-full rounded-b-full'>
                                    <h1 className='font-normal uppercase p-4'>{item.name}</h1>
                                </div>
                            </div>
                        </Link>

                    ))}
                </div>
            </div>


        </div>
    )
}

export default CategorySec
