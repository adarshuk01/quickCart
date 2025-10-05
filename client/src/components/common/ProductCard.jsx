import {
  Heart,
  ShoppingBag,
  ChartNoAxesColumnIncreasing,
  Eye,
} from "lucide-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import CompareModal from "./CompareModal";
import { ProductContext } from "../../context/ProductContext";
import { CartContext } from "../../context/CartContext";
import StarRating from "./StarRating";
import Loader from "./Loader";

function ProductCard({ productData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [compareModal, setCompareModal] = useState(false);
  const { compareProducts } = useContext(ProductContext);
const { addToCart, cart, isProductLoading } = useContext(CartContext);

const loading = isProductLoading(productData._id); // check for this product only

  const cartItem = cart?.items?.find(
    (item) => item.product._id === productData._id
  );
  const quantity = cartItem ? cartItem.quantity : 0;

  const isOutOfStock = productData.stock === 0;

  return (
    <>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} productData={productData} />
      )}
      {compareModal && <CompareModal onClose={() => setCompareModal(false)} />}

      <div key={productData._id} className="group relative bg-white rounded-2xl  transition p-2 flex flex-col">
        {/* Image Section */}
        <div className="relative w-full h-[180px] lg:h-[250px] flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
          <Link to={`/product/${productData._id}`} className="block w-full lg:h-full">
            <img
              src={productData?.img || productData?.images?.[0] || ""}
              alt={productData?.name || ""}
              className="lg:h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
              <span className="text-white text-sm font-medium bg-red-600 px-3 py-1 rounded">
                Out of Stock
              </span>
            </div>
          )}

          {/* Hover Action Icons */}
         <div
  className="
    absolute top-3 right-3 flex flex-col gap-2 
    opacity-100 md:opacity-0 md:group-hover:opacity-100 
    transition
  "
>
  <button
    className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
    onClick={() => setIsModalOpen(true)}
  >
    <Eye size={18} />
  </button>
  <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
    <Heart size={18} />
  </button>
  <button
    onClick={() => {
      setCompareModal(true);
      compareProducts(productData._id);
    }}
    className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
  >
    <ChartNoAxesColumnIncreasing size={18} />
  </button>
   </div>

        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-1 mt-3 text-center">
          <Link
            to={`/product/${productData._id}`}
            className="text-gray-700 font-medium text-base line-clamp-1 capitalize hover:text-[#0371a8]"
          >
            {productData?.name || ""}
          </Link>
          {/* <span className="text-xs text-gray-400 uppercase tracking-wide">
            {productData.subcategory}
          </span> */}

          {/* Pricing */}
          {productData?.discountedPrice ? (
            <div className="flex justify-center items-center gap-2">
              <p className="text-gray-400 line-through text-sm">
                ₹{productData.price}
              </p>
              <p className="text-red-600 font-semibold text-lg">
                ₹{productData.discountedPrice}
              </p>
            </div>
          ) : (
            <p className="text-gray-700 font-semibold text-lg">
              ₹{productData.price}
            </p>
          )}

          {/* Rating */}
          <StarRating rating={productData?.rating || 0} />
        </div>

        {/* Add to Cart */}
        <div className="mt-3 relative">
          <button
            disabled={isOutOfStock}
            onClick={() => addToCart(productData._id)}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg transition font-medium
              ${
                isOutOfStock||loading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }
            `}
          >
           {loading?<Loader/>:<ShoppingBag size={18} />} 
            <span className="">
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </span>
          </button>

          {/* Cart Badge */}
          {quantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
              {quantity}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductCard;
