import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {

    const navigate=useNavigate()
  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/admin/login', {
        email: values.email,
        password: values.password,
      });

      const { token, admin } = response.data;

      // Store token or set user context
      localStorage.setItem('adminToken', token);
      message.success('Login successful!');

      // Optional: Redirect to admin dashboard
      navigate('/admin/dashboard'); 
    } catch (error) {
      message.error(
        error.response?.data?.message || 'Login failed. Please check your credentials.'
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>
        <Form
          name="admin_login"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ email: '', password: '' }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input placeholder="admin@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
            ]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AdminLogin;
