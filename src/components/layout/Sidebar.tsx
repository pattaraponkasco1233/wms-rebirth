// src/components/layout/Sidebar.tsx

import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
  LineChartOutlined,
  ContainerOutlined,
  ControlOutlined,
  MonitorOutlined,
} from "@ant-design/icons";

const menuItems = [
  { key: "/dashboard", icon: <PieChartOutlined />, label: "Dashboard" },
  {
    key: "/dashboard/car",
    icon: <LineChartOutlined />,
    label: "Dashboard รถขนส่ง",
  },
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

  const handleMenuClick = (e: any) => {
    navigate(e.key);
  };

  // กำหนด Key ที่ถูกเลือกตาม Path ปัจจุบัน
  const currentPath = globalThis.location.pathname;

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
