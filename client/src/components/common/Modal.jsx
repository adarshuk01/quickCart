import React, { useContext, useEffect, useState } from 'react';
import { ChartNoAxesColumnIncreasing, Heart, ShoppingBag, X } from 'lucide-react';
import Button from './Button';
import { CartContext } from '../../context/CartContext';

function Modal({ onClose, productData }) {
    const [selectedImage, setSelectedImage] = useState(productData?.images?.[0]);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const { addToCart, cart, isProductLoading } = useContext(CartContext);
    const loading = isProductLoading(productData._id); // check for this product only

    const cartItem = cart?.items?.find(
    (item) => item.product._id === productData._id
  );
  const quantity = cartItem ? cartItem.quantity : 0;

    

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className='h-screen px-2 w-screen bg-black/50 fixed top-0 left-0 flex items-center justify-center z-50'>
            <div className='bg-white max-w-4xl w-full h-[600px] overflow-y-auto p-5 shadow-2xl rounded-lg relative'>
                {/* Close button */}
                <button onClick={onClose} className=' p-1 rounded-full absolute right-2  top-2 bg-red-500 text-white   hover:text-white'>
                    <X size={20} />
                </button>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                    {/* Left Section: Images */}
                    <div className=''>
                        <img src={selectedImage} alt='Selected' className='w-full h-[450px] object-contain mb-4 border rounded-lg' />
                        <div className='flex gap-2'>
                            {productData?.images?.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`thumb-${index}`}
                                    onClick={() => setSelectedImage(img)}
                                    className={`w-16 h-16 object-contain border cursor-pointer p-1 rounded-md ${selectedImage === img ? 'border-black' : 'border-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Section: Product Info */}
                    <div className='space-y-2'>
                        <h1 className='text-2xl text-gray-700 font-bold mb-2 capitalize'>{productData?.name}</h1>
                        <hr className='text-gray-200 my-4' />
                        <p className='text-gray-900 text-2xl font-semibold mt-2 mb-2'>${productData?.price}</p>

                        <hr className='text-gray-200 my-4' />

                        <div
                            className={`text-sm leading-relaxed prose transition-all duration-300 overflow-hidden ${showFullDescription ? '' : 'line-clamp-6'
                                }`}
                            dangerouslySetInnerHTML={{ __html: productData.description }}
                        />

                        {!showFullDescription && (
                            <button
                                className="text-blue-600 mt-2 text-sm underline"
                                onClick={() => setShowFullDescription(true)}
                            >
                                See More
                            </button>
                        )}

                        {showFullDescription && (
                            <button
                                className="text-blue-600 mt-2 text-sm underline"
                                onClick={() => setShowFullDescription(false)}
                            >
                                See Less
                            </button>
                        )}

                        <p className='text-gray-400 font-light text-sm'>
                            AVAILABILITY:
                            <span className='uppercase ml-2 text-black font-semibold'>In Stock</span>
                        </p>
                        <p className='text-gray-400 font-light text-sm'>
                            SKU:
                            <span className='uppercase ml-2 text-black font-semibold'>654111995-1-1-2</span>
                        </p>
                        <hr className='text-gray-200 my-4' />

                        <div className='flex   gap-2 items-center'>
                            <div className='flex items-center gap-2 border border-gray-300 w-fit'>
                                <button className='border-r cursor-pointer border-gray-300 px-2 py-2'>-</button>
                                <p className='font-semibold'>0</p>
                                <button className='border-l cursor-pointer border-gray-300 px-2 py-2'>+</button>
                            </div>
                            
                            <Button badge={quantity} loading={loading} onClick={()=>addToCart(productData._id)} icon={<ShoppingBag />} label={` Add to cart`}/>
                            <button className='border cursor-pointer border-gray-200 p-2 rounded'>
                                <Heart size={18} />
                            </button>
                            <button className='border cursor-pointer border-gray-200 p-2 rounded'>
                                <ChartNoAxesColumnIncreasing size={18} />
                            </button>
                        </div>

                        <hr className='text-gray-200 my-4' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
