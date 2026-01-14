import React, { useState } from "react";
import { Row, Col, Typography } from "antd";
import {
  ShoppingCartOutlined,
  CarOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import StatisticCard from "../../components/dashboard/StatisticCard";
import ChartCard from "../../components/dashboard/ChartCard";
import RecentActivityList, {
  Activity,
} from "../../components/dashboard/RecentActivityList";
import QuickActionCard, {
  QuickAction,
} from "../../components/dashboard/QuickActionCard";
import SimpleBarChart, {
  BarChartData,
} from "../../components/dashboard/SimpleBarChart";

const { Title } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading] = useState(false);

  // ข้อมูลสถิติ
  const statisticsData = [
    {
      title: "ออเดอร์ทั้งหมด",
      value: 1234,
      prefix: <ShoppingCartOutlined />,
      trend: "up" as const,
      trendValue: 12.5,
    },
    {
      title: "รถที่ใช้งาน",
      value: 45,
      prefix: <CarOutlined />,
      trend: "up" as const,
      trendValue: 5.3,
    },
    {
      title: "เสร็จสิ้นแล้ว",
      value: 890,
      prefix: <CheckCircleOutlined />,
      valueStyle: { color: "#52c41a" },
      trend: "up" as const,
      trendValue: 8.7,
    },
    {
      title: "กำลังดำเนินการ",
      value: 344,
      prefix: <SyncOutlined spin />,
      valueStyle: { color: "#faad14" },
      trend: "down" as const,
      trendValue: 3.2,
    },
  ];

  // ข้อมูลกราฟรายเดือน
  const monthlyData: BarChartData[] = [
    { label: "ม.ค.", value: 120, color: "#1890ff" },
    { label: "ก.พ.", value: 150, color: "#1890ff" },
    { label: "มี.ค.", value: 180, color: "#1890ff" },
    { label: "เม.ย.", value: 200, color: "#1890ff" },
    { label: "พ.ค.", value: 220, color: "#1890ff" },
    { label: "มิ.ย.", value: 250, color: "#52c41a" },
  ];

  // ข้อมูลกราฟประเภทรถ
  const carTypeData: BarChartData[] = [
    { label: "รถกระบะ", value: 25, color: "#1890ff" },
    { label: "รถ 6 ล้อ", value: 35, color: "#52c41a" },
    { label: "รถ 10 ล้อ", value: 45, color: "#faad14" },
    { label: "รถพ่วง", value: 20, color: "#ff4d4f" },
  ];

  // กิจกรรมล่าสุด
  const recentActivities: Activity[] = [
    {
      id: "1",
      title: "ORD-2026-001",
      description: "จองรถ 6 ล้อ ไปกรุงเทพฯ",
      status: "success",
      timestamp: "5 นาทีที่แล้ว",
    },
    {
      id: "2",
      title: "ORD-2026-002",
      description: "จองรถ 10 ล้อ ไปเชียงใหม่",
      status: "processing",
      timestamp: "15 นาทีที่แล้ว",
    },
    {
      id: "3",
      title: "ORD-2026-003",
      description: "จองรถกระบะ ไปภูเก็ต",
      status: "pending",
      timestamp: "1 ชั่วโมงที่แล้ว",
    },
    {
      id: "4",
      title: "ORD-2026-004",
      description: "จองรถพ่วง ไประยอง",
      status: "success",
      timestamp: "2 ชั่วโมงที่แล้ว",
    },
    {
      id: "5",
      title: "ORD-2026-005",
      description: "จองรถ 6 ล้อ ไปขอนแก่น",
      status: "error",
      timestamp: "3 ชั่วโมงที่แล้ว",
    },
  ];

  // การดำเนินการด่วน
  const quickActions: QuickAction[] = [
    // Booking-related quick actions removed
  ];

  return (
    <div style={{ padding: "24px", background: "#f0f2f5", minHeight: "100vh" }}>
      <Title level={2}>Dashboard</Title>

      {/* สถิติภาพรวม */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {statisticsData.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <StatisticCard {...stat} loading={loading} />
          </Col>
        ))}
      </Row>

      {/* กราฟและกิจกรรม */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <ChartCard title="จำนวนการจองรายเดือน" loading={loading}>
            <SimpleBarChart data={monthlyData} height={300} />
          </ChartCard>
        </Col>
        <Col xs={24} lg={8}>
          <QuickActionCard actions={quickActions} loading={loading} />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <ChartCard title="การใช้งานรถแต่ละประเภท" loading={loading}>
            <SimpleBarChart data={carTypeData} height={300} />
          </ChartCard>
        </Col>
        <Col xs={24} lg={12}>
          <RecentActivityList activities={recentActivities} loading={loading} />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
