// src/pages/logistics-planner/DataTableTab.tsx

import React, { useState, useMemo } from "react";
import {
  Table,
  Button,
  Space,
  Input,
  Select,
  Row,
  Col,
  Card,
  InputNumber,
  DatePicker,
} from "antd";
import { SearchOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  LogisticsShipment,
  VEHICLE_TYPES,
  CARRIERS,
} from "../../models/logistics-planner/logistics-planner.model";
import { TABLE, LIST_TIME_OPTIONS } from "../../constant/constants";

import { Dayjs } from "dayjs";

import { useTranslation } from "react-i18next";
import { formatDDMMYYYY } from "../../utils/Utils";

// ฟังก์ชันแปลงเวลาจาก HHMMSS เป็น HH:MM
const formatTime = (timeValue: string): string => {
  if (timeValue?.length !== 6) return timeValue;
  const hours = timeValue.substring(0, 2);
  const minutes = timeValue.substring(2, 4);
  return `${hours}:${minutes}`;
};

// ฟังก์ชันค้นหา label จาก LIST_TIME_OPTIONS
const getTimeLabel = (timeValue: string): string => {
  const option = LIST_TIME_OPTIONS.find((opt) => opt.value === timeValue);
  return option ? option.label : formatTime(timeValue);
};

const { Option } = Select;

interface DataTableTabProps {
  shipments: LogisticsShipment[];
  onUpdate: (shipment: LogisticsShipment) => void;
  onDelete: (id: string) => void;
}

const DataTableTab: React.FC<DataTableTabProps> = ({
  shipments,
  onUpdate,
  onDelete,
}) => {
  const { t } = useTranslation(); // เพิ่ม useTranslation hook
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
    null
  );
  const [appliedFilterTime, setAppliedFilterTime] = useState<string>("");

  // Edit states
  const [editingKey, setEditingKey] = useState<string>("");
  const [editData, setEditData] = useState<LogisticsShipment | null>(null);

  // ตรวจสอบว่ากำลังแก้ไขแถวนี้อยู่หรือไม่
  const isEditing = (record: LogisticsShipment) => record.id === editingKey;

  // เริ่มการแก้ไข
  const handleEdit = (record: LogisticsShipment) => {
    setEditingKey(record.id);
    setEditData({ ...record });
  };

  // ยกเลิกการแก้ไข
  const handleCancel = () => {
    setEditingKey("");
    setEditData(null);
  };

  // บันทึกการแก้ไข
  const handleSave = () => {
    if (editData) {
      onUpdate(editData);
      setEditingKey("");
      setEditData(null);
    }
  };

  // อัพเดทข้อมูลในโหมดแก้ไข
  const updateEditData = (field: keyof LogisticsShipment, value: any) => {
    if (editData) {
      setEditData({
        ...editData,
        [field]: value,
      });
    }
  };

  // กรองข้อมูล
  const filteredData = useMemo(() => {
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

  // Columns สำหรับตาราง
  const columns: ColumnsType<LogisticsShipment> = [
    {
      title: "Shipment No",
      dataIndex: "shipmentNo",
      key: "shipmentNo",
      width: 150,
      fixed: "left",
    },
    {
      title: "Plant",
      dataIndex: "plant",
      key: "plant",
      width: 120,
    },
    {
      title: "Route",
      dataIndex: "route",
      key: "route",
      width: 120,
    },
    {
      title: "Load Date",
      dataIndex: "loadDate",
      key: "loadDate",
      width: 120,
      render: (value: string) => {
        return formatDDMMYYYY(value);
      },
    },
    {
      title: "Job Number",
      dataIndex: "jobNumber",
      key: "jobNumber",
      width: 120,
    },
    {
      title: "Pick Sequence",
      dataIndex: "pickSequence",
      key: "pickSequence",
      width: 140,
      render: (value: number, record: LogisticsShipment) => {
        if (isEditing(record)) {
          return (
            <InputNumber
              value={editData?.pickSequence}
              onChange={(val) => updateEditData("pickSequence", val || 0)}
              style={{ width: "100%" }}
              min={0}
            />
          );
        }
        return value;
      },
    },
    {
      title: "Truck License",
      dataIndex: "truckLicense",
      key: "truckLicense",
      width: 150,
      render: (value: string, record: LogisticsShipment) => {
        if (isEditing(record)) {
          return (
            <Input
              value={editData?.truckLicense}
              onChange={(e) => updateEditData("truckLicense", e.target.value)}
            />
          );
        }
        return value;
      },
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicleType",
      key: "vehicleType",
      width: 150,
      render: (value: string, record: LogisticsShipment) => {
        if (isEditing(record)) {
          return (
            <Select
              value={editData?.vehicleType}
              onChange={(val) => updateEditData("vehicleType", val)}
              style={{ width: "100%" }}
            >
              {VEHICLE_TYPES.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          );
        }
        return value;
      },
    },
    {
      title: "First Time",
      dataIndex: "firstTime",
      key: "firstTime",
      width: 130,
      render: (value: string, record: LogisticsShipment) => {
        if (isEditing(record)) {
          return (
            <Select
              value={editData?.firstTime}
              onChange={(val) => updateEditData("firstTime", val)}
              style={{ width: "100%" }}
            >
              {LIST_TIME_OPTIONS.map((time) => (
                <Option key={time.value} value={time.value}>
                  {time.label}
                </Option>
              ))}
            </Select>
          );
        }
        return getTimeLabel(value);
      },
    },
    {
      title: "Carrier",
      dataIndex: "carrier",
      key: "carrier",
      width: 150,
      render: (value: string, record: LogisticsShipment) => {
        if (isEditing(record)) {
          return (
            <Select
              value={editData?.carrier}
              onChange={(val) => updateEditData("carrier", val)}
              style={{ width: "100%" }}
            >
              {CARRIERS.map((carrier) => (
                <Option key={carrier} value={carrier}>
                  {carrier}
                </Option>
              ))}
            </Select>
          );
        }
        return value;
      },
    },
    {
      title: "Generator",
      dataIndex: "generator",
      key: "generator",
      width: 120,
      render: (value: string, record: LogisticsShipment) => {
        if (isEditing(record)) {
          return (
            <Select
              value={editData?.generator}
              onChange={(val) => updateEditData("generator", val)}
              style={{ width: "100%" }}
            >
              <Option value="auto">Auto</Option>
              <Option value="manual">Manual</Option>
            </Select>
          );
        }
        return value;
      },
    },
    {
      title: "1",
      dataIndex: "field1",
      key: "field1",
      width: 80,
    },
    {
      title: "2",
      dataIndex: "field2",
      key: "field2",
      width: 80,
    },
    {
      title: "3",
      dataIndex: "field3",
      key: "field3",
      width: 80,
    },
    {
      title: "4",
      dataIndex: "field4",
      key: "field4",
      width: 80,
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      fixed: "right",
      render: (_, record: LogisticsShipment) => {
        const editing = isEditing(record);
        return editing ? (
          <Space size="small">
            <Button
              type="primary"
              icon={<SaveOutlined />}
              size="small"
              onClick={handleSave}
            >
              {t("actions.submit")}
            </Button>
            <Button size="small" onClick={handleCancel}>
              {t("actions.cancel")}
            </Button>
          </Space>
        ) : (
          <Button
            type="link"
            icon={<EditOutlined />}
            disabled={editingKey !== ""}
            onClick={() => handleEdit(record)}
          >
            {t("actions.edit")}
          </Button>
        );
      },
    },
  ];

  // ค้นหาข้อมูล
  const handleSearch = () => {
    // นำค่าจากช่อง input ไปใช้กรองข้อมูล
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

  return (
    <div>
      {/* Filter Section */}
      <Card>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <div>
              <Input
                placeholder="ค้นหา Plant"
                value={filterPlant}
                onChange={(e) => setFilterPlant(e.target.value)}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div>
              <Input
                placeholder="ค้นหาทะเบียนรถ"
                value={filterLicense}
                onChange={(e) => setFilterLicense(e.target.value)}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div>
              <Input
                placeholder="ค้นหา Route"
                value={filterRoute}
                onChange={(e) => setFilterRoute(e.target.value)}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
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
          <Col xs={24} sm={12} md={6}>
            <div>
              <Input
                placeholder="ค้นหา Shipment No"
                value={filterShipmentNo}
                onChange={(e) => setFilterShipmentNo(e.target.value)}
              />
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
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

          <Col xs={24} sm={12} md={6}>
            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearch}
              >
                {t("actions.search")}
              </Button>
              <Button onClick={handleResetFilters}>
                {t("actions.clearFilter")}
              </Button>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Table Section */}
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{
          pageSize: TABLE.pageSizeDefault,
          //   showSizeChanger: true,
          showTotal: (total) => `ทั้งหมด ${total} รายการ`,
        }}
        scroll={{ x: 1800 }}
        bordered
      />
    </div>
  );
};

export default DataTableTab;
