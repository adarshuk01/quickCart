import React, { useContext, useState } from 'react';
import {
  Form,
  Input,
  Space,
  Tag,
  Button,
  message,
  Popconfirm,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import MyModal from '../components/common/Modal';
import MyTable from '../components/common/Table';
import { CategoryContext } from '../context/CategoryContext';

function Category() {
  const {
    categoryName,
    categoryError,
    confirmLoading,
    handleInputChange,
    handleAddCategory,
    deleteCategory,
    categories,
    subcategoryInputs,
    handleSubcategoryInputChange,
    addSubcategory,
    deleteSubcategory,
  } = useContext(CategoryContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmitCategory = async () => {
    const result = await handleAddCategory();
    if (result !== false) {
      handleCloseModal();
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Stocks',
      dataIndex: 'stocks',
      key: 'stocks',
    },
    {
      title: 'Subcategories',
      key: 'subcategories',
      width: 400,
      render: (_, record) => (
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            {(record?.subcategories || []).map((sub) => (
              <Tag
                key={sub._id}
                closable
                onClose={() => deleteSubcategory(record._id, sub._id)}
              >
                {sub.name}
              </Tag>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <Input
              size="small"
              placeholder="Add subcategory"
              value={subcategoryInputs[record._id] || ''}
              onChange={(e) =>
                handleSubcategoryInputChange(record._id, e.target.value)
              }
            />
            <Button
              size="small"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => addSubcategory(record._id)}
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => deleteCategory(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Category List</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>
          Add Category
        </Button>
      </div>

      <MyModal
        title="Add Category"
        modalbtntxt="Add Category"
        open={isModalVisible}
        confirmLoading={confirmLoading}
        onCancel={handleCloseModal}
        onConfirm={handleSubmitCategory}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            validateStatus={categoryError ? 'error' : ''}
            help={categoryError}
          >
            <Input
              placeholder="Enter category name"
              showCount
              maxLength={20}
              value={categoryName}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
      </MyModal>

      <MyTable columns={columns} data={categories} />
    </div>
  );
}

export default Category;
