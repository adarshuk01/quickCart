import React, { useRef, useContext, useState, useEffect } from 'react';
import Button from '../../common/Button';
import ProductForm from './ProductForm';
import { ProductContext } from '../../context/ProductContext';
import { CategoryContext } from '../../context/CategoryContext';

function AddProduct({ onClose }) {
  const productFormRef = useRef();
  const { addProduct, updateProduct, productToEdit, setProductToEdit,fetchProducts } = useContext(ProductContext);
  const { categories, fetchCategory} = useContext(CategoryContext);

  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('');

  // Prefill category & subcategory when editing
  useEffect(() => {
    if (productToEdit) {
      setSelectedCategoryId(productToEdit?.category?._id || '');
      setSelectedSubcategoryId(productToEdit.subcategory || '');
    } else {
      setSelectedCategoryId('');
      setSelectedSubcategoryId('');
    }
  }, [productToEdit]);
  

  const handleSave = async () => {
    const formData = productFormRef.current.getFormData();
    const formPayload = new FormData();

    formPayload.append('name', formData.productName);
    formPayload.append('description', formData.productDescription);
    formPayload.append('price', formData.productPrice);
    formPayload.append('stock', formData.stock);
    formPayload.append('sizes', JSON.stringify(formData.selectedSizes));
    formPayload.append('weight', formData.weight);
    formPayload.append('country', formData.country);
    formPayload.append('tax', formData.isTaxApplied);
    formPayload.append('hasOptions', formData.hasOptions);
    formPayload.append('isDigitalItem', formData.isDigitalItem);

   formData.newImages.forEach((img) => {
  formPayload.append('images', img);
});

formPayload.append('existingImages', JSON.stringify(formData.existingImageUrls));


    formPayload.append('category', selectedCategoryId);
    formPayload.append('subcategory', selectedSubcategoryId);

    let result;
    if (productToEdit) {
      result = await updateProduct(productToEdit._id, formPayload);
    } else {
      result = await addProduct(formPayload);
    }

    if (result.success) {
      alert(productToEdit ? 'Product updated successfully!' : 'Product added successfully!');
      setProductToEdit(null);
      if (onClose) onClose();
    } else {
      alert('Error: ' + result.error);
    }

    fetchProducts()
  };

  console.log('selectedCategoryId',selectedCategoryId);
  console.log('selectedSubcategoryId',selectedSubcategoryId);
  
  

  const handleCancel = () => {
    setProductToEdit(null);
    if (onClose) onClose();
  };

  useEffect(()=>{
fetchCategory()
  },[])

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-[24px] font-bold'>{productToEdit ? 'Edit Product' : 'Add Product'}</h1>
        <div className='flex gap-2'>
          <Button label="Cancel" variant="outlined" onClick={handleCancel} />
          <Button label="Save" variant="filled" onClick={handleSave} />
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-6 gap-4'>
        <div className='col-span-4'>
          <ProductForm
            ref={productFormRef}
            initialData={productToEdit}
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
            selectedSubcategoryId={selectedSubcategoryId}
            setSelectedSubcategoryId={setSelectedSubcategoryId}
          />
        </div>

        <div className='col-span-2'>
          <div className='bg-white p-6 mt-2 rounded-2xl'>
            <h2 className='font-semibold text-lg mb-4'>Categories</h2>

            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-1'>
                <label className='text-sm text-gray-600'>Select Category</label>
                <select
                  className='border border-gray-300 p-2 rounded focus:outline-none'
                  value={selectedCategoryId}
                  onChange={(e) => {
                    setSelectedCategoryId(e.target.value);
                    setSelectedSubcategoryId('');
                  }}
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedCategoryId && (
                <div className='flex flex-col gap-1'>
                  <label className='text-sm text-gray-600'>Select Subcategory</label>
                  <select
                    className='border border-gray-300 p-2 rounded focus:outline-none'
                    value={selectedSubcategoryId}
                    onChange={(e) => setSelectedSubcategoryId(e.target.value)}
                  >
                    <option value="">-- Select Subcategory --</option>
                    {categories
                      .find((cat) => cat._id === selectedCategoryId)
                      ?.subcategories.map((sub) => (
                        <option key={sub._id} value={sub.name}>
                          {sub.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
