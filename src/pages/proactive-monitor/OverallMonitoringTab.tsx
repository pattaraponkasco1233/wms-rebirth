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
  plantLoadDate: string;
  loadingScheduled: string;
  booked: string;
}

const OverallMonitoringTab: React.FC = () => {
  const { t } = useTranslation(); // เพิ่ม useTranslation hook
  // State สำหรับวันที่ที่เลือก - Default เป็นวันปัจจุบัน
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  // ข้อมูล Mock สำหรับกราฟจำนวนตามภาค - ดึง label จาก REGION_OPTIONS และ mock เฉพาะ count
  const regionData = useMemo(() => {
    return REGION_OPTIONS.map((region) => ({
      region: region.label,
      count: Math.floor(Math.random() * 100) + 50,
    }));
  }, [selectedDate]);

  // ข้อมูล Mock สำหรับกราฟจำนวนตาม Status - ดึง label จาก STATUS_OPTIONS และ mock เฉพาะ count
  const statusData = useMemo(() => {
    return STATUS_OPTIONS.map((status) => ({
      status: status.label,
      count: Math.floor(Math.random() * 50) + 10,
    }));
  }, [selectedDate]);

  // ข้อมูล Mock สำหรับตาราง Shipment
  const shipmentDataSource = useMemo(() => {
    const plants = ["SNK", "GLX", "SSI", "SSF"];
    const carriers = CARRIER_OPTIONS.map((c) => c.label);
    const statuses = STATUS_OPTIONS.map((s) => s.label);

    return Array.from({ length: 20 }, (_, index) => ({
      key: `shipment-${index}`,
      shipmentNo: `SH${String(index + 1).padStart(6, "0")}`,
      plant: plants[Math.floor(Math.random() * plants.length)],
      carrier: carriers[Math.floor(Math.random() * carriers.length)],
      shipmentStatus: statuses[Math.floor(Math.random() * statuses.length)],
      plantLoadDate: selectedDate.format(DATE_FORMATS.DISPLAY),
      loadingScheduled: `${String(Math.floor(Math.random() * 17) + 8).padStart(
        2,
        "0"
      )}:${["00", "30"][Math.floor(Math.random() * 2)]}`,
      booked: selectedDate
        .subtract(Math.floor(Math.random() * 3), "day")
        .format(DATE_FORMATS.DISPLAY_WITH_TIME),
    }));
  }, [selectedDate]);

  // สร้างข้อมูล mock สำหรับแต่ละช่วงเวลา (ในอนาคตจะดึงจาก API ตาม selectedDate)
  const dataSource = useMemo(() => {
    return LIST_TIEM_SLOTS.map((timeSlot, index) => {
      const data: PlantLoadData = {
        timeSlot,
        key: `time-${index}`,
      };

      // สร้างข้อมูลสุ่มสำหรับแต่ละ carrier
      CARRIER_OPTIONS.forEach((carrier) => {
        // สุ่มจำนวน 0-10
        data[carrier.value] = Math.floor(Math.random() * 11);
      });

      // คำนวณ total
      data.total = CARRIER_OPTIONS.reduce((sum, carrier) => {
        return sum + (data[carrier.value] as number);
      }, 0);
      /*
      json = [{
    "timeSlot": "08:00 - 09:00",
    "key": "time-0",
    "KERRY_EXPRESS": 8,
    "FLASH_EXPRESS": 6,
    "JT_EXPRESS": 4,
    "THAILAND_POST": 3,
    "total": 21
        },{
    "timeSlot": "09:00 - 10:00",
    "key": "time-1",
    "KERRY_EXPRESS": 2,
    "FLASH_EXPRESS": 2,
    "JT_EXPRESS": 8,
    "THAILAND_POST": 2,
    "total": 14
}
    
        ]
      */
      return data;
    });
  }, [selectedDate]); // เพิ่m selectedDate เป็น dependency

  // คำนวณผลรวมของแต่ละ carrier
  const carrierTotals = useMemo(() => {
    const totals: { [key: string]: number } = {};
    CARRIER_OPTIONS.forEach((carrier) => {
      totals[carrier.value] = dataSource.reduce((sum, record) => {
        return sum + (record[carrier.value] as number);
      }, 0);
    });
    return totals;
  }, [dataSource]);

  // คำนวณผลรวมทั้งหมด
  carrierTotals["total"] = dataSource.reduce((sum, record) => {
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
        ...CARRIER_OPTIONS.map((carrier) => ({
          title: (
            <div>
              <div>{carrier.label}</div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#52c41a",
                  marginTop: "4px",
                }}
              >
                {t("labels.sum")}: {carrierTotals[carrier.value]}
              </div>
            </div>
          ),
          dataIndex: carrier.value,
          key: carrier.value,
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
                {t("labels.sum")}: {carrierTotals["total"] || 0}
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
        <span style={{ fontWeight: "500" }}>{plant}</span>
      ),
    },
    {
      title: "Carrier",
      dataIndex: "carrier",
      key: "carrier",
      width: 150,
      align: "center" as const,
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
          {status}
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
      render: (time: string) => (
        <span style={{ fontWeight: "600", color: "#52c41a" }}>{time}</span>
      ),
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
