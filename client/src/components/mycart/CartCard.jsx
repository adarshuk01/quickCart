import { Heart, X } from "lucide-react";
import React from "react";

function CartCard({ item, onRemove, onUpdateQty }) {
  const maxQty = Math.min(item.product.stock, 10); // limit to stock but max 10

  const handleIncrease = () => {
    if (item.quantity < maxQty) {
      onUpdateQty(item.product._id, item.quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQty(item.product._id, item.quantity - 1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 border rounded-xl p-4  transition bg-white">
      {/* Left Side: Image + Info */}
      <div className="flex gap-4 items-start">
        <img
          className="rounded-lg h-[90px] w-[90px] object-cover border"
          src={item.product?.images?.[0] || "https://via.placeholder.com/150"}
          alt={item.product.name}
        />
        <div>
          <h1 className="text-base font-semibold text-gray-800 line-clamp-1 uppercase">
            {item.product.name}
          </h1>
          <p className="text-sm text-gray-500">
            Size: <span className="text-gray-700">{item.product.size || "N/A"}</span>
          </p>
          <p className="text-sm text-gray-500">
            Material:{" "}
            <span className="text-gray-700">{item.product.material || "N/A"}</span>
          </p>
          <p className="text-sm text-gray-500">
            Color:{" "}
            <span className="text-gray-700">{item.product.color || "N/A"}</span>
          </p>
        </div>
      </div>

      {/* Right Side: Price, Qty, Actions */}
      <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-3 w-full md:w-auto">
        {/* Price */}
        <p className="text-lg font-semibold text-gray-900">
          ${item.product.price.toFixed(2)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="px-4 font-medium text-gray-700">
              {item.quantity}
            </span>
            <button
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
              onClick={handleIncrease}
              disabled={item.quantity >= maxQty}
            >
              +
            </button>
          </div>

          {/* Wishlist + Remove */}
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <Heart size={18} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => onRemove(item.product._id)}
            className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-red-500 transition"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
