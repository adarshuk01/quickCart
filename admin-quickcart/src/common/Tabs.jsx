import React, { useState } from "react";

const Tabs = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (id) => {
    setActiveTab(id);
    onTabChange(id);
  };

  return (
    <div className="w-full border-b border-gray-300 flex flex-wrap justify-start">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`px-4 py-2 text-sm font-medium transition-colors duration-200
            ${
              activeTab === tab.id
                ? "text-blue-700 border-b-2 border-blue-700"
                : "text-gray-500 hover:text-blue-600"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
