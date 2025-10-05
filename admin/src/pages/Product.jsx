import React, { useContext, useEffect, useState } from 'react';
import MyModal from '../components/common/Modal';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Button,
  Upload,
  message,
  Popconfirm
} from 'antd';
import { AntDesignOutlined, DeleteOutlined, EditOutlined, OpenAIFilled, PlusOutlined, } from '@ant-design/icons';
import { CategoryContext } from '../context/CategoryContext';
import { ProductContext } from '../context/ProductContext';
import MyTable from '../components/common/Table';
import TinyMCEEditor from '../components/common/TinyMCEEditor'; // adjust path as needed




const { Option } = Select;

function Product() {
  const { categories } = useContext(CategoryContext);
  const {
    products,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchDescription,
    aiDescription,
    loading,
    fetchGeneratedImages, imageLoading
  } = useContext(ProductContext);



  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [imageError, setImageError] = useState('');



  const [description, setDescription] = useState('');


  useEffect(() => {
    if (editingProduct?.description) {
      setDescription(editingProduct.description);
    }
  }, [editingProduct]);



  useEffect(() => {
    fetchProducts();
  }, []);

  const getSubcategoriesByCategoryId = (categoryId) => {
    const category = categories.find((c) => c._id === categoryId);
    return category?.subcategories || [];
  };

  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      setImageError('');
    }
  };

  const handleDelete = async (id) => {
    const result = await deleteProduct(id);
    if (result.success) {
      message.success('Product deleted');
      fetchProducts();
    } else {
      message.error(result.error);
    }
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      ...record,
      category: record.category._id,
      subcategory: record.subcategory,
    });
    setSelectedCategoryId(record.category._id);
    setEditingProduct(record);
    setIsModalVisible(true);
    setFileList(
      record.images.map((url, index) => ({
        uid: `${index}`,
        name: `image-${index}`,
        status: 'done',
        url,
      }))
    );
  };

  const handleSaveProduct = async () => {
    try {
      const values = await form.validateFields();

      if (fileList.length === 0) {
        setImageError('Please upload at least one image');
        return;
      }

      setConfirmLoading(true);
      setImageError('');

      const formData = new FormData();

      // Append all regular form fields
      for (const key in values) {
        formData.append(key, values[key]);
      }

      // ✅ Append description manually
      formData.append('description', description);

      // Append existing image URLs
      const existingImages = fileList
        .filter((file) => !file.originFileObj && file.url)
        .map((file) => file.url);
      formData.append('existingImages', JSON.stringify(existingImages));

      // Append new image files
      const newFiles = fileList.filter((file) => file.originFileObj);
      newFiles.forEach((file) => {
        formData.append('images', file.originFileObj);
      });

      let result;
      if (editingProduct) {
        result = await updateProduct(editingProduct._id, formData);
      } else {
        result = await addProduct(formData);
      }

      if (result.success) {
        message.success(`${editingProduct ? 'Updated' : 'Added'} successfully`);
        fetchProducts();
        form.resetFields();
        setFileList([]);
        setEditingProduct(null);
        setSelectedCategoryId(null);
        setDescription(''); // ✅ Reset description
        setIsModalVisible(false);
      } else {
        message.error(result.error);
      }
    } catch (err) {
      console.error('Validation failed:', err);
    } finally {
      setConfirmLoading(false);
    }
  };

  const columns = [
    {
      title: 'Images',
      dataIndex: 'images',
      key: 'images',
      render: (images) => (
        <div className="flex gap-2 flex-wrap">
          {images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="preview"
              className="w-12 h-12 object-cover rounded"
            />
          ))}
        </div>
      ),
    },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Stock', dataIndex: 'stock', key: 'stock' },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (cat) => cat?.name || 'N/A',
    },
    {
      title: 'Subcategory',
      dataIndex: 'subcategory',
      key: 'subcategory',
      render: (subId, record) => {
        const category = categories.find(
          (cat) => cat._id === record.category._id
        );
        const subcat = category?.subcategories?.find(
          (s) => s.name === subId
        );
        return subcat?.name || 'N/A';
      },
    },
    {
      title: 'Featured',
      dataIndex: 'isFeatured',
      key: 'isFeatured',
      render: (val) => (val ? 'Yes' : 'No'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="flex gap-2">
          <Button onClick={() => handleEdit(record)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className='space-y-6 '>
      <div style={{ padding: '18px' }} className="flex justify-between items-center mb-4 p-6  shadow-lg">
        <h1 className="text-lg font-semibold ">Product List</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            setFileList([]);
            setEditingProduct(null);
            setSelectedCategoryId(null);
            setImageError('');
            setDescription('');
            setIsModalVisible(true);
          }}
        >
          Add Product
        </Button>
      </div>

      <MyModal
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        modalbtntxt={editingProduct ? 'Update Product' : 'Add Product'}
        open={isModalVisible}
        onCancel={() => {
          form.resetFields();
          setFileList([]);
          setImageError('');
          setSelectedCategoryId(null);
          setEditingProduct(null);
          setIsModalVisible(false);
        }}
        onConfirm={handleSaveProduct}
        confirmLoading={confirmLoading}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Product name is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Description" required>
            <TinyMCEEditor value={description ? description : aiDescription} onChange={setDescription} />
            <Button
              loading={loading}
              onClick={async () => {
                const name = form.getFieldValue('name');
                if (!name) {
                  message.warning('Please enter a product name first');
                  return;
                }

                // call fetchDescription (which returns a response, don't rely on context here)
                try {
                  const res = await fetchDescription(name); // <-- modify fetchDescription to return the result
                  if (res) {
                    setDescription(res); // set local state only when button is clicked
                    message.success('AI description generated');
                  }
                } catch (err) {
                  message.error('Failed to generate description');
                }
              }}
               type="dashed"
            
              className="mb-10"
              size="large"
              icon={<OpenAIFilled />}
            >
              Generate with AI
            </Button>


          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Price is required' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Stock" name="stock" initialValue={0}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Upload Images">
            <Upload
              accept=".jpg,.jpeg,.png"
              listType="picture-card"
              fileList={fileList}
              onChange={handleImageChange}
              beforeUpload={(file) => {
                const isImage =
                  file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isImage) {
                  setImageError('Only JPG and PNG images are allowed');
                  return Upload.LIST_IGNORE;
                }
                setImageError(null);
                return false;
              }}
              multiple
            >
              {fileList.length >= 5 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>

            {imageError && (
              <div className="text-red-500 text-sm mt-1">{imageError}</div>
            )}
            <Button
            loading={imageLoading}
            onClick={async () => {
              const name = form.getFieldValue('name');
              if (!name) {
                message.warning('Please enter a product name first');
                return;
              }

              try {
                const generated = await fetchGeneratedImages(name);
                if (generated.length) {
                  setFileList((prev) => [...generated, ...prev]);
                  message.success('AI image generated and added');
                } else {
                  message.warning('No image generated');
                }
              } catch (err) {
                message.error('Image generation failed');
              }
            }}
            type="dashed"
            icon={<OpenAIFilled />}
            style={{ marginTop: 12 }}
          >
            Generate Image with AI
          </Button>
          </Form.Item>

          


          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Category is required' }]}
          >
            <Select
              onChange={(value) => {
                setSelectedCategoryId(value);
                form.setFieldsValue({ subcategory: undefined });
              }}
            >
              {categories.map((cat) => (
                <Option key={cat._id} value={cat._id}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Subcategory"
            name="subcategory"
            rules={[{ required: true, message: 'Subcategory is required' }]}
          >
            <Select disabled={!selectedCategoryId}>
              {getSubcategoriesByCategoryId(selectedCategoryId).map((sub) => (
                <Option key={sub._id} value={sub.name}>
                  {sub.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Featured" name="isFeatured" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </MyModal>

      <MyTable columns={columns} data={products} loading={loading} />
    </div>
  );
}

export default Product;
