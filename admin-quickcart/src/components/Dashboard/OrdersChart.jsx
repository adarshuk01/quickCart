import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  { time: '4am', may21: 25, may22: 12 },
  { time: '5am', may21: 15, may22: 8 },
  { time: '6am', may21: 12, may22: 10 },
  { time: '7am', may21: 22, may22: 25 },
  { time: '8am', may21: 28, may22: 34 },
  { time: '9am', may21: 30, may22: 30 },
  { time: '10am', may21: 25, may22: 35 },
  { time: '11am', may21: 15, may22: 50 },
  { time: '12pm', may21: 20, may22: 45 },
  { time: '1pm', may21: 30, may22: 22 },
  { time: '2pm', may21: 35, may22: 28 },
  { time: '3pm', may21: 48, may22: 32 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white px-3 py-2 rounded shadow">
        <p className="font-semibold">{`${payload[1].value} Orders`}</p>
        <p>{`May 22, ${label}`}</p>
      </div>
    );
  }
  return null;
};

function OrdersChart() {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">Orders Over Time</h2>
          <div className="flex gap-8 mt-2">
            <div>
              <p className="text-2xl font-bold">645</p>
              <p className="text-gray-500 text-sm">Orders on May 22</p>
            </div>
            <div>
              <p className="text-2xl font-bold">472</p>
              <p className="text-gray-500 text-sm">Orders on May 21</p>
            </div>
          </div>
        </div>
        <p className="text-gray-500 text-sm">Last 12 Hours ▼</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart  data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="time" />
          <YAxis domain={[0, 50]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) =>
              value === 'may21' ? 'May 21' : 'May 22'
            }
          />
          <Line
            type="monotone"
            dataKey="may21"
            stroke="#CBD5E1"
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="may22"
            stroke="#2563EB"
            strokeWidth={3}
            dot={{ r: 5, strokeWidth: 2, fill: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OrdersChart;
