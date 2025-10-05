import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { useParams } from "react-router-dom";
import { ChartNoAxesColumnIncreasing, ChevronLeft, ChevronRight, Heart, ShoppingBag } from "lucide-react";
import { CartContext } from "../context/CartContext";
import Button from "../components/common/Button";


function ProductDetails() {
  const { id } = useParams();
  const { fetchProductsbyid, singleProduct } = useContext(ProductContext);
  const { addToCart, cart, isProductLoading } = useContext(CartContext);
      const loading = isProductLoading(singleProduct._id); // check for this product only
  
      const cartItem = cart?.items?.find(
      (item) => item.product._id === singleProduct._id
    );
    const quantity = cartItem ? cartItem.quantity : 0;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchProductsbyid(id);
  }, [id]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? singleProduct.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === singleProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Left Section - Image Gallery */}
        <div className="  lg:col-span-3">
          <div className="relative w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
            {singleProduct.images && singleProduct.images.length > 0 && (
              <img
                src={singleProduct.images[currentIndex]}
                alt="product"
                className="max-h-full object-contain"
              />
            )}

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-2 bg-white shadow-md p-2 rounded-full"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 bg-white shadow-md p-2 rounded-full"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-3 mt-4">
            {singleProduct.images &&
              singleProduct.images.map((img, index) => (
                <div
                  key={index}
                  className={`border rounded-lg cursor-pointer p-1 ${index === currentIndex
                    ? "border-blue-500"
                    : "border-gray-200"
                    }`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <img
                    src={img}
                    alt="thumbnail"
                    className="w-20 h-20 object-contain"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Right Section - Product Info */}
        <div className=" lg:col-span-4">
          <h1 className="text-3xl capitalize font-bold">
            {singleProduct.name}
          </h1>

          <hr className='text-gray-200 my-4' />

          {singleProduct?.discountedPrice ? (
            <div className="flex items-center  gap-2">
              <p className="text-gray-500 line-through text-xl "><span className="text-lg">₹</span>{singleProduct.price}.00</p>
              <p className="text-red-600 font-semibold text-3xl"><span className="text-lg">₹</span>{singleProduct.discountedPrice}.00</p>
            </div>
          ) : (
            <p className=" font-semibold text-3xl text-gray-600"> <span className="text-lg">₹</span>{singleProduct.price}.00</p>
          )}


          <div
            className="text-sm leading-relaxed mt-3 transition-all duration-300 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal"
            dangerouslySetInnerHTML={{ __html: singleProduct.description }}
          />
          <div className="space-y-2 my-2">
            <p className=""> <b>SKU:</b>  <span className="font-light">474765534</span></p>
            <p className=""> <b>CATEGORY:</b>  <span className="font-light capitalize">{singleProduct.category?.name}</span></p>
            <p className=""> <b>TAGS:</b>  <span className="font-light">CLOTHES, SWEATER</span></p>
          </div>


          <hr className='text-gray-200 my-4' />

          <div className='flex   gap-2 items-center'>
            <div className='flex items-center gap-2 border border-gray-300 w-fit'>
              <button className='border-r cursor-pointer border-gray-300 px-2 py-2'>-</button>
              <p className='font-semibold'>0</p>
              <button className='border-l cursor-pointer border-gray-300 px-2 py-2'>+</button>
            </div>
            <div className="w-40">
                    <Button badge={quantity} loading={loading} onClick={()=>addToCart(singleProduct._id)} icon={<ShoppingBag />} label={` Add to cart`}/>

            </div>

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
  );
}

export default ProductDetails;
