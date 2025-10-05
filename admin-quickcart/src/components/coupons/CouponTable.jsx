import React, { useContext, useEffect, useState } from 'react';
import DataTable from '../../common/Table';
import { DiscountContext } from '../../context/DiscountContext';
import ToggleSwitch from '../../common/ToggleSwitch';

function CouponTable({ onEdit }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const { discounts, fetchDiscounts, handleToggle, deleteDiscount } = useContext(DiscountContext);

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      deleteDiscount(id);
    }
  };

  const paginatedData = discounts.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(discounts.length / pageSize);

  const columns = [
    {
      key: 'name',
      title: 'Discount Name',
      render: (value, row) => (
        <div>
          <div className="font-medium text-sm">{row.title}</div>
          <div className="text-gray-500 text-xs">{row._id}</div>
        </div>
      ),
    },
    {
      key: 'products',
      title: 'Products',
      render: (value) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            value?.length > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
          }`}
        >
          {value?.length || 0}
        </span>
      ),
    },
    {
      key: 'isActive',
      title: 'Status',
      render: (value, row) => (
        <ToggleSwitch enabled={value} onToggle={() => handleToggle(row._id, !value)} />
      ),
    },
    { key: 'startDate', title: 'From' },
    { key: 'endDate', title: 'To' },
    {
      key: 'action',
      title: 'Action',
      render: (value, row) => (
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(row._id)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const pageIds = paginatedData.map((row) => row._id);
    const allSelected = pageIds.every((id) => selectedRows.includes(id));

    setSelectedRows((prev) =>
      allSelected
        ? prev.filter((id) => !pageIds.includes(id))
        : [...prev, ...pageIds.filter((id) => !prev.includes(id))]
    );
  };

  return (
    <DataTable
      columns={columns}
      data={paginatedData}
      selectedRows={selectedRows}
      onRowSelect={handleRowSelect}
      onSelectAll={handleSelectAll}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}

export default CouponTable;
