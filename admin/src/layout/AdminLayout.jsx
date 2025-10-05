import React from 'react';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: '/admin/dashboard',
    icon: <UserOutlined />,
    label: 'Dashboard',
  },
  {
    key: '/admin/category',
    icon: <VideoCameraOutlined />,
    label: 'Category',
  },
  {
    key: '/admin/products',
    icon: <UploadOutlined />,
    label: 'Products',
  },
   {
    key: '/admin/offers',
    icon: <UploadOutlined />,
    label: 'offers',
  },
];

// Helper to format breadcrumb items
const generateBreadcrumbs = (pathname) => {
  const pathParts = pathname.split('/').filter(Boolean);
  return pathParts.map((part, index) => {
    const url = '/' + pathParts.slice(0, index + 1).join('/');
    return {
      title:
        part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
      href: url,
    };
  });
};

const AdminLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();
  const breadcrumbItems = generateBreadcrumbs(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login'); // or whatever your login route is
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="demo-logo-vertical flex items-center justify-center h-[100px] m-10 py-10">
          <img className="m-10" width={140} src="/quickcartLogo.png" alt="Logo" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>

      <Layout>
        <Header
          className="px-4 flex justify-end items-center"
          style={{
            height: 64,
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button danger onClick={handleLogout}>
            Logout
          </Button>
        </Header>

        <Content style={{ padding: '0 16px', overflowY: 'auto' }}>
          <Breadcrumb
            style={{ margin: '16px 0' }}
            items={[
              { title: <a onClick={() => navigate('/admin')}>Home</a> },
              ...breadcrumbItems.map((item, i) => ({
                title:
                  i === breadcrumbItems.length - 1 ? (
                    <span>{item.title}</span>
                  ) : (
                    <a onClick={() => navigate(item.href)}>{item.title}</a>
                  ),
              })),
            ]}
          />
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>

        <Footer style={{ height: 48, textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
