import React, { useState, useContext, useEffect } from 'react';
import Header from '../components/Product/Header';
import ProductTable from '../components/Product/ProductTable';
import AddProduct from '../components/Product/AddProduct';
import Button from '../common/Button';
import { FaFileExport } from 'react-icons/fa';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { ProductContext } from '../context/ProductContext';

function Products() {
  const [show, setShow] = useState(false);
  const { productToEdit, setProductToEdit,products } = useContext(ProductContext);

  // Automatically show AddProduct if editing
  useEffect(() => {
    if (productToEdit) {
      setShow(true);
    }
  }, [productToEdit]);

  const handleAddProductClick = () => {
    setProductToEdit(null); // Clear previous edited data
    setShow(true);          // Show AddProduct form
  };

  return (
    <>
      {!show ? (
        <div className='space-y-2'>
          <div>
            <div className='flex justify-between items-center flex-wrap gap-4'>
              <h1 className='text-[24px] font-bold'>Products</h1>
              
              <div className='flex gap-2'>
                <Button
                  label="Export"
                  icon={FaFileExport}
                  variant="outlined"
                  onClick={() => console.log('Export clicked')}
                />
                <Button
                  label="Add Product"
                  icon={FiPlus}
                  variant="filled"
                  onClick={handleAddProductClick}
                />
              </div>

            </div>
            {products.length==0&& <div className='max-w-xl mt-12 mx-auto text-center flex flex-col justify-center items-center gap-2'>
              <img src="public/images/illustration.png" alt="" />
              <h3 className='font-bold text-xl'>Add Products</h3>
              <p>Start making sales by adding your products. <br />
                You can import and manage your products at any time.</p>
              <Button onClick={handleAddProductClick} icon={FiPlus} label={'Add Product'} />
              <a className='text-blue-600' href="">Read More</a>
            </div>}
           

          </div>
          <ProductTable />
        </div>
      ) : (
        <>
          <button onClick={() => { setShow(false), setProductToEdit(null) }} className='flex gap-2 items-center cursor-pointer mb-2'>
            <FiArrowLeft /> Back
          </button>
          <AddProduct onClose={() => setShow(false)} />
        </>
      )}
    </>
  );
}

export default Products;
