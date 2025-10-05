import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiList,
  FiBox,
  FiFolder,
  FiUsers,
  FiBarChart2,
  FiStar,
  FiMessageSquare,
  FiHelpCircle,
  FiAward,
  FiUser,
  FiSettings,
  FiPercent,
} from 'react-icons/fi';

function Sidebar() {
  const location = useLocation();

  const sidebarData = [
    {
      section: null,
      items: [
        { label: 'Dashboard', icon: FiHome, path: '/' },
        { label: 'Orders', icon: FiList, badge: '16', path: '/orders' },
        { label: 'Products', icon: FiBox, path: '/products' },
        { label: 'Categories', icon: FiFolder, path: '/categories' },
        { label: 'Customers', icon: FiUsers, path: '/customers' },
        { label: 'Reports', icon: FiBarChart2, path: '/reports' },
        { label: 'Discounts', icon: FiPercent, path: '/coupons' },
        { label: 'Inbox', icon: FiMessageSquare, path: '/inbox' },
      ],
    },
    {
      section: 'Other Information',
      items: [
        { label: 'Knowledge Base', icon: FiHelpCircle, path: '/knowledge-base' },
        { label: 'Product Updates', icon: FiAward, path: '/product-updates' },
      ],
    },
    {
      section: 'Settings',
      items: [
        { label: 'Personal Settings', icon: FiUser, path: '/personal-settings' },
        { label: 'Global Settings', icon: FiSettings, path: '/global-settings' },
      ],
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-[#1D2450] text-white flex flex-col justify-between py-4 px-3">
      {/* Menu Section */}
      <div className="space-y-6">
        {sidebarData.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.section && (
              <div className="text-sm text-gray-400 mb-1">{section.section}</div>
            )}
            <div className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <SidebarItem
                  key={itemIndex}
                  icon={<item.icon />}
                  label={item.label}
                  badge={item.badge}
                  path={item.path}
                  active={location.pathname === item.path}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Box */}
      <div className="bg-blue-600 rounded-xl p-4 text-white space-y-2 mt-6">
        <h3 className="font-semibold text-sm">Grow Business</h3>
        <p className="text-xs text-blue-100">Explore our marketing solutions</p>
        <button className="mt-2 text-sm px-3 py-1 bg-blue-200 text-blue-700 rounded-md hover:bg-blue-100">
          Read More
        </button>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, badge, path, active }) {
  return (
    <NavLink to={path} className="block">
      <div
        className={`flex items-center justify-between rounded-md px-3 py-2 cursor-pointer transition-colors ${
          active ? 'bg-white text-[#1D2450]' : 'hover:bg-white/10'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <span className="text-sm">{label}</span>
        </div>
        {badge && (
          <span className="text-xs font-semibold bg-white text-[#1D2450] rounded-full px-2 py-0.5">
            {badge}
          </span>
        )}
      </div>
    </NavLink>
  );
}

export default Sidebar;
