// FeatureSection.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faSlidersH, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const features = [
  {
    title: 'CUSTOMER SUPPORT',
    subtitle: "You Won't Be Alone",
    description:
      'We really care about you and your website as much as you do. Purchasing Porto or any other theme from us you get 100% free support.',
    icon: faHeadphones,
  },
  {
    title: 'FULLY CUSTOMIZABLE',
    subtitle: 'Tons Of Options',
    description:
      'With Porto you can customize the layout, colors and styles within only a few minutes. Start creating an amazing website right now!',
    icon: faSlidersH,
  },
  {
    title: 'POWERFUL ADMIN',
    subtitle: 'Made To Help You',
    description:
      'Porto has very powerful admin features to help customer to build their own shop in minutes without any special skills in web development.',
    icon: faArrowLeft,
  },
];

export default function FeatureSection() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 rounded-full  bg-white shadow-sm flex items-center justify-center">
              <FontAwesomeIcon icon={feature.icon} className="text-blue-500 text-3xl" />
            </div>
            <h3 className="text-lg font-bold">{feature.title}</h3>
            <h4 className="text-sm font-medium text-gray-600">{feature.subtitle}</h4>
            <p className="text-sm text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
