// src/pages/dashboard/booking-car.tsx

import React, { useState } from "react";
import { Row, Col, Typography, Select, DatePicker } from "antd";
import {
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import StatisticCard from "../../components/dashboard/StatisticCard";
import ChartCard from "../../components/dashboard/ChartCard";
import RecentActivityList, {
  Activity,
} from "../../components/dashboard/RecentActivityList";
import SimpleBarChart, {
  BarChartData,
} from "../../components/dashboard/SimpleBarChart";

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const DashboardBookingCar = () => {
  const [loading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("month");

  // สถิติการจองรถ
  const bookingStats = [
    {
      title: "จองรถทั้งหมด",
      value: 125,
      prefix: <CarOutlined />,
      trend: "up" as const,
      trendValue: 15.3,
    },
    {
      title: "รอดำเนินการ",
      value: 25,
      prefix: <ClockCircleOutlined />,
      valueStyle: { color: "#faad14" },
      trend: "down" as const,
      trendValue: 5.2,
    },
    {
      title: "กำลังขนส่ง",
      value: 45,
      prefix: <SyncOutlined spin />,
      valueStyle: { color: "#1890ff" },
      trend: "up" as const,
      trendValue: 8.7,
    },
    {
      title: "เสร็จสิ้น",
      value: 55,
      prefix: <CheckCircleOutlined />,
      valueStyle: { color: "#52c41a" },
      trend: "up" as const,
      trendValue: 12.1,
    },
  ];

  // ข้อมูลการจองรายวัน (7 วันล่าสุด)
  const dailyBookingData: BarChartData[] = [
    { label: "จันทร์", value: 15, color: "#1890ff" },
    { label: "อังคาร", value: 18, color: "#1890ff" },
    { label: "พุธ", value: 22, color: "#1890ff" },
    { label: "พฤหัส", value: 20, color: "#1890ff" },
    { label: "ศุกร์", value: 25, color: "#52c41a" },
    { label: "เสาร์", value: 12, color: "#faad14" },
    { label: "อาทิตย์", value: 13, color: "#faad14" },
  ];

  // ข้อมูลการใช้รถแต่ละประเภท
  const carUsageData: BarChartData[] = [
    { label: "รถกระบะ", value: 30, color: "#1890ff" },
    { label: "รถ 6 ล้อ", value: 45, color: "#52c41a" },
    { label: "รถ 10 ล้อ", value: 35, color: "#faad14" },
    { label: "รถพ่วง", value: 15, color: "#ff4d4f" },
  ];

  // ข้อมูลเส้นทางยอดนิยม
  const popularRoutesData: BarChartData[] = [
    { label: "กรุงเทพฯ", value: 35, color: "#1890ff" },
    { label: "เชียงใหม่", value: 28, color: "#52c41a" },
    { label: "ภูเก็ต", value: 22, color: "#faad14" },
    { label: "ขอนแก่น", value: 18, color: "#ff4d4f" },
    { label: "อื่นๆ", value: 22, color: "#8c8c8c" },
  ];

  // ข้อมูลสถานะรถ
  const carStatusData: BarChartData[] = [
    { label: "พร้อมใช้งาน", value: 25, color: "#52c41a" },
    { label: "กำลังใช้งาน", value: 45, color: "#1890ff" },
    { label: "ซ่อมบำรุง", value: 8, color: "#faad14" },
    { label: "ไม่พร้อมใช้", value: 2, color: "#ff4d4f" },
  ];

  // กิจกรรมการจองล่าสุด
  const recentBookings: Activity[] = [
    {
      id: "1",
      title: "ORD-2026-156",
      description: "รถ 6 ล้อ (กข-1234) → กรุงเทพฯ | คนขับ: สมชาย ใจดี",
      status: "processing",
      timestamp: "10 นาทีที่แล้ว",
    },
    {
      id: "2",
      title: "ORD-2026-155",
      description: "รถ 10 ล้อ (คง-5678) → เชียงใหม่ | คนขับ: สมหญิง รักษ์ดี",
      status: "success",
      timestamp: "30 นาทีที่แล้ว",
    },
    {
      id: "3",
      title: "ORD-2026-154",
      description: "รถกระบะ (ขค-9999) → ภูเก็ต | คนขับ: สมศักดิ์ มั่นคง",
      status: "pending",
      timestamp: "1 ชั่วโมงที่แล้ว",
    },
    {
      id: "4",
      title: "ORD-2026-153",
      description: "รถพ่วง (นม-7777) → ระยอง | คนขับ: สมพร เจริญ",
      status: "success",
      timestamp: "2 ชั่วโมงที่แล้ว",
    },
    {
      id: "5",
      title: "ORD-2026-152",
      description: "รถ 6 ล้อ (บท-3333) → ขอนแก่น | คนขับ: สมใจ ดีงาม",
      status: "error",
      timestamp: "3 ชั่วโมงที่แล้ว",
    },
  ];

  return (
    <div style={{ padding: "24px", background: "#f0f2f5", minHeight: "100vh" }}>
      <div
        style={{
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2}>Dashboard - การจองรถ</Title>
        <div style={{ display: "flex", gap: 16 }}>
          <Select
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            style={{ width: 150 }}
          >
            <Option value="today">วันนี้</Option>
            <Option value="week">สัปดาห์นี้</Option>
            <Option value="month">เดือนนี้</Option>
            <Option value="year">ปีนี้</Option>
          </Select>
          <RangePicker />
        </div>
      </div>

      {/* สถิติการจองรถ */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {bookingStats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={`stat-${stat.title}-${index}`}>
            <StatisticCard {...stat} loading={loading} />
          </Col>
        ))}
      </Row>

      {/* กราฟการจองรายวัน */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <ChartCard
            title="การจองรถรายวัน"
            loading={loading}
            extra={
              <span style={{ fontSize: 12, color: "#8c8c8c" }}>
                7 วันล่าสุด
              </span>
            }
          >
            <SimpleBarChart data={dailyBookingData} height={280} />
          </ChartCard>
        </Col>
        <Col xs={24} lg={12}>
          <ChartCard title="การใช้งานรถแต่ละประเภท" loading={loading}>
            <SimpleBarChart data={carUsageData} height={280} />
          </ChartCard>
        </Col>
      </Row>

      {/* เส้นทางยอดนิยมและสถานะรถ */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <ChartCard title="เส้นทางยอดนิยม" loading={loading}>
            <SimpleBarChart data={popularRoutesData} height={280} />
          </ChartCard>
        </Col>
        <Col xs={24} lg={12}>
          <ChartCard title="สถานะรถทั้งหมด" loading={loading}>
            <SimpleBarChart data={carStatusData} height={280} />
          </ChartCard>
        </Col>
      </Row>

      {/* กิจกรรมการจองล่าสุด */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <RecentActivityList
            title="กิจกรรมการจองล่าสุด"
            activities={recentBookings}
            loading={loading}
            maxItems={10}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardBookingCar;
