import React, { useState } from "react";
import {
  ShoppingBag,
  CreditCard,
  Settings,
  Heart,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import MyOrders from "../components/profile/MyOrders";
import AccountSettings from "../components/profile/AccountSettings";
import Payments from "../components/profile/Payments";

function Profile() {
  const [activeTab, setActiveTab] = useState("orders");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Clear auth token
    navigate("/login"); // ✅ Redirect to login
  };

  const menuItems = [
    { id: "orders", label: "My Orders", icon: <ShoppingBag size={18} /> },
    { id: "settings", label: "Account Settings", icon: <Settings size={18} /> },
    { id: "payments", label: "Payments", icon: <CreditCard size={18} /> },
    { id: "mystuff", label: "My Stuff", icon: <Heart size={18} /> },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "orders":
        return <MyOrders />;
      case "settings":
        return <AccountSettings />;
      case "payments":
        return <Payments />;
      default:
        return <div className="text-gray-500">Coming Soon...</div>;
    }
  };

  return (
    <div className="bg-gray-100 p-4 md:p-8 flex flex-col md:flex-row gap-4">
      {/* LEFT SIDEBAR */}
      <div className="bg-white h-fit shadow-md rounded-2xl p-4 md:w-1/4 w-full space-y-4">
        {/* Profile Header */}
        <div className="flex items-center gap-3 border-b pb-3">
          <img
            src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
            alt="profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-gray-600 text-sm">Hello,</h3>
            <p className="font-semibold text-lg">Adarsh</p>
          </div>
        </div>

        {/* Menu Links */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 w-full text-left px-4 py-4 rounded-lg transition-all duration-200 uppercase text-sm font-medium ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}

          {/* ✅ Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-left px-4 py-4 rounded-lg transition-all duration-200 uppercase text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </div>

      {/* RIGHT CONTENT */}
      <div className="bg-white shadow-md rounded-2xl py-4 px-2 flex-1">
        {renderActiveComponent()}
      </div>
    </div>
  );
}

export default Profile;
