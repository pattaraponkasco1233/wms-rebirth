// src/components/layout/Sidebar.tsx

import React from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DesktopOutlined,
  UserOutlined,
  ContainerOutlined,
  ControlOutlined,
  MonitorOutlined,
} from "@ant-design/icons";

const menuItems = [
  {
    key: "/proactive-monitor",
    icon: <MonitorOutlined />,
    label: "Proactive Monitor",
  },
  {
    key: "/truck-checkin",
    icon: <ContainerOutlined />,
    label: "Truck Check-in",
  },
  {
    key: "/logistics-planner",
    icon: <ControlOutlined />,
    label: "Logistics Planner",
  },
  { key: "/users", icon: <UserOutlined />, label: "ผู้ใช้งาน" },
  { key: "/settings", icon: <DesktopOutlined />, label: "ตั้งค่าระบบ" },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (e: any) => {
    navigate(e.key);
  };

  // กำหนด Key ที่ถูกเลือกตาม Path ปัจจุบัน
  const currentPath = location.pathname;

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[currentPath]}
      onClick={handleMenuClick}
      items={menuItems}
    />
  );
};

export default Sidebar;
