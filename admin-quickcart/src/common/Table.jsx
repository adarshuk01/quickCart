import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const DataTable = ({
  columns,
  data,
  selectedRows,
  onRowSelect,
  onSelectAll,
  currentPage,
  totalPages,
  onPageChange,
  loading,
  onSearch // <-- added prop
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch && onSearch(value); // call search on change
  };

  return (
    <div className="p-4 bg-white shadow rounded-md overflow-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <select className="border p-2 text-sm rounded">
            <option>Filter</option>
          </select>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border p-2 text-sm rounded w-64"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded"><FiEdit /></button>
          <button className="p-2 hover:bg-gray-100 rounded text-red-500"><FiTrash2 /></button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-gray-500 border-b border-gray-300">
            <th className="px-4 py-3">
              <input
                type="checkbox"
                checked={selectedRows.length === data.length && data.length > 0}
                onChange={onSelectAll}
                className="w-4 h-4 rounded"
              />
            </th>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-medium">{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {loading ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4">
                Loading products...
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} className="border-b border-gray-300 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id || row._id)}
                    onChange={() => onRowSelect(row.id || row._id)}
                    className="w-4 h-4 rounded"
                  />
                </td>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
        <div>{data.length} Results</div>
        <div className="flex items-center space-x-1">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            ←
          </button>
          {currentPage > 2 && (
            <>
              <button onClick={() => onPageChange(1)} className="px-3 py-1 rounded hover:bg-gray-100">1</button>
              {currentPage > 3 && <span className="px-2">...</span>}
            </>
          )}
          {[currentPage - 1, currentPage, currentPage + 1].map(
            (page) =>
              page > 0 &&
              page <= totalPages && (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-1 rounded ${page === currentPage ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'}`}
                >
                  {page}
                </button>
              )
          )}
          {currentPage < totalPages - 1 && (
            <>
              {currentPage < totalPages - 2 && <span className="px-2">...</span>}
              <button onClick={() => onPageChange(totalPages)} className="px-3 py-1 rounded hover:bg-gray-100">
                {totalPages}
              </button>
            </>
          )}
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
