// src/pages/logistics-planner/TimeSummaryTab.tsx

import React, { useMemo, useState, useEffect } from "react";
import { Table, Input, Select, Row, Col, Card, Button, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  LogisticsShipment,
  TimeSlotSummary,
  calculateTimeSlotSummary,
} from "../../models/logistics-planner/logistics-planner.model";
import {
  TABLE,
  PLANT_OPTIONS,
  VEHICLE_TYPE_OPTIONS,
  LIST_TIME_OPTIONS,
} from "../../constant/constants";
import { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";

const { Option } = Select;

interface TimeSummaryTabProps {
  shipments: LogisticsShipment[];
  onFilterChange: (filteredShipments: LogisticsShipment[]) => void;
  onSearch: (filters: {
    plant?: string;
    license?: string;
    shipmentNo?: string;
    route?: string;
    date?: string;
    time?: string;
  }) => void;
}

const TimeSummaryTab: React.FC<TimeSummaryTabProps> = ({
  shipments,
  onFilterChange,
  onSearch,
}) => {
  const { t } = useTranslation();

  // Filter states
  const [filterPlant, setFilterPlant] = useState<string>("");
  const [filterLicense, setFilterLicense] = useState<string>("");
  const [filterShipmentNo, setFilterShipmentNo] = useState<string>("");
  const [filterRoute, setFilterRoute] = useState<string>("");
  const [filterDate, setFilterDate] = useState<Dayjs | null>(null);
  const [filterTime, setFilterTime] = useState<string>("");

  // Applied filter states (ค่าที่ใช้กรองจริง)
  const [appliedFilterPlant, setAppliedFilterPlant] = useState<string>("");
  const [appliedFilterLicense, setAppliedFilterLicense] = useState<string>("");
  const [appliedFilterShipmentNo, setAppliedFilterShipmentNo] =
    useState<string>("");
  const [appliedFilterRoute, setAppliedFilterRoute] = useState<string>("");
  const [appliedFilterDate, setAppliedFilterDate] = useState<Dayjs | null>(
    null,
  );
  const [appliedFilterTime, setAppliedFilterTime] = useState<string>("");

  // กรองข้อมูล
  const filteredShipments = useMemo(() => {
    return shipments.filter((shipment) => {
      const matchPlant = appliedFilterPlant
        ? shipment.plant
            .toLowerCase()
            .includes(appliedFilterPlant.toLowerCase())
        : true;
      const matchLicense = appliedFilterLicense
        ? shipment.truckLicense
            .toLowerCase()
            .includes(appliedFilterLicense.toLowerCase())
        : true;
      const matchShipmentNo = appliedFilterShipmentNo
        ? shipment.shipmentNo
            .toLowerCase()
            .includes(appliedFilterShipmentNo.toLowerCase())
        : true;
      const matchRoute = appliedFilterRoute
        ? shipment.route
            .toLowerCase()
            .includes(appliedFilterRoute.toLowerCase())
        : true;
      const matchDate = appliedFilterDate
        ? shipment.loadDate === appliedFilterDate.format("DDMMYYYY")
        : true;
      const matchTime = appliedFilterTime
        ? shipment.firstTime === appliedFilterTime
        : true;

      return (
        matchPlant &&
        matchLicense &&
        matchShipmentNo &&
        matchRoute &&
        matchDate &&
        matchTime
      );
    });
  }, [
    shipments,
    appliedFilterPlant,
    appliedFilterLicense,
    appliedFilterShipmentNo,
    appliedFilterRoute,
    appliedFilterDate,
    appliedFilterTime,
  ]);

  // ส่งข้อมูลที่กรองแล้วไปยัง parent component
  useEffect(() => {
    onFilterChange(filteredShipments);
  }, [filteredShipments, onFilterChange]);

  // คำนวณข้อมูลสรุปตามช่วงเวลาจากข้อมูลที่กรองแล้ว
  const timeSlotSummary = useMemo(() => {
    return calculateTimeSlotSummary(filteredShipments);
  }, [filteredShipments]);

  // คำนวณสรุปตาม Status
  const statusSummary = useMemo(() => {
    const pending = filteredShipments.filter((s) => s.status === "001").length;
    const assigned = filteredShipments.filter((s) => s.status === "002").length;
    const interfaced = filteredShipments.filter(
      (s) => s.status === "003",
    ).length;
    const total = filteredShipments.length;

    return { pending, assigned, interfaced, total };
  }, [filteredShipments]);

  // ค้นหาข้อมูล
  const handleSearch = () => {
    setAppliedFilterPlant(filterPlant);
    setAppliedFilterLicense(filterLicense);
    setAppliedFilterShipmentNo(filterShipmentNo);
    setAppliedFilterRoute(filterRoute);
    setAppliedFilterDate(filterDate);
    setAppliedFilterTime(filterTime);

    // เรียก API ผ่าน callback
    onSearch({
      plant: filterPlant,
      license: filterLicense,
      shipmentNo: filterShipmentNo,
      route: filterRoute,
      date: filterDate?.format("DDMMYYYY"),
      time: filterTime,
    });
  };

  // รีเซ็ตฟิลเตอร์
  const handleResetFilters = () => {
    setFilterPlant("");
    setFilterLicense("");
    setFilterShipmentNo("");
    setFilterRoute("");
    setFilterDate(null);
    setFilterTime("");
    setAppliedFilterPlant("");
    setAppliedFilterLicense("");
    setAppliedFilterShipmentNo("");
    setAppliedFilterRoute("");
    setAppliedFilterDate(null);
    setAppliedFilterTime("");

    // เรียก API โดยไม่มี filter
    onSearch({});
  };

  // Columns สำหรับตาราง
  const columns: ColumnsType<TimeSlotSummary> = [
    {
      title: "ช่วงเวลา",
      dataIndex: "timeSlot",
      key: "timeSlot",
      width: 100,
      fixed: "left",
      render: (timeSlot: string) => (
        <span style={{ fontWeight: "bold", fontSize: "12px" }}>{timeSlot}</span>
      ),
    },
    {
      title: "Plant",
      dataIndex: "plant",
      key: "plant",
      width: 120,
      render: (plant: string) => (
        <span style={{ fontWeight: "bold" }}>{plant}</span>
      ),
      children: PLANT_OPTIONS.map((plant) => ({
        title: plant.label,
        dataIndex: plant.value,
        key: plant.value,
        width: 120,
        children: [
          ...VEHICLE_TYPE_OPTIONS.map((vehicleType) => ({
            title: vehicleType.label,
            dataIndex: `${plant.value}_${vehicleType.value}`,
            key: `${plant.value}_${vehicleType.value}`,
            width: 60,
            align: "center" as const,
            render: (value: number) => (
              <span
                style={{
                  fontWeight: value > 0 ? "bold" : "normal",
                  fontSize: "12px",
                }}
              >
                {value || 0}
              </span>
            ),
          })),
          {
            title: "Total",
            dataIndex: `${plant.value}_total`,
            key: `${plant.value}_total`,
            width: 60,
            align: "center" as const,
            render: (_: any, record: TimeSlotSummary) => {
              // คำนวณผลรวมของทุก vehicle type ใน plant นี้
              const total = VEHICLE_TYPE_OPTIONS.reduce((sum, vehicleType) => {
                const key =
                  `${plant.value}_${vehicleType.value}` as keyof TimeSlotSummary;
                const value = (record[key] as number) || 0;
                return sum + value;
              }, 0);
              return (
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    color:
                      total > 0
                        ? "var(--color-success)"
                        : "var(--color-text-disabled)",
                  }}
                >
                  {total}
                </span>
              );
            },
          },
        ],
      })),
    },
    {
      title: "Total",
      dataIndex: "count",
      key: "count",
      width: 80,
      align: "center",
      fixed: "right",
      render: (count: number) => (
        <span
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color:
              count > 0 ? "var(--color-primary)" : "var(--color-text-disabled)",
          }}
        >
          {count}
        </span>
      ),
    },
  ];

  return (
    <div>
      {/* Filter Section */}
      <Row gutter={[16, 16]}>
        <Col span={18}>
          <Table
            columns={columns}
            dataSource={timeSlotSummary}
            rowKey="timeSlot"
            pagination={false}
            scroll={{ y: 400, x: "max-content" }}
            bordered
            size="small"
          />
        </Col>
        <Col span={6}>
          <Card>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Summary Status Shipment
                </span>
              </Col>
            </Row>
            <Row gutter={[8, 8]} style={{ marginTop: "10px" }}>
              <Col span={12}>
                <span style={{ fontWeight: "500" }}>Shipment Pending:</span>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "var(--color-warning)",
                    fontSize: "16px",
                  }}
                >
                  {statusSummary.pending}
                </span>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <span style={{ fontWeight: "500" }}>Shipment Assigned:</span>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "var(--color-info)",
                    fontSize: "16px",
                  }}
                >
                  {statusSummary.assigned}
                </span>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <span style={{ fontWeight: "500" }}>Shipment Interface:</span>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "var(--color-success)",
                    fontSize: "16px",
                  }}
                >
                  {statusSummary.interfaced}
                </span>
              </Col>
            </Row>
            <Row
              gutter={[8, 8]}
              style={{
                marginTop: "10px",
                paddingTop: "10px",
                borderTop: "2px solid #f0f0f0",
              }}
            >
              <Col span={12}>
                <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Shipment Total:
                </span>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "var(--color-primary)",
                    fontSize: "18px",
                  }}
                >
                  {statusSummary.total}
                </span>
              </Col>
            </Row>
          </Card>
          <Card className="mt-15">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={12}>
                <div>
                  <Input
                    placeholder="ค้นหา Plant"
                    value={filterPlant}
                    onChange={(e) => setFilterPlant(e.target.value)}
                  />
                </div>
              </Col>
              <Col xs={24} sm={12} md={12}>
                <div>
                  <Input
                    placeholder="ค้นหาทะเบียนรถ"
                    value={filterLicense}
                    onChange={(e) => setFilterLicense(e.target.value)}
                  />
                </div>
              </Col>
              <Col xs={24} sm={12} md={12}>
                <div>
                  <Input
                    placeholder="ค้นหา Route"
                    value={filterRoute}
                    onChange={(e) => setFilterRoute(e.target.value)}
                  />
                </div>
              </Col>
              <Col xs={24} sm={12} md={12}>
                <DatePicker
                  placeholder={t("truckCheckin.selectDate")}
                  format="DD/MM/YYYY"
                  value={filterDate}
                  onChange={(date) => setFilterDate(date)}
                  style={{ width: "100%" }}
                  allowClear
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: "10px" }}>
              <Col xs={24} sm={12} md={12}>
                <div>
                  <Input
                    placeholder="ค้นหา Shipment No"
                    value={filterShipmentNo}
                    onChange={(e) => setFilterShipmentNo(e.target.value)}
                  />
                </div>
              </Col>

              <Col xs={24} sm={12} md={12}>
                <Select
                  placeholder="เลือกเวลา First Time"
                  value={filterTime || undefined}
                  onChange={(val) => setFilterTime(val)}
                  style={{ width: "100%" }}
                  allowClear
                >
                  {LIST_TIME_OPTIONS.map((time) => (
                    <Option key={time.value} value={time.value}>
                      {time.label}
                    </Option>
                  ))}
                </Select>
              </Col>

              <Col xs={24} sm={12} md={12}>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleSearch}
                  className="btn-search-filter"
                >
                  {t("actions.search")}
                </Button>
              </Col>
              <Col xs={24} sm={12} md={12}>
                <Button
                  onClick={handleResetFilters}
                  className="btn-clear-filter"
                >
                  {t("actions.clearFilter")}
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TimeSummaryTab;
