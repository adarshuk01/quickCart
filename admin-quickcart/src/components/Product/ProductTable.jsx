import React, { useContext, useState } from 'react';
import { ProductContext } from '../../context/ProductContext';
import DataTable from '../../common/Table';

const ProductTable = () => {
  const { products, filteredProduct, searchAndFilter, deleteProduct, loading, setProductToEdit, productToEdit } =
    useContext(ProductContext);

  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 5;

  // Decide which data to display: searched results or all products
  const dataToShow = filteredProduct.length > 0 ? filteredProduct : products;

  const totalPages = Math.ceil(dataToShow.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = dataToShow.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === currentProducts.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentProducts.map((row) => row._id));
    }
  };

  const handleSearch = (name) => {
    if (name.trim() === '') {
      // if search is empty, reset to all products
      searchAndFilter('');
    } else {
      searchAndFilter(name);
    }
  };

  const columns = [
    {
      key: 'product',
      title: 'Product',
      render: (_, row) => (
        <div className="flex w-[310px] lg:max-w-sm items-center gap-3">
          <img
            src={row.images?.[0] || ''}
            alt="product"
            className="h-12 w-12 object-cover rounded"
          />
          <div>
            <div className="font-medium text-gray-800">{row.name}</div>
            <div className="text-gray-500 text-xs">{row.category?.name || '—'}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'stock',
      title: 'Inventory',
      render: (_, row) =>
        row.stock === 0 ? (
          <span className="text-xs px-2 py-1 text-nowrap bg-gray-100 text-gray-500 rounded">
            Out of Stock
          </span>
        ) : (
          `${row.stock} in stock`
        ),
    },
    {
      key: 'price',
      title: 'Price',
      render: (value) => `₹${value}`,
    },
    {
      key: 'discountedPrice',
      title: 'Discount',
      render: (value) => (value ? `₹${value}` : '-'),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setProductToEdit(row)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => deleteProduct(row._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
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
          data={currentProducts}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          onSelectAll={handleSelectAll}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          loading={loading}
          onSearch={handleSearch} // pass search handler
        />
      )}
    </>
  );
};

export default ProductTable;
