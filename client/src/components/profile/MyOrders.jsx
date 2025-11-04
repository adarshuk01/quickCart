import React, { useEffect, useState } from "react";
import Tabs from "../common/Tabs";
import Pagination from "../common/Pagination";
import { useOrders } from "../../context/OrderContext";

function MyOrders() {
  const { orders, loading, error, fetchOrders } = useOrders();
  const [selectedTab, setSelectedTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 7;
  const totalItems = orders.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, endIndex);

  useEffect(() => {
    fetchOrders();
  }, []);

  const tabs = [
    { id: "All", label: "All" },
    { id: "Processing", label: "Processing" },
    { id: "Delivered", label: "Delivered" },
    { id: "Cancelled", label: "Cancelled" },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-4 px-4">
      <Tabs tabs={tabs} onTabChange={setSelectedTab} />

      <div className="mt-6">
        {selectedTab === "All" && (
          <div>

            {/* ✅ Show loading or error inside tab */}
            {loading ? (
              <p className="text-center text-gray-600 mt-6">Loading orders...</p>
            ) : error ? (
              <p className="text-center text-red-500 mt-6">{error}</p>
            ) : orders.length > 0 ? (
              <>
                <ul className="space-y-3">
                  {paginatedOrders.map((order) => (
                    <li
                      key={order._id}
                      className="border p-3 rounded-lg shadow-sm bg-white"
                    >
                      <p className="font-medium">Order ID: {order._id}</p>
                      <p>Total Items: {order.items.length}</p>
                      <p>
                        Date: {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul>

                {/* ✅ Pagination inside the same area */}
                <Pagination
                  currentPage={currentPage}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <p className="text-gray-500 mt-4">No orders found.</p>
            )}
          </div>
        )}

        {/* You can later add content for other tabs */}
        {selectedTab === "Processing" && (
          <p className="text-gray-500 text-center mt-6">Processing orders...</p>
        )}
        {selectedTab === "Delivered" && (
          <p className="text-gray-500 text-center mt-6">Delivered orders...</p>
        )}
        {selectedTab === "Cancelled" && (
          <p className="text-gray-500 text-center mt-6">Cancelled orders...</p>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
