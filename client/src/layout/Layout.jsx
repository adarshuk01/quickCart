import React, { useState } from 'react';
import SidebarMenu from '../components/header/SidebarMenu';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import MobileNavbar from './MobileNavbar';

function Layout() {
  const [show, setShow] = useState(false);

  return (
    <div className="relative min-h-screen ">
      {/* Header (always visible) */}
      <Header toogleshow={() => setShow((prev) => !prev)} />

      {/* Sidebar - only visible on mobile */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 bg-opacity-50 transition-opacity duration-300 ${
          show ? 'opacity-100 visible' : 'opacity-0 invisible'
        } lg:hidden`}
        onClick={() => setShow(false)}
      />

      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 shadow-lg transform transition-transform duration-300 lg:hidden ${
          show ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarMenu />
      </div>

      {/* Main Content */}
      <div className=" pb-5 px-2 lg:px-10 py-4 ">
       
        {/* More content here */}
        <Outlet/>
        
      </div>

      <Footer/>
      <MobileNavbar/>
    </div>
  );
}

export default Layout;
