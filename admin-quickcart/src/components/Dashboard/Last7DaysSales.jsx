import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { day: 12, revenue: 1500 },
  { day: 13, revenue: 2200 },
  { day: 14, revenue: 1800 },
  { day: 15, revenue: 2525 },
  { day: 16, revenue: 3000 },
  { day: 17, revenue: 3200 },
  { day: 18, revenue: 2800 }
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white px-3 py-1 rounded shadow">
        ${payload[0].value.toLocaleString()}
      </div>
    );
  }
  return null;
};

function Last7DaysSales() {
  return (
    <div className="bg-white p-5 rounded-lg shadow w-full">
      <h3 className="font-semibold text-sm mb-4">Last 7 Days Sales</h3>
      <div>
        <p className="text-2xl font-bold">1,259</p>
        <p className="text-gray-500 text-sm mb-2">Items Sold</p>
        <p className="text-2xl font-bold">$12,546</p>
        <p className="text-gray-500 text-sm mb-4">Revenue</p>
      </div>
      <hr className="my-3 text-gray-200" />
      <ResponsiveContainer width="100%" height={150}>
        <BarChart data={data}>
          <XAxis dataKey="day" axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
          <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Last7DaysSales;
