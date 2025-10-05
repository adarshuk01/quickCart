import React, { useContext, useEffect, useState, useRef } from 'react';
import Button from '../common/Button';
import { FaFileExport } from 'react-icons/fa';
import { FiArrowLeft, FiCheck, FiDelete, FiEdit, FiPlus, FiTrash } from 'react-icons/fi';
import AddModal from '../components/Categories/AddModal';
import { CategoryContext } from '../context/CategoryContext';

function Categories() {
  const {
    fetchCategory,
    categories,
    singleCategories,
    fetchCategorybyid,
    addSubcategory,
    editSubcategory,
    deleteSubcategory,
    editCategory,
    deleteCategory
  } = useContext(CategoryContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [show, setShow] = useState(true);

  const [editingSubId, setEditingSubId] = useState(null);
  const [subcategoriesState, setSubcategoriesState] = useState([]);
  const [newSubName, setNewSubName] = useState('');
  const [addingSub, setAddingSub] = useState(false);

  const [editName, setEditName] = useState('');
  const [newImageFile, setNewImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const imageInputRef = useRef();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    if (singleCategories) {
      setEditName(singleCategories.name);
      setPreviewUrl(singleCategories.image);
      if (singleCategories?.subcategories) {
        setSubcategoriesState(
          singleCategories.subcategories.map((sub) => ({
            ...sub,
            name: sub.name,
          }))
        );
      }
    }
  }, [singleCategories]);

  const handleAddSub = async () => {
    if (!newSubName.trim()) return;
    await addSubcategory(singleCategories._id, newSubName.trim());
    setNewSubName('');
    setAddingSub(false);
  };

  const handleEditSub = async (id, name) => {
    await editSubcategory(singleCategories._id, id, name);
    setEditingSubId(null);
  };

  const handleDeleteSub = async (id) => {
    await deleteSubcategory(singleCategories._id, id);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateCategory = async () => {
    const formData = new FormData();
    formData.append('name', editName);
    if (newImageFile) formData.append('image', newImageFile);
    await editCategory(singleCategories._id, formData);
    fetchCategory();
    setShow(true);
  };

  return (
    <div>
      {show ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-[24px] font-bold">Categories</h1>
            <div className="flex gap-2">
              <Button
                label="Add Category"
                icon={FiPlus}
                variant="filled"
                onClick={handleOpenModal}
              />
            </div>
          </div>

          {isModalOpen && <AddModal onClose={handleCloseModal} />}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {categories.map((items) => (
              <div
                key={items._id}
                onClick={() => {
                  
                  fetchCategorybyid(items._id);
                }}
                className="px-2 relative py-3 cursor-pointer h-fit bg-white shadow-sm rounded"
              >
                <span className='absolute -right-3 bg-red-500 p-2 rounded-full text-white -top-3'  onClick={()=>deleteCategory(items._id)}><FiTrash/></span>
                <div onClick={()=>setShow(false)}>
                <img src={items.image} alt="" className="w-full h-32 object-cover rounded mb-2" />
                <h3 className="uppercase font-semibold">{items.name}</h3>
                <p className="text-gray-400">
                  {items.subcategories?.length || '0'} Subcategories
                </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <button
                  className="cursor-pointer flex gap-2 items-center"
                  onClick={() => setShow(true)}
                >
                  <FiArrowLeft /> Back
                </button>
                <h3 className="text-2xl font-bold uppercase">{singleCategories.name}</h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
            <div className="col-span-4 bg-white p-4 h-fit space-y-3">
              <div className="flex justify-between">
                <h1 className="font-light uppercase">Subcategories</h1>
                <Button label="Add" icon={FiPlus} onClick={() => setAddingSub(true)} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-2">
                {subcategoriesState.map((item) => (
                  <div
                    key={item._id}
                    className="border border-gray-200 rounded flex items-center"
                  >
                    <input
                      className="p-4 w-4/5 focus:outline-none"
                      value={item.name}
                      disabled={editingSubId !== item._id}
                      onChange={(e) => {
                        setSubcategoriesState((prev) =>
                          prev.map((sub) =>
                            sub._id === item._id
                              ? { ...sub, name: e.target.value }
                              : sub
                          )
                        );
                      }}
                      type="text"
                    />
                    <div className="flex">
                      {editingSubId === item._id ? (
                        <Button
                          variant="outline"
                          icon={FiCheck}
                          onClick={() => handleEditSub(item._id, item.name)}
                        />
                      ) : (
                        <Button
                          variant="outline"
                          icon={FiEdit}
                          onClick={() => setEditingSubId(item._id)}
                        />
                      )}
                      <Button
                        variant="outline"
                        icon={FiTrash}
                        onClick={() => handleDeleteSub(item._id)}
                      />
                    </div>
                  </div>
                ))}

                {addingSub && (
                  <div className="border border-gray-200 mb-4 rounded flex items-center">
                    <input
                      className="p-4 w-4/5 focus:outline-none"
                      placeholder="New subcategory name"
                      value={newSubName}
                      onChange={(e) => setNewSubName(e.target.value)}
                      type="text"
                    />
                    <div className="flex">
                      <Button
                        variant="outline"
                        icon={FiCheck}
                        onClick={handleAddSub}
                      />
                      <Button
                        variant="outline"
                        icon={FiTrash}
                        onClick={() => setAddingSub(false)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Edit Category Section */}
            <div className="col-span-2 bg-white p-4 rounded-lg shadow space-y-4">
              <div className="space-y-3 flex flex-col items-center">
                <img
                  src={previewUrl}
                  alt="Category"
                  className="w-full h-48 object-cover rounded border"
                />

                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded p-2"
                />

                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none"
                  placeholder="Category name"
                />

                <button
                  onClick={handleUpdateCategory}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
                >
                  Update Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
