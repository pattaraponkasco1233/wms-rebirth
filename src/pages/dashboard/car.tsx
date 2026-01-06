// src/pages/dashboard/car.tsx

import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Typography,
  Select,
  DatePicker,
  Button,
  Space,
  message,
} from "antd";
import {
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  DownloadOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/th";
import StatisticCard from "../../components/dashboard/StatisticCard";
import ChartCard from "../../components/dashboard/ChartCard";
import RecentActivityList, {
  Activity,
} from "../../components/dashboard/RecentActivityList";
import SimpleBarChart, {
  BarChartData,
} from "../../components/dashboard/SimpleBarChart";
import {
  dashboardCarApi,
  DashboardCarFilter,
  DashboardCarResponse,
} from "../../services/api/dashboardCarService";

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Enable dayjs plugins
dayjs.extend(relativeTime);
dayjs.locale("th");

const DashboardCar: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] =
    useState<DashboardCarResponse | null>(null);

  // Filter States
  const [filterPeriod, setFilterPeriod] = useState<string>("month");
  const [filterVehicleType, setFilterVehicleType] = useState<
    string | undefined
  >(undefined);
  const [filterStatus, setFilterStatus] = useState<string | undefined>(
    undefined
  );
  const [filterDateRange, setFilterDateRange] = useState<
    [dayjs.Dayjs, dayjs.Dayjs] | null
  >(null);

  // ดึงข้อมูล Dashboard
  const fetchDashboardData = async (customFilter?: DashboardCarFilter) => {
    try {
      setLoading(true);

      // สร้าง Filter Object
      const filter: DashboardCarFilter = customFilter || {
        vehicleType: filterVehicleType,
        status: filterStatus,
        startDate: filterDateRange?.[0]?.format("YYYY-MM-DD"),
        endDate: filterDateRange?.[1]?.format("YYYY-MM-DD"),
      };

      // ยิง API
      const data = await dashboardCarApi.getDashboardData(filter);
      setDashboardData(data);
    } catch (error: any) {
      console.error("Error fetching dashboard data:", error);
      message.error(
        error.response?.data?.message ||
          "เกิดข้อผิดพลาดในการดึงข้อมูล Dashboard"
      );

      // ใช้ Mock Data สำหรับ Demo (ในกรณี API ยังไม่พร้อม)
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  // Load Mock Data สำหรับ Demo
  const loadMockData = () => {
    const mockData: DashboardCarResponse = {
      statistics: {
        totalBookings: 125,
        pendingBookings: 25,
        inTransitBookings: 45,
        completedBookings: 55,
        totalVehicles: 80,
        availableVehicles: 25,
        inUseVehicles: 45,
        maintenanceVehicles: 8,
      },
      dailyBookings: [
        { date: "2026-01-01", count: 15 },
        { date: "2026-01-02", count: 18 },
        { date: "2026-01-03", count: 22 },
        { date: "2026-01-04", count: 20 },
        { date: "2026-01-05", count: 25 },
        { date: "2026-01-06", count: 12 },
        { date: "2026-01-07", count: 13 },
      ],
      vehicleUsage: [
        { vehicleType: "รถกระบะ", count: 30, percentage: 37.5 },
        { vehicleType: "รถ 6 ล้อ", count: 45, percentage: 56.25 },
        { vehicleType: "รถ 10 ล้อ", count: 35, percentage: 43.75 },
        { vehicleType: "รถพ่วง", count: 15, percentage: 18.75 },
      ],
      popularRoutes: [
        { destination: "กรุงเทพฯ", count: 35, percentage: 28 },
        { destination: "เชียงใหม่", count: 28, percentage: 22.4 },
        { destination: "ภูเก็ต", count: 22, percentage: 17.6 },
        { destination: "ขอนแก่น", count: 18, percentage: 14.4 },
        { destination: "อื่นๆ", count: 22, percentage: 17.6 },
      ],
      recentBookings: [
        {
          id: "1",
          orderNumber: "ORD-2026-156",
          vehicleType: "รถ 6 ล้อ",
          licensePlate: "กข-1234",
          driverName: "สมชาย ใจดี",
          destination: "กรุงเทพฯ",
          bookingDate: "2026-01-06",
          status: "in-transit",
          createdAt: "2026-01-06T10:30:00Z",
        },
        {
          id: "2",
          orderNumber: "ORD-2026-155",
          vehicleType: "รถ 10 ล้อ",
          licensePlate: "คง-5678",
          driverName: "สมหญิง รักษ์ดี",
          destination: "เชียงใหม่",
          bookingDate: "2026-01-06",
          status: "completed",
          createdAt: "2026-01-06T09:00:00Z",
        },
        {
          id: "3",
          orderNumber: "ORD-2026-154",
          vehicleType: "รถกระบะ",
          licensePlate: "ขค-9999",
          driverName: "สมศักดิ์ มั่นคง",
          destination: "ภูเก็ต",
          bookingDate: "2026-01-05",
          status: "pending",
          createdAt: "2026-01-05T14:20:00Z",
        },
      ],
    };
    setDashboardData(mockData);
  };

  // ดึงข้อมูลตอน Component Mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // จัดการเมื่อเปลี่ยน Period
  const handlePeriodChange = (value: string) => {
    setFilterPeriod(value);

    // คำนวณช่วงวันที่ตาม Period
    const today = dayjs();
    let startDate: string | undefined;
    let endDate: string | undefined;

    switch (value) {
      case "today":
        startDate = today.format("YYYY-MM-DD");
        endDate = today.format("YYYY-MM-DD");
        break;
      case "week":
        startDate = today.subtract(7, "day").format("YYYY-MM-DD");
        endDate = today.format("YYYY-MM-DD");
        break;
      case "month":
        startDate = today.subtract(30, "day").format("YYYY-MM-DD");
        endDate = today.format("YYYY-MM-DD");
        break;
      case "year":
        startDate = today.subtract(365, "day").format("YYYY-MM-DD");
        endDate = today.format("YYYY-MM-DD");
        break;
    }

    fetchDashboardData({ startDate, endDate });
  };

  // จัดการเมื่อกด Apply Filter
  const handleApplyFilter = () => {
    fetchDashboardData();
  };

  // จัดการเมื่อกด Reset Filter
  const handleResetFilter = () => {
    setFilterVehicleType(undefined);
    setFilterStatus(undefined);
    setFilterDateRange(null);
    setFilterPeriod("month");
    fetchDashboardData({});
  };

  // Export ข้อมูลเป็น Excel
  const handleExport = async () => {
    try {
      message.loading("กำลังสร้างไฟล์...", 0);

      const filter: DashboardCarFilter = {
        vehicleType: filterVehicleType,
        status: filterStatus,
        startDate: filterDateRange?.[0]?.format("YYYY-MM-DD"),
        endDate: filterDateRange?.[1]?.format("YYYY-MM-DD"),
      };

      const blob = await dashboardCarApi.exportToExcel(filter);

      // สร้าง Download Link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `dashboard-car-${dayjs().format("YYYY-MM-DD")}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      message.destroy();
      message.success("Export สำเร็จ!");
    } catch (error: any) {
      message.destroy();
      message.error("เกิดข้อผิดพลาดในการ Export ข้อมูล");
      console.error("Export error:", error);
    }
  };

  // แปลงข้อมูลเป็น Chart Data
  const getDailyBookingChartData = (): BarChartData[] => {
    if (!dashboardData?.dailyBookings) return [];

    return dashboardData.dailyBookings.map((item) => ({
      label: dayjs(item.date).format("DD/MM"),
      value: item.count,
      color: "#1890ff",
    }));
  };

  const getVehicleUsageChartData = (): BarChartData[] => {
    if (!dashboardData?.vehicleUsage) return [];

    const colors = ["#1890ff", "#52c41a", "#faad14", "#ff4d4f"];
    return dashboardData.vehicleUsage.map((item, index) => ({
      label: item.vehicleType,
      value: item.count,
      color: colors[index % colors.length],
    }));
  };

  const getPopularRoutesChartData = (): BarChartData[] => {
    if (!dashboardData?.popularRoutes) return [];

    const colors = ["#1890ff", "#52c41a", "#faad14", "#ff4d4f", "#8c8c8c"];
    return dashboardData.popularRoutes.map((item, index) => ({
      label: item.destination,
      value: item.count,
      color: colors[index % colors.length],
    }));
  };

  // แปลง Recent Bookings เป็น Activity List
  const getRecentActivities = (): Activity[] => {
    if (!dashboardData?.recentBookings) return [];

    const statusMap: Record<string, Activity["status"]> = {
      pending: "pending",
      confirmed: "processing",
      "in-transit": "processing",
      completed: "success",
      cancelled: "error",
    };

    return dashboardData.recentBookings.map((booking) => ({
      id: booking.id,
      title: booking.orderNumber,
      description: `${booking.vehicleType} (${booking.licensePlate}) → ${booking.destination} | คนขับ: ${booking.driverName}`,
      status: statusMap[booking.status] || "pending",
      timestamp: dayjs(booking.createdAt).fromNow(),
    }));
  };

  return (
    <div style={{ padding: "24px", background: "#f0f2f5", minHeight: "100vh" }}>
      {/* Header with Filters */}
      <div
        style={{
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Dashboard - รถขนส่ง
        </Title>

        <Space wrap>
          <Select
            value={filterPeriod}
            onChange={handlePeriodChange}
            style={{ width: 120 }}
          >
            <Option value="today">วันนี้</Option>
            <Option value="week">สัปดาห์นี้</Option>
            <Option value="month">เดือนนี้</Option>
            <Option value="year">ปีนี้</Option>
          </Select>

          <Select
            placeholder="ประเภทรถ"
            value={filterVehicleType}
            onChange={setFilterVehicleType}
            style={{ width: 140 }}
            allowClear
          >
            <Option value="รถกระบะ">รถกระบะ</Option>
            <Option value="รถ 6 ล้อ">รถ 6 ล้อ</Option>
            <Option value="รถ 10 ล้อ">รถ 10 ล้อ</Option>
            <Option value="รถพ่วง">รถพ่วง</Option>
          </Select>

          <Select
            placeholder="สถานะ"
            value={filterStatus}
            onChange={setFilterStatus}
            style={{ width: 140 }}
            allowClear
          >
            <Option value="pending">รอดำเนินการ</Option>
            <Option value="confirmed">ยืนยันแล้ว</Option>
            <Option value="in-transit">กำลังขนส่ง</Option>
            <Option value="completed">เสร็จสิ้น</Option>
          </Select>

          <RangePicker
            value={filterDateRange}
            onChange={(dates) =>
              setFilterDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs] | null)
            }
            format="DD/MM/YYYY"
          />

          <Button type="primary" onClick={handleApplyFilter} loading={loading}>
            ค้นหา
          </Button>

          <Button onClick={handleResetFilter} icon={<ReloadOutlined />}>
            รีเซ็ต
          </Button>

          <Button
            type="default"
            icon={<DownloadOutlined />}
            onClick={handleExport}
          >
            Export
          </Button>
        </Space>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <StatisticCard
            title="จองรถทั้งหมด"
            value={dashboardData?.statistics.totalBookings || 0}
            prefix={<CarOutlined />}
            loading={loading}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatisticCard
            title="รอดำเนินการ"
            value={dashboardData?.statistics.pendingBookings || 0}
            prefix={<ClockCircleOutlined />}
            valueStyle={{ color: "#faad14" }}
            loading={loading}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatisticCard
            title="กำลังขนส่ง"
            value={dashboardData?.statistics.inTransitBookings || 0}
            prefix={<SyncOutlined spin />}
            valueStyle={{ color: "#1890ff" }}
            loading={loading}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatisticCard
            title="เสร็จสิ้น"
            value={dashboardData?.statistics.completedBookings || 0}
            prefix={<CheckCircleOutlined />}
            valueStyle={{ color: "#52c41a" }}
            loading={loading}
          />
        </Col>
      </Row>

      {/* Charts Row 1 */}
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
            <SimpleBarChart data={getDailyBookingChartData()} height={280} />
          </ChartCard>
        </Col>
        <Col xs={24} lg={12}>
          <ChartCard title="การใช้งานรถแต่ละประเภท" loading={loading}>
            <SimpleBarChart data={getVehicleUsageChartData()} height={280} />
          </ChartCard>
        </Col>
      </Row>

      {/* Charts Row 2 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <ChartCard title="เส้นทางยอดนิยม" loading={loading}>
            <SimpleBarChart data={getPopularRoutesChartData()} height={280} />
          </ChartCard>
        </Col>
        <Col xs={24} lg={12}>
          <RecentActivityList
            title="กิจกรรมการจองล่าสุด"
            activities={getRecentActivities()}
            loading={loading}
            maxItems={5}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardCar;
