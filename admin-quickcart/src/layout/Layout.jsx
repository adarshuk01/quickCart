import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Closed by default on mobile
  const sidebarRef = useRef(null);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  // Close sidebar when clicking outside (only on mobile)
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth < 768 // Only apply for mobile
      ) {
        setIsSidebarOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close sidebar on route change (only on mobile)
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  return (
    <div className="flex flex-col lg:h-screen overflow-hidden">
      {/* Top Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`bg-gray-800 text-white overflow-y-auto transition-all duration-300
            fixed md:static top-16 left-0 h-full z-50
            ${isSidebarOpen ? 'w-' : ''}
            ${isSidebarOpen || window.innerWidth >= 768 ? 'block' : 'hidden'}
          `}
        >
          <Sidebar />
        </div>

        {/* Overlay (mobile only) */}
        {isSidebarOpen && window.innerWidth < 768 && (
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Page Content */}
        <div className="flex-1 bg-[#F5F6FA] p-4 overflow-scroll lg:p-6 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
