import React from 'react';
import { FiChevronUp, FiChevronDown, FiDollarSign } from 'react-icons/fi';
import { FaShoppingCart, FaUsers, FaUserPlus, FaUserCheck } from 'react-icons/fa';
import CountUp from 'react-countup';

function StatsCards() {
    const statsData = [
        {
            title: "Total Revenue",
            value: 10540,
            prefix: "$",
            change: "22.45%",
            icon: <FiDollarSign />,
            iconBg: "bg-blue-200"
        },
        {
            title: "Orders",
            value: 1240,
            change: "12.80%",
            icon: <FaShoppingCart />,
            iconBg: "bg-yellow-200"
        },
        {
            title: "Unique Visits",
            value: 8400,
            change: "9.15%",
            icon: <FaUsers />,
            iconBg: "bg-purple-200"
        },
        {
            title: "New Users",
            value: 3210,
            change: "5.42%",
            icon: <FaUserPlus />,
            iconBg: "bg-green-200"
        },
        {
            title: "Existing Users",
            value: 5900,
            change: "-2.10%",
            icon: <FaUserCheck />,
            iconBg: "bg-red-200"
        }
    ];

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5  gap-4'>
            {statsData.map((stat, index) => {
                const isNegative = stat.change.startsWith('-');
                const textColor = isNegative ? 'text-red-500' : 'text-green-500';
                const ArrowIcon = isNegative ? FiChevronDown : FiChevronUp;

                return (
                    <div 
                        key={index} 
                        className='flex items-center  justify-between shadow-sm rounded-2xl px-6 py-2 bg-white'
                    >
                        <div>
                            <h3 className='font-extrabold text-2xl'>
                                <CountUp
                                    start={0}
                                    end={stat.value}
                                    duration={2}
                                    separator=","
                                    prefix={stat.prefix || ""}
                                />
                            </h3>
                            <p className='text-gray-600 font-light'>{stat.title}</p>
                            <p className={`flex items-center gap-2 ${textColor}`}>
                                {stat.change} <ArrowIcon />
                            </p>
                        </div>
                        <div>
                            <p className={`${stat.iconBg} p-4 rounded-full text-xl`}>
                                {stat.icon}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default StatsCards;
