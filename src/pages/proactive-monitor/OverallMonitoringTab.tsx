// src/pages/proactive-monitor/OverallMonitoringTab.tsx

import React, { useMemo, useState } from "react";
import { Table, DatePicker, Row, Col, Card } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import {
  CARRIER_OPTIONS,
  LIST_TIEM_SLOTS,
  TABLE,
  DATE_FORMATS,
  REGION_OPTIONS,
  STATUS_OPTIONS,
  CHART_LABEL_STYLE,
  PLANT_OPTIONS,
} from "../../constant/constants";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import { useTranslation } from "react-i18next";

interface PlantLoadData {
  timeSlot: string;
  [key: string]: string | number;
}

interface ShipmentData {
  key: string;
  shipmentNo: string;
  plant: string;
  carrier: string;
  shipmentStatus: string;
  region: string;
  plantLoadDate: string;
  loadingScheduled: string;
  timeSlot: string;
  booked: string;
}

// Mock Data - ข้อมูล Shipment ตัวอย่าง (ใช้ value จาก Constants)
const MOCK_SHIPMENT_DATA: Omit<
  ShipmentData,
  "key" | "plantLoadDate" | "booked"
>[] = [
  {
    shipmentNo: "SH000001",
    plant: "snk", // PLANT_OPTIONS[0].value
    carrier: "KERRY_EXPRESS", // CARRIER_OPTIONS[0].value
    shipmentStatus: "001", // STATUS_OPTIONS[0].value - Loading Scheduler
    region: "CENTRAL", // REGION_OPTIONS[2].value - นครหลวง
    loadingScheduled: "080000", // LIST_TIME_OPTIONS[0].value
    timeSlot: "08:00 - 09:00",
  },
  {
    shipmentNo: "SH000002",
    plant: "glx", // PLANT_OPTIONS[1].value
    carrier: "FLASH_EXPRESS", // CARRIER_OPTIONS[1].value
    shipmentStatus: "002", // STATUS_OPTIONS[1].value - Booked
    region: "EAST", // REGION_OPTIONS[3].value - ตะวันออก
    loadingScheduled: "093000", // LIST_TIME_OPTIONS[3].value
    timeSlot: "09:00 - 10:00",
  },
  {
    shipmentNo: "SH000003",
    plant: "ssi", // PLANT_OPTIONS[2].value
    carrier: "JT_EXPRESS", // CARRIER_OPTIONS[2].value
    shipmentStatus: "003", // STATUS_OPTIONS[2].value - Start Pick
    region: "NORTHEAST", // REGION_OPTIONS[1].value - อีสาน
    loadingScheduled: "100000", // LIST_TIME_OPTIONS[4].value
    timeSlot: "10:00 - 11:00",
  },
  {
    shipmentNo: "SH000004",
    plant: "snk", // PLANT_OPTIONS[0].value
    carrier: "THAILAND_POST", // CARRIER_OPTIONS[3].value
    shipmentStatus: "004", // STATUS_OPTIONS[3].value - End Pick
    region: "NORTH", // REGION_OPTIONS[0].value - เหนือ
    loadingScheduled: "113000", // LIST_TIME_OPTIONS[7].value
    timeSlot: "11:00 - 12:00",
  },
  {
    shipmentNo: "SH000005",
    plant: "snk", // PLANT_OPTIONS[0].value
    carrier: "KERRY_EXPRESS", // CARRIER_OPTIONS[0].value
    shipmentStatus: "005", // STATUS_OPTIONS[4].value - RTS
    region: "WEST", // REGION_OPTIONS[4].value - ตะวันตก
    loadingScheduled: "140000", // LIST_TIME_OPTIONS[12].value
    timeSlot: "14:00 - 15:00",
  },
];

// Helper functions เพื่อแปลง value เป็น label
const getPlantLabel = (value: string) => {
  return PLANT_OPTIONS.find((p) => p.value === value)?.label || value;
};

const getCarrierLabel = (value: string) => {
  return CARRIER_OPTIONS.find((c) => c.value === value)?.label || value;
};

const getStatusLabel = (value: string) => {
  return STATUS_OPTIONS.find((s) => s.value === value)?.label || value;
};

const getRegionLabel = (value: string) => {
  return REGION_OPTIONS.find((r) => r.value === value)?.label || value;
};

const OverallMonitoringTab: React.FC = () => {
  const { t } = useTranslation(); // เพิ่ม useTranslation hook
  // State สำหรับวันที่ที่เลือก - Default เป็นวันปัจจุบัน
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  // ข้อมูล Mock สำหรับตาราง Shipment (ใช้ข้อมูล JSON แทนการสุ่ม)
  const shipmentDataSource = useMemo(() => {
    return MOCK_SHIPMENT_DATA.map((item, index) => ({
      ...item,
      key: `shipment-${index}`,
      plantLoadDate: selectedDate.format(DATE_FORMATS.DISPLAY),
      booked: selectedDate
        .subtract(Math.floor(Math.random() * 3), "day")
        .format(DATE_FORMATS.DISPLAY_WITH_TIME),
    }));
  }, [selectedDate]);

  // คำนวณข้อมูลสำหรับกราฟจำนวนตามภาค - จากข้อมูล shipmentDataSource
  const regionData = useMemo(() => {
    const regionCounts: { [key: string]: number } = {};

    // นับจำนวน shipment แต่ละภาค (ใช้ label)
    shipmentDataSource.forEach((shipment) => {
      const regionLabel = getRegionLabel(shipment.region);
      regionCounts[regionLabel] = (regionCounts[regionLabel] || 0) + 1;
    });

    // แปลงเป็น format ที่กราฟต้องการ
    return REGION_OPTIONS.map((region) => ({
      region: region.label,
      count: regionCounts[region.label] || 0,
    }));
  }, [shipmentDataSource]);

  // คำนวณข้อมูลสำหรับกราฟจำนวนตาม Status - จากข้อมูล shipmentDataSource
  const statusData = useMemo(() => {
    const statusCounts: { [key: string]: number } = {};

    // นับจำนวน shipment แต่ละ status (ใช้ label)
    shipmentDataSource.forEach((shipment) => {
      const statusLabel = getStatusLabel(shipment.shipmentStatus);
      statusCounts[statusLabel] = (statusCounts[statusLabel] || 0) + 1;
    });

    // แปลงเป็น format ที่กราฟต้องการ
    return STATUS_OPTIONS.map((status) => ({
      status: status.label,
      count: statusCounts[status.label] || 0,
    }));
  }, [shipmentDataSource]);

  // สร้างข้อมูล mock สำหรับแต่ละช่วงเวลา (คำนวณจากข้อมูล shipmentDataSource)
  const dataSource = useMemo(() => {
    const result = LIST_TIEM_SLOTS.map((timeSlot, index) => {
      const data: PlantLoadData = {
        timeSlot,
        key: `time-${index}`,
      };

      // กรองข้อมูล shipment ที่ตรงกับ timeSlot นี้
      const shipmentsInSlot = shipmentDataSource.filter(
        (s) => s.timeSlot === timeSlot
      );

      // นับจำนวนแต่ละ plant
      let totalCount = 0;
      for (const plant of PLANT_OPTIONS) {
        const plantCount = shipmentsInSlot.filter(
          (s) => s.plant === plant.value
        ).length;
        data[plant.value] = plantCount;
        totalCount += plantCount;
      }
      data.total = totalCount;

      return data;
    });
    return result;
  }, [shipmentDataSource]);

  // คำนวณผลรวมของแต่ละ plant
  const plantTotals = useMemo(() => {
    const totals: { [key: string]: number } = {};
    PLANT_OPTIONS.forEach((plant) => {
      totals[plant.value] = dataSource.reduce((sum, record) => {
        return sum + (record[plant.value] as number);
      }, 0);
    });
    return totals;
  }, [dataSource]);

  // คำนวณผลรวมทั้งหมด
  plantTotals["total"] = dataSource.reduce((sum, record) => {
    return sum + (record.total as number);
  }, 0);

  // สร้าง columns สำหรับตาราง Plant Load
  const columns: ColumnsType<PlantLoadData> = [
    {
      title: "Plant Load Time",
      dataIndex: "timeSlot",
      key: "timeSlot",
      width: 100,
      fixed: "left",
      align: "center" as const,
      render: (timeSlot: string) => (
        <span style={{ fontWeight: "bold", fontSize: "14px" }}>{timeSlot}</span>
      ),
    },
    {
      title: "Plant",
      key: "plant",
      children: [
        ...PLANT_OPTIONS.map((plant) => ({
          title: (
            <div>
              <div>{plant.label}</div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#52c41a",
                  marginTop: "4px",
                }}
              >
                {t("labels.sum")}: {plantTotals[plant.value]}
              </div>
            </div>
          ),
          dataIndex: plant.value,
          key: plant.value,
          width: 150,
          align: "center" as const,
          render: (value: number) => (
            <span
              style={{
                fontWeight: value > 0 ? "600" : "normal",
                color: value > 0 ? "#1890ff" : "#d9d9d9",
              }}
            >
              {value || 0}
            </span>
          ),
        })),
        {
          title: (
            <div>
              <div>{t("labels.total")}</div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#52c41a",
                  marginTop: "4px",
                }}
              >
                {t("labels.sum")}: {plantTotals["total"] || 0}
              </div>
            </div>
          ),
          dataIndex: "total",
          key: "total",
          width: 120,
          align: "center" as const,
          render: (value: number) => (
            <span
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                color:
                  value > 0
                    ? "var(--color-primary)"
                    : "var(--color-text-disabled)",
              }}
            >
              {value}
            </span>
          ),
        },
      ],
    },
  ];

  // สร้าง columns สำหรับตาราง Shipment
  const shipmentColumns: ColumnsType<ShipmentData> = [
    {
      title: "Shipment No",
      dataIndex: "shipmentNo",
      key: "shipmentNo",
      width: 130,
      fixed: "left",
      align: "center" as const,
      render: (shipmentNo: string) => (
        <span style={{ fontWeight: "600", color: "#1890ff" }}>
          {shipmentNo}
        </span>
      ),
    },
    {
      title: "Plant",
      dataIndex: "plant",
      key: "plant",
      width: 100,
      align: "center" as const,
      render: (plant: string) => (
        <span style={{ fontWeight: "500" }}>{getPlantLabel(plant)}</span>
      ),
    },
    {
      title: "Carrier",
      dataIndex: "carrier",
      key: "carrier",
      width: 150,
      align: "center" as const,
      render: (carrier: string) => getCarrierLabel(carrier),
    },
    {
      title: "Shipment Status",
      dataIndex: "shipmentStatus",
      key: "shipmentStatus",
      width: 150,
      align: "center" as const,
      render: (status: string) => (
        <span
          style={{
            padding: "4px 12px",
            borderRadius: "4px",
            backgroundColor: "#e6f7ff",
            color: "#1890ff",
            fontWeight: "500",
          }}
        >
          {getStatusLabel(status)}
        </span>
      ),
    },
    {
      title: "Plant Load Date",
      dataIndex: "plantLoadDate",
      key: "plantLoadDate",
      width: 130,
      align: "center" as const,
    },
    {
      title: "Loading Scheduled",
      dataIndex: "loadingScheduled",
      key: "loadingScheduled",
      width: 150,
      align: "center" as const,
      render: (time: string) => {
        // แปลง "080000" เป็น "08:00"
        const formattedTime = `${time.substring(0, 2)}:${time.substring(2, 4)}`;
        return (
          <span style={{ fontWeight: "600", color: "#52c41a" }}>
            {formattedTime}
          </span>
        );
      },
    },
    {
      title: "Booked",
      dataIndex: "booked",
      key: "booked",
      width: 180,
      align: "center" as const,
    },
  ];

  return (
    <div>
      {/* ช่องเลือกวันที่และสรุปข้อมูล */}
      <Row gutter={16} style={{ marginBottom: "16px" }}>
        <Col xs={24} sm={24} md={18}>
          <h3>Overall Monitoring - Plant Load Summary</h3>
          <p style={{ color: "#8c8c8c" }}>
            สรุปภาพรวมการโหลดสินค้าของแต่ละ Plant ตามช่วงเวลา (08:00 - 05:00)
          </p>
        </Col>
        <Col xs={24} sm={24} md={6}>
          <Card size="small">
            <DatePicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date || dayjs())}
              format={DATE_FORMATS.DISPLAY}
              style={{ width: "100%" }}
              placeholder="เลือกวันที่"
              allowClear={false}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey="key"
            pagination={{
              pageSize: TABLE.pageSizeDefault,
              // showTotal: (total) => `ทั้งหมด ${total} ช่วงเวลา`,
            }}
            scroll={{ x: 1000 }}
            bordered
            size="middle"
          />
        </Col>
      </Row>

      {/* Charts Section - Region and Status */}
      <Row gutter={16} style={{ marginTop: "12px" }}>
        {/* ด้านซ้าย: กราฟแท่งแนวนอนแยกตามภาค */}
        <Col xs={24} lg={12}>
          <Card title="จำนวน Shipment แยกตามภาค" style={{ height: "100%" }}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={regionData} layout="vertical">
                <defs>
                  <linearGradient id="colorRegion" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="region" type="category" width={80} />
                <Tooltip />
                <Bar
                  dataKey="count"
                  name="จำนวน"
                  fill="url(#colorRegion)"
                  radius={[0, 8, 8, 0]}
                >
                  <LabelList
                    dataKey="count"
                    position="right"
                    style={CHART_LABEL_STYLE}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* ด้านขวา: กราฟแท่งแนวนอนแยกตาม Status */}
        <Col xs={24} lg={12}>
          <Card title="จำนวน Shipment แยกตาม Status" style={{ height: "100%" }}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={statusData} layout="vertical">
                <defs>
                  <linearGradient id="colorStatus" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ff7c7c" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="status" type="category" width={130} />
                <Tooltip />
                <Bar
                  dataKey="count"
                  name="จำนวน"
                  fill="url(#colorStatus)"
                  radius={[0, 8, 8, 0]}
                >
                  <LabelList
                    dataKey="count"
                    position="right"
                    style={CHART_LABEL_STYLE}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "12px" }}>
        {/* ตารางข้อมูล Shipment */}
        <Col span={24}>
          <Card title="รายละเอียด Shipment" style={{ marginTop: "16px" }}>
            <Table
              columns={shipmentColumns}
              dataSource={shipmentDataSource}
              rowKey="key"
              pagination={{
                pageSize: TABLE.pageSizeDefault,
              }}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OverallMonitoringTab;
