import React, { useContext, useEffect, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Button,
  Switch,
  message,
  Popconfirm,
} from 'antd';
import dayjs from 'dayjs';
import { PlusOutlined, EditOutlined, DeleteOutlined, OpenAIFilled } from '@ant-design/icons';
import MyModal from '../components/common/Modal';
import MyTable from '../components/common/Table';
import { ProductContext } from '../context/ProductContext';
import { DiscountContext } from '../context/DiscountContext'; // You'll need to create this

const { Option } = Select;
const { RangePicker } = DatePicker;

function Offer() {
  const { products } = useContext(ProductContext);
  const {
    discounts,
    fetchDiscounts,
    addDiscount,
    updateDiscount,
    deleteDiscount,
    loading,
    generateDiscountImage
  } = useContext(DiscountContext);

  const [form] = Form.useForm();
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null); // File object
  const [previewImage, setPreviewImage] = useState(null);
  const [imageGenerating, setImageGenerating] = useState(false);


  useEffect(() => {
    fetchDiscounts();
  }, []);

  const handleGenerateImage = async () => {
    setImageGenerating(true);
    const image = await generateDiscountImage(form.getFieldValue('title'));
    console.log(image);

    if (image && image.originFileObj) {
      setGeneratedImage(image.originFileObj); // File to send
      setPreviewImage(URL.createObjectURL(image.originFileObj)); // Preview
    }
    setImageGenerating(false);
  };


  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const [startDate, endDate] = values.dateRange;
      console.log(typeof values.isActive, values.isActive); 

      console.log('Form Values:', values);

      const payload = {
        ...values,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        image: generatedImage, // ✅ send the image to backend
      };
     

      setConfirmLoading(true);

      const result = editingDiscount
        ? await updateDiscount(editingDiscount._id, payload)
        : await addDiscount(payload);

      if (result.success) {
        message.success(`${editingDiscount ? 'Updated' : 'Added'} successfully`);
        fetchDiscounts();
        form.resetFields();
        setEditingDiscount(null);
        setIsModalVisible(false);
      } else {
        message.error(result.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setConfirmLoading(false);
     
    }
  };

  

  const handleEdit = (record) => {
    form.setFieldsValue({
      ...record,
      products: record.products.map(p => p._id), // ✅ map products to their IDs
      dateRange: [dayjs(record.startDate), dayjs(record.endDate)],
      isActive: record.isActive,
    });
    setEditingDiscount(record);
    setIsModalVisible(true);
    setPreviewImage(record.image || null);  // use existing URL
    setGeneratedImage(null); // ✅ set image on edit
  };

  const handleDelete = async (id) => {
    const result = await deleteDiscount(id);
    if (result.success) {
      message.success('Offer deleted');
      fetchDiscounts();
    } else {
      message.error(result.error);
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      render: (productList) => productList.map(p => p.name).join(', '),
    },
    {
      title: 'Dates',
      key: 'dates',
      render: (_, record) =>
        `${dayjs(record.startDate).format('DD/MM/YYYY')} - ${dayjs(record.endDate).format('DD/MM/YYYY')}`,
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      key: 'isActive',
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
            title="Are you sure you want to delete this offer?"
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

  console.log('generatedImage', generatedImage);


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4 p-6 shadow-lg">
        <h1 className="text-lg font-semibold">Offers</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            setEditingDiscount(null);
            setIsModalVisible(true);
          }}
        >
          Add Offer
        </Button>
      </div>

      <MyModal
        title={editingDiscount ? 'Edit Offer' : 'Add Offer'}
        modalbtntxt={editingDiscount ? 'Update Offer' : 'Add Offer'}
        open={isModalVisible}
        onCancel={() => {
          form.resetFields();
          setEditingDiscount(null);
          setIsModalVisible(false);
          setGeneratedImage(null);    // 🧼 Clear file
          setPreviewImage(null);      // 🧼 Clear preview
        }}
        onConfirm={handleSave}
        confirmLoading={confirmLoading}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Title is required' }]}
          >
            <Input />
           
          </Form.Item>
           <div className='w-[200px] mt-4'>
          <Button
            type="dashed"
            onClick={handleGenerateImage}
            loading={imageGenerating}
            className="mb-4 w-[30px]"
            block
            icon={<OpenAIFilled />}
            danger
            
          >
            Generate Poster with AI
          </Button>
          </div>
         

          {previewImage && (
            <div className="mb-4">
              <img
                src={previewImage}
                alt="Generated Poster"
                style={{ width: '100%', borderRadius: 8 }}
              />
            </div>
          )}


          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Type is required' }]}
          >
            <Select>
              <Option value="percentage">Percentage</Option>
              <Option value="fixed">Fixed</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Value"
            name="value"
            rules={[{ required: true, message: 'Value is required' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Products"
            name="products"
            rules={[{ required: true, message: 'Select at least one product' }]}
          >
            <Select mode="multiple" allowClear>
              {products.map((product) => (
                <Option key={product._id} value={product._id}>
                  {product.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Date Range"
            name="dateRange"
            rules={[{ required: true, message: 'Please select a date range' }]}
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Active"
            name="isActive"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>
        </Form>
      </MyModal>

      <MyTable columns={columns} data={discounts} loading={loading} />
    </div>
  );
}

export default Offer;
