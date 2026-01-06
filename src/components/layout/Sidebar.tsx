// src/components/layout/Sidebar.tsx

import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
  CarOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

const menuItems = [
  { key: "/dashboard", icon: <PieChartOutlined />, label: "Dashboard" },
  {
    key: "/dashboard/booking-car",
    icon: <DashboardOutlined />,
    label: "Dashboard จองรถ",
  },
  { key: "/booking-car", icon: <CarOutlined />, label: "จองรถขนส่ง" },
  { key: "/users", icon: <UserOutlined />, label: "ผู้ใช้งาน" },
  { key: "/settings", icon: <DesktopOutlined />, label: "ตั้งค่าระบบ" },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleMenuClick = (e: any) => {
    navigate(e.key);
  };

  // กำหนด Key ที่ถูกเลือกตาม Path ปัจจุบัน
  const currentPath = window.location.pathname;

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[currentPath]}
      onClick={handleMenuClick}
      items={menuItems}
    />
  );
};

export default Sidebar;
