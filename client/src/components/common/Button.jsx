import React from "react";
import Loader from "./Loader";

function Button({ label, onClick, disabled, loading, icon, badge }) {
  return (
    <div className="relative inline-block w-full">
      {/* Badge (Cart quantity, notifications, etc.) */}
      {badge > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
          {badge}
        </span>
      )}

      <button
        disabled={disabled || loading}
        onClick={onClick}
        className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition font-medium
          ${
            disabled || loading
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }
        `}
      >
        {loading ? <Loader /> : icon}
        <span>{label}</span>
      </button>
    </div>
  );
}

export default Button;
