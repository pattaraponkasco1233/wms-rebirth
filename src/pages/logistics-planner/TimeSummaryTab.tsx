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
  CARRIER_OPTIONS,
  VEHICLE_TYPE_OPTIONS,
  LIST_TIME_OPTIONS,
} from "../../constant/constants";
import { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";

const { Option } = Select;

interface TimeSummaryTabProps {
  shipments: LogisticsShipment[];
  onFilterChange: (filteredShipments: LogisticsShipment[]) => void;
}

const TimeSummaryTab: React.FC<TimeSummaryTabProps> = ({
  shipments,
  onFilterChange,
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

  // ค้นหาข้อมูล
  const handleSearch = () => {
    setAppliedFilterPlant(filterPlant);
    setAppliedFilterLicense(filterLicense);
    setAppliedFilterShipmentNo(filterShipmentNo);
    setAppliedFilterRoute(filterRoute);
    setAppliedFilterDate(filterDate);
    setAppliedFilterTime(filterTime);
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
  };

  // Columns สำหรับตาราง
  const columns: ColumnsType<TimeSlotSummary> = [
    {
      title: "ช่วงเวลา",
      dataIndex: "timeSlot",
      key: "timeSlot",
      width: 120,
      fixed: "left",
      render: (timeSlot: string) => (
        <span style={{ fontWeight: "bold" }}>{timeSlot}</span>
      ),
    },
    {
      title: "Plant",
      dataIndex: "plant",
      key: "plant",
      width: 150,
      render: (plant: string) => (
        <span style={{ fontWeight: "bold" }}>{plant}</span>
      ),
      children: CARRIER_OPTIONS.map((carrier) => ({
        title: carrier.label,
        dataIndex: carrier.value,
        key: carrier.value,
        width: 150,
        children: [
          ...VEHICLE_TYPE_OPTIONS.map((vehicleType) => ({
            title: vehicleType.label,
            dataIndex: `${carrier.value}_${vehicleType.value}`,
            key: `${carrier.value}_${vehicleType.value}`,
            width: 100,
            align: "center" as const,
            render: (value: number) => (
              <span style={{ fontWeight: value > 0 ? "bold" : "normal" }}>
                {value || 0}
              </span>
            ),
          })),
          {
            title: "Total",
            dataIndex: `${carrier.value}_total`,
            key: `${carrier.value}_total`,
            width: 100,
            align: "center" as const,
            render: (_: any, record: TimeSlotSummary) => {
              // คำนวณผลรวมของทุก vehicle type ใน carrier นี้
              const total = VEHICLE_TYPE_OPTIONS.reduce((sum, vehicleType) => {
                const key =
                  `${carrier.value}_${vehicleType.value}` as keyof TimeSlotSummary;
                const value = (record[key] as number) || 0;
                return sum + value;
              }, 0);
              return (
                <span
                  style={{
                    fontWeight: "bold",
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
      width: 150,
      align: "center",
      render: (count: number) => (
        <span
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color:
              count > 0 ? "var(--color-primary)" : "var(--color-text-disabled)",
          }}
        >
          {count}
        </span>
      ),
    },
    // {
    //   title: "รายละเอียด",
    //   dataIndex: "shipments",
    //   key: "shipments",
    //   render: (shipments: LogisticsShipment[]) => (
    //     <div>
    //       {shipments.length > 0 ? (
    //         <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
    //           {shipments.map((shipment) => (
    //             <div
    //               key={shipment.id}
    //               style={{
    //                 padding: "4px 8px",
    //                 backgroundColor: "#e6f7ff",
    //                 border: "1px solid #91d5ff",
    //                 borderRadius: "4px",
    //                 fontSize: "12px",
    //               }}
    //             >
    //               {shipment.shipmentNo} - {shipment.route}
    //             </div>
    //           ))}
    //         </div>
    //       ) : (
    //         <span style={{ color: "#d9d9d9" }}>-</span>
    //       )}
    //     </div>
    //   ),
    // },
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
            pagination={{
              pageSize: TABLE.pageSizeDefault,
              //   showSizeChanger: true,
              showTotal: (total) => `ทั้งหมด ${total} ช่วงเวลา`,
            }}
            bordered
          />
        </Col>
        <Col span={6}>
          <Card>
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
                >
                  {t("actions.search")}
                </Button>
              </Col>
              <Col xs={24} sm={12} md={12}>
                <Button onClick={handleResetFilters}>
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
