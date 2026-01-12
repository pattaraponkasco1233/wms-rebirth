// src/components/layout/MainLayout.tsx

import React, { useState } from "react";
import {
  Layout,
  Button,
  theme,
  Dropdown,
  MenuProps,
  Space,
  Avatar,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Sidebar from "./Sidebar"; // นำเข้า Sidebar
import useAuth from "../../shares/hooks/useAuth"; // นำเข้า Auth Logic
import { navigateAppName } from "../../utils/Utils";

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode; // Prop ที่รับเนื้อหาของ Page (เช่น DashboardPage)
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false); // สถานะการยุบ/ขยาย Side Menu
  const { logout } = useAuth(); // ดึง logout function

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    logout();
    window.location.href = navigateAppName("/login"); // Redirect ไปหน้า Login หลัง Logout
  };

  const menu: MenuProps = {
    items: [
      {
        key: "1",
        label: (
          <Button
            type="link"
            onClick={handleLogout}
            icon={<LogoutOutlined />}
            style={{ padding: 0 }}
          >
            ออกจากระบบ
          </Button>
        ),
      },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* 1. แถบเมนูด้านซ้าย (Sider) */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="demo-logo-vertical"
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
            color: "white",
            textAlign: "center",
            lineHeight: "32px",
          }}
        >
          {collapsed ? "Menu" : "Cockpit"}
        </div>
        <Sidebar />
      </Sider>

      {/* 2. เนื้อหาหลักและ Navbar ด้านบน */}
      <Layout>
        {/* Navbar ด้านบน (Header) */}
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* ปุ่มยุบ/ขยายเมนู */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />

          {/* ข้อมูลผู้ใช้/Logout Button */}
          <Space style={{ marginRight: 24 }}>
            <Dropdown menu={menu} placement="bottomRight" arrow>
              <Button type="text" style={{ padding: 0 }}>
                <Space>
                  <Avatar icon={<UserOutlined />} />
                  <span>User Name</span>
                </Space>
              </Button>
            </Dropdown>
          </Space>
        </Header>

        {/* ส่วนเนื้อหาของ Page (Content) */}
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* {children} คือ Component ของหน้า Page ที่ถูกเรียก (เช่น DashboardPage) */}
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
