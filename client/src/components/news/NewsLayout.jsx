import React, { useState, useRef, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { newsData } from '../../assets/Data/newsData';
import { ChevronLeft } from 'lucide-react';

function NewsLayout() {
    const [showSidebar, setShowSidebar] = useState(false);
    const sidebarRef = useRef(null);

    // Close sidebar when clicked outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                setShowSidebar(false);
            }
        }

        if (showSidebar) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSidebar]);

    return (
        <div className='relative'>
            {/* Toggle button (only mobile) */}
            <button
                className='md:hidden bg-black text-white px-2 py-2 m-2 rounded absolute -right-6 top-5 z-50'
                onClick={() => setShowSidebar(!showSidebar)}
            >
                {showSidebar ? 'Close Menu' : <ChevronLeft />}
            </button>

            {/* Layout */}
            <div className='md:grid md:grid-cols-6 gap-5'>
                {/* Main content */}
                <div className='md:col-span-4'>
                    <Outlet />
                </div>

                {/* Sidebar - desktop only */}
                <div className='hidden md:block col-span-2 border border-gray-200 py-3 px-2'>
                    <div className='sticky top-15'>
                        <h1 className='font-medium uppercase mb-4'>Recent posts</h1>
                        <div className='flex flex-col gap-4'>
                            {newsData.slice(0, 6).map(items => (
                                <Link
                                    key={items.id}
                                    to={`/news/${items.id}`}
                                    className='flex gap-2 items-start'
                                >
                                    <img width={80} src={items.img} alt="" />
                                    <div className='flex gap-2 flex-col'>
                                        <p className='text-sm font-light'>{items.title}</p>
                                        <p className='text-xs font-light text-gray-600'>{items.date}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay & Sidebar - mobile only */}
            {showSidebar && (
                <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm lg:hidden" />
            )}
            <div
                ref={sidebarRef}
                className={`fixed top-0 right-0 h-full w-[80%] max-w-xs bg-white border-l border-gray-300 p-4 z-50 transform transition-transform duration-300 ease-in-out
                ${showSidebar ? 'translate-x-0' : 'translate-x-full'} md:hidden`}
            >
                <h1 className='font-medium uppercase mb-4'>Recent posts</h1>
                <div className='flex flex-col gap-4'>
                    {newsData.slice(0, 6).map(items => (
                        <Link
                            key={items.id}
                            to={`/news/${items.id}`}
                            className='flex gap-2 items-start'
                            onClick={() => setShowSidebar(false)}
                        >
                            <img width={80} src={items.img} alt="" />
                            <div className='flex gap-2 flex-col'>
                                <p className='text-sm font-light'>{items.title}</p>
                                <p className='text-xs font-light text-gray-600'>{items.date}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NewsLayout;
