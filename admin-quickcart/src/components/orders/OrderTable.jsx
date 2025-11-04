import React, { useContext, useState, useEffect } from "react";
import DataTable from "../../common/Table";
import { useOrders } from "../../context/OrderContext";
import { BsEye } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";
import { BiDownload } from "react-icons/bi";


const OrderTable = () => {
  const {
    orders,
    loading,
    deleteOrder,
    setOrderToEdit,
    searchAndFilter,
    filteredOrders,
  } = useOrders();

  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // ✅ Determine which orders to show (filtered or all)
  const dataToShow = filteredOrders?.length > 0 ? filteredOrders : orders;

  const totalPages = Math.ceil(dataToShow.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = dataToShow.slice(indexOfFirstOrder, indexOfLastOrder);

  // ✅ Handle row selection
  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // ✅ Select all rows in current page
  const handleSelectAll = () => {
    if (selectedRows.length === currentOrders.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentOrders.map((row) => row._id));
    }
  };

  // ✅ Handle search (by user name or order ID)
  const handleSearch = (value) => {
    if (value.trim() === "") {
      searchAndFilter("");
    } else {
      searchAndFilter(value);
    }
  };

  // ✅ Define table columns based on Order model
  const columns = [
    {
      key: "orderId",
      title: "Order ID",
      render: (_, row) => (
        <span className="text-gray-700 text-sm">{row._id.slice(-8)}</span>
      ),
    },
    {
      key: "user",
      title: "Customer",
      render: (_, row) => (
        <div>
          <div className="font-medium text-gray-800">
            {row.user?.firstName
              ? `${row.user.firstName} ${row.user.lastName || ""}`
              : "—"}
          </div>
          <div className="text-gray-500 text-xs">
            {row.shippingAddress?.city}, {row.shippingAddress?.country}
          </div>
        </div>
      ),
    },
    {
      key: "items",
      title: "Items",
      render: (_, row) => (
        <span>{row.items?.length ? row.items.length : 0}</span>
      ),
    },
    {
      key: "totalAmount",
      title: "Amount",
      render: (value) => `₹${value}`,
    },
    {
      key: "paymentMethod",
      title: "Payment",
      render: (value, row) => (
        <span
          className={`text-xs px-2 py-1 rounded ${
            row.paymentStatus === "paid"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {value.toUpperCase()} ({row.paymentStatus})
        </span>
      ),
    },
    {
      key: "status",
      title: "Order Status",
      render: (value) => {
        let color = "bg-gray-100 text-gray-700";
        if (value === "shipped") color = "bg-blue-100 text-blue-600";
        else if (value === "delivered") color = "bg-green-100 text-green-600";
        else if (value === "cancelled") color = "bg-red-100 text-red-600";

        return (
          <span className={`text-xs px-2 py-1 rounded ${color}`}>
            {value.toUpperCase()}
          </span>
        );
      },
    },
    {
      key: "createdAt",
      title: "Date",
      render: (_, row) =>
        new Date(row.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
    {
      key: "actions",
      title: "Actions",
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOrderToEdit(row)}
            className="bg-blue-500 flex gap-2 items-center text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            <BsEye size={20}/> 
          </button>
          <button
            onClick={() => deleteOrder(row._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            <TbTrash size={20}/>
          </button>
          <button
            onClick={() => deleteOrder(row._id)}
            className="bg-gray-300 text-white px-3 py-1 rounded hover:bg-gray-400"
          >
            <BiDownload size={20}/>
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {dataToShow.length !== 0 && (
        <DataTable
          columns={columns}
          data={currentOrders}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          onSelectAll={handleSelectAll}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          loading={loading}
          onSearch={handleSearch}
        />
      )}
    </>
  );
};

export default OrderTable;
