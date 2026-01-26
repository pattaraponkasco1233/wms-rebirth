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
  Typography,
  Select,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Sidebar from "./Sidebar"; // นำเข้า Sidebar
import useAuth from "../../shares/hooks/useAuth"; // นำเข้า Auth Logic
import { navigateAppName } from "../../utils/Utils";
import { AppRoutes } from "../../guard/router/routers"; // นำเข้า Routes

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

interface MainLayoutProps {
  children: React.ReactNode; // Prop ที่รับเนื้อหาของ Page (เช่น DashboardPage)
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false); // สถานะการยุบ/ขยาย Side Menu
  const { logout } = useAuth(); // ดึง logout function
  const location = useLocation(); // ดึง current path
  const { t, i18n } = useTranslation(); // ใช้ i18n

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // ฟังก์ชันเปลี่ยนภาษา
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // ฟังก์ชันแปลง path เป็นชื่อหน้า
  const getPageTitle = (pathname: string): string => {
    // หาชื่อหน้าจาก AppRoutes
    const currentRoute = AppRoutes.find((route) => route.path === pathname);
    return currentRoute?.pageTitle || "หน้าหลัก";
  };

  const handleLogout = () => {
    logout();
    globalThis.location.href = navigateAppName("/login"); // Redirect ไปหน้า Login หลัง Logout
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
            {t("common.logout")}
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
          {collapsed ? t("common.menu") : t("common.appName")}
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
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* ปุ่มยุบ/ขยายเมนู */}
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: "16px", width: 64, height: 64 }}
            />

            {/* ชื่อหน้าปัจจุบัน */}
            <Title level={4} style={{ margin: 0, marginLeft: 16 }}>
              {getPageTitle(location.pathname)}
            </Title>
          </div>

          {/* ข้อมูลผู้ใช้/Logout Button */}
          <Space style={{ marginRight: 24 }}>
            {/* ปุ่มเปลี่ยนภาษา */}
            <Select
              value={i18n.language}
              onChange={changeLanguage}
              style={{ width: 80 }}
              options={[
                { value: "en", label: "EN" },
                { value: "th", label: "TH" },
              ]}
            />

            <Dropdown menu={menu} placement="bottomRight" arrow>
              <Button type="text" style={{ padding: 0 }}>
                <Space>
                  <Avatar icon={<UserOutlined />} />
                  <span>{t("common.user")}</span>
                </Space>
              </Button>
            </Dropdown>
          </Space>
        </Header>

        {/* ส่วนเนื้อหาของ Page (Content) */}
        <Content
          style={{
            margin: "16px 16px",
            // padding: 24,
            minHeight: 280,
            // background: colorBgContainer,
            // borderRadius: borderRadiusLG,
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
