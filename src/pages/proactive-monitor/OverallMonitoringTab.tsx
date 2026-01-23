// src/pages/proactive-monitor/OverallMonitoringTab.tsx

import React, { useMemo, useState, useEffect } from "react";
import { Table, DatePicker, Row, Col, Card, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import {
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
import {
  getPlantLabel,
  getCarrierLabel,
  getStatusLabel,
  getRegionLabel,
  formatTimeHHMMSS,
} from "../../utils/formatters";
import { OVERALL_MONITORING_STYLES } from "./styles";
import {
  fetchShipmentData,
  ShipmentApiResponse,
} from "../../services/api/proactiveMonitorApi";

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

const OverallMonitoringTab: React.FC = () => {
  const { t } = useTranslation(); // เพิ่ม useTranslation hook
  // State สำหรับวันที่ที่เลือก - Default เป็นวันปัจจุบัน
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  // State สำหรับเก็บข้อมูลจาก API
  const [apiData, setApiData] = useState<ShipmentApiResponse[]>([]);
  // State สำหรับ loading
  const [loading, setLoading] = useState<boolean>(false);

  // Effect สำหรับดึงข้อมูลจาก API เมื่อเปลี่ยนวันที่
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchShipmentData(selectedDate);
        setApiData(data);
      } catch (error) {
        console.error("Error loading shipment data:", error);
        setApiData([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedDate]);

  // ข้อมูล Mock สำหรับตาราง Shipment (ใช้ข้อมูล JSON แทนการสุ่ม)
  const shipmentDataSource = useMemo(() => {
    return apiData.map((item, index) => ({
      ...item,
      key: `shipment-${index}`,
      plantLoadDate: selectedDate.format(DATE_FORMATS.DISPLAY),
      booked: selectedDate
        .subtract(Math.floor(Math.random() * 3), "day")
        .format(DATE_FORMATS.DISPLAY_WITH_TIME),
    }));
  }, [apiData, selectedDate]);

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
        (s) => s.timeSlot === timeSlot,
      );

      // นับจำนวนแต่ละ plant
      let totalCount = 0;
      for (const plant of PLANT_OPTIONS) {
        const plantCount = shipmentsInSlot.filter(
          (s) => s.plant === plant.value,
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
        <span style={OVERALL_MONITORING_STYLES.timeSlot}>{timeSlot}</span>
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
              <div style={OVERALL_MONITORING_STYLES.plantSum}>
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
              style={
                value > 0
                  ? OVERALL_MONITORING_STYLES.activeValue
                  : OVERALL_MONITORING_STYLES.inactiveValue
              }
            >
              {value || 0}
            </span>
          ),
        })),
        {
          title: (
            <div>
              <div>{t("labels.total")}</div>
              <div style={OVERALL_MONITORING_STYLES.plantSum}>
                {t("labels.sum")}: {plantTotals["total"] || 0}
              </div>
            </div>
          ),
          dataIndex: "total",
          key: "total",
          width: 120,
          align: "center" as const,
          render: (value: number) => (
            <span style={OVERALL_MONITORING_STYLES.totalValue}>{value}</span>
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
        <span style={OVERALL_MONITORING_STYLES.shipmentNo}>{shipmentNo}</span>
      ),
    },
    {
      title: "Plant",
      dataIndex: "plant",
      key: "plant",
      width: 100,
      align: "center" as const,
      render: (plant: string) => (
        <span style={OVERALL_MONITORING_STYLES.plantLabel}>
          {getPlantLabel(plant)}
        </span>
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
        <span style={OVERALL_MONITORING_STYLES.statusBadge}>
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
        const formattedTime = formatTimeHHMMSS(time);
        return (
          <span style={OVERALL_MONITORING_STYLES.scheduledTime}>
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
      <Spin spinning={loading} tip="กำลังโหลดข้อมูล...">
        <Row gutter={16} style={{ marginBottom: "16px" }}>
          <Col xs={24} sm={24} md={10}>
            <Table
              columns={columns}
              dataSource={dataSource}
              rowKey="key"
              pagination={false}
              // pagination={{
              //   pageSize: TABLE.pageSizeDefault,
              //   // showTotal: (total) => `ทั้งหมด ${total} ช่วงเวลา`,
              // }}
              // scroll={{ x: 500 }}
              bordered
              size="small"
            />
          </Col>
          <Col xs={24} sm={24} md={14}>
            <Card>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <span>Oparation Date</span>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <DatePicker
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date || dayjs())}
                    format={DATE_FORMATS.DISPLAY}
                    style={{ width: "100%" }}
                    placeholder="เลือกวันที่"
                    allowClear={false}
                    disabled={loading}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} lg={12}>
                  <Card
                    title="จำนวน Shipment แยกตามภาค"
                    style={{ height: "100%" }}
                  >
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={regionData} layout="vertical">
                        <defs>
                          <linearGradient
                            id="colorRegion"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="0"
                          >
                            <stop
                              offset="5%"
                              stopColor="#8884d8"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#82ca9d"
                              stopOpacity={0.8}
                            />
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
                            position="center"
                            style={CHART_LABEL_STYLE}
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
                {/* ด้านขวา: กราฟแท่งแนวนอนแยกตาม Status */}
                <Col xs={24} lg={12}>
                  <Card
                    title="จำนวน Shipment แยกตาม Status"
                    style={{ height: "100%" }}
                  >
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={statusData} layout="vertical">
                        <defs>
                          <linearGradient
                            id="colorStatus"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="0"
                          >
                            <stop
                              offset="5%"
                              stopColor="#ffc658"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#ff7c7c"
                              stopOpacity={0.8}
                            />
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
                            position="center"
                            style={CHART_LABEL_STYLE}
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
              </Row>
            </Card>
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              <Col span={24}>
                <Table
                  columns={shipmentColumns}
                  dataSource={shipmentDataSource}
                  rowKey="key"
                  bordered
                  pagination={{
                    pageSize: TABLE.pageSizeDefault,
                  }}
                  size="small"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default OverallMonitoringTab;
