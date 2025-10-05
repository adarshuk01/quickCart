import React from 'react';
import { FiSearch, FiMessageSquare, FiBell, FiChevronDown, FiMenu } from 'react-icons/fi';

function Navbar({ toggleSidebar }) {
  return (
    <div className="w-full h-16 bg-[#121735] flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-5">
        <div className='flex  items-center'>
        {/* Sidebar Toggle - Only on Mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden  text-white p-2 rounded hover:bg-[#1c2248]"
        >
          <FiMenu size={22} />
        </button>

        <h1 className="text-white lg:text-2xl font-bold">QuickCart</h1>
        </div>

        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 border border-white p-2 rounded text-gray-400">
          <FiSearch className="text-lg" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm placeholder-gray-400 text-white"
          />
        </div>
      </div>

      {/* Right: Icons and Profile */}
      <div className="flex items-center gap-4">
        <FiMessageSquare className="text-white text-xl cursor-pointer" />

        <div className="relative">
          <FiBell className="text-white text-xl cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            5
          </span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
            A
          </div>
          <span className="text-white text-sm">Admin</span>
          <FiChevronDown className="text-white text-sm" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
