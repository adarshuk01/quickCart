import React, { useState, useContext } from 'react';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import { IoClose } from 'react-icons/io5';
import { CategoryContext } from '../../context/CategoryContext';

function AddModal({ onClose }) {
  const { addCategory } = useContext(CategoryContext);
  const [categoryName, setCategoryName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!categoryName || !imageFile) {
      alert('Please enter a category name and select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', categoryName);
    formData.append('image', imageFile);

    await addCategory(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          <IoClose size={20} />
        </button>


        <InputField
          label="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        {/* Custom File Input */}
        <div className="mt-4">
          <label className="block mb-1 font-medium text-gray-700">Category Image</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer px-4 py-2 border border-gray-300 text-gray-500 rounded-lg   transition duration-200">
              Choose Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {imageFile && (
              <span className="text-sm text-gray-600">{imageFile.name}</span>
            )}
          </div>

          {/* Image Preview */}
          {previewUrl && (
            <div className="mt-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-md border"
              />
            </div>
          )}
        </div>

        <div className="mt-6">
          <Button label="Save" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default AddModal;
