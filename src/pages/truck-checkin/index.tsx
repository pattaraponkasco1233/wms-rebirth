// src/pages/truck-checkin/index.tsx

import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Typography,
  Input,
  DatePicker,
  Button,
  Table,
  Space,
  Tag,
  Modal,
  Form,
  TimePicker,
  Select,
  message,
  Card,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  ReloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/th";
import { truckCheckinApi } from "../../services/api/truckCheckinService";
import type {
  TruckCheckin,
  TruckCheckinSearchParams,
  TruckCheckinStatus,
  UpdateTruckCheckinRequest,
} from "../../models/truck-checkin/truck-checkin.model";

const { Title } = Typography;
const { Option } = Select;

// Component สำหรับหน้า Truck Check-in
const TruckCheckinPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<TruckCheckin[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Search States
  const [searchText, setSearchText] = useState("");
  const [searchPlant, setSearchPlant] = useState<string | undefined>(undefined);
  const [searchDate, setSearchDate] = useState<Dayjs | null>(null);

  // Modal States
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<TruckCheckin | null>(null);
  const [form] = Form.useForm();

  // ดึงข้อมูล Truck Check-in
  const fetchTruckCheckins = async (page = 1, limit = 10) => {
    try {
      setLoading(true);

      const params: TruckCheckinSearchParams = {
        search: searchText || undefined,
        plant: searchPlant || undefined,
        checkinDate: searchDate?.format("YYYY-MM-DD") || undefined,
        page,
        limit,
      };

      const response = await truckCheckinApi.getTruckCheckins(params);
      setDataSource(response.data);
      setTotal(response.total);
      setCurrentPage(page);
    } catch (error: any) {
      console.error("Error fetching truck check-ins:", error);
      message.error("เกิดข้อผิดพลาดในการดึงข้อมูล");

      // Mock data สำหรับ demo
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  // Load Mock Data
  const loadMockData = () => {
    const mockData: TruckCheckin[] = [
      {
        id: "1",
        plant: "Plant A",
        carrier: "Carrier X",
        vehicleType: "10 ล้อ",
        license: "80-1234",
        driver: "สมชาย ใจดี",
        tel: "081-234-5678",
        checkin: "13/1/2026 10:00",
        status: "CHECKED_IN" as TruckCheckinStatus,
        remark: "ปกติ",
        createdAt: "2026-01-13T08:30:00",
        updatedAt: "2026-01-13T08:30:00",
      },
      {
        id: "2",
        plant: "Plant B",
        carrier: "Carrier Y",
        vehicleType: "6 ล้อ",
        license: "70-5678",
        driver: "สมหญิง รักงาน",
        tel: "082-345-6789",
        checkin: "13/1/2026 10:00",
        status: "CHECKED_IN" as TruckCheckinStatus,
        remark: "",
        createdAt: "2026-01-13T09:15:00",
        updatedAt: "2026-01-13T09:15:00",
      },
      {
        id: "3",
        plant: "Plant C",
        carrier: "Carrier Z",
        vehicleType: "4 ล้อ",
        license: "60-9999",
        driver: "สมศักดิ์ ขยัน",
        tel: "083-456-7890",
        checkin: "13/1/2026 10:00",
        status: "NOT_CHECKED_IN" as TruckCheckinStatus,
        remark: "รอเข้า",
        createdAt: "2026-01-13T10:00:00",
        updatedAt: "2026-01-13T10:00:00",
      },
      {
        id: "4",
        plant: "Plant D",
        carrier: "Carrier W",
        vehicleType: "8 ล้อ",
        license: "50-1111",
        driver: "วิชัย มั่นคง",
        tel: "084-567-8901",
        checkin: "13/1/2026 10:00",
        status: "CHECKED_IN" as TruckCheckinStatus,
        remark: "เข้าล่าช้า",
        createdAt: "2026-01-12T14:30:00",
        updatedAt: "2026-01-12T14:30:00",
      },
      {
        id: "5",
        plant: "Plant D",
        carrier: "Carrier W",
        vehicleType: "8 ล้อ",
        license: "40-2222",
        driver: "ประสิทธิ์ เร็ว",
        tel: "085-678-9012",
        checkin: "13/1/2026 10:00",
        status: "CHECKED_IN" as TruckCheckinStatus,
        remark: "",
        createdAt: "2026-01-12T11:00:00",
        updatedAt: "2026-01-12T11:00:00",
      },
    ];

    setDataSource(mockData);
    setTotal(mockData.length);
  };

  // useEffect สำหรับ load ข้อมูลครั้งแรก
  useEffect(() => {
    fetchTruckCheckins(1, pageSize);
  }, []);

  // ฟังก์ชันค้นหา
  const handleSearch = () => {
    fetchTruckCheckins(1, pageSize);
  };

  // ฟังก์ชัน Reset
  const handleReset = () => {
    setSearchText("");
    setSearchPlant(undefined);
    setSearchDate(null);
    setCurrentPage(1);
    fetchTruckCheckins(1, pageSize);
  };

  // ฟังก์ชันเปิด Modal แก้ไข
  const handleEdit = (record: TruckCheckin) => {
    setEditingRecord(record);
    form.setFieldsValue({
      license: record.license,
      driver: record.driver,
      checkin: record.checkin,
      status: record.status,
      remark: record.remark,
    });
    setIsModalVisible(true);
  };

  // ฟังก์ชันเปิด Modal เพิ่มข้อมูลใหม่
  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // ฟังก์ชันปิด Modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
    form.resetFields();
  };

  // ฟังก์ชันบันทึกข้อมูล
  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      const updateData: UpdateTruckCheckinRequest = {
        license: values.license,
        driver: values.driver,
        checkin: Date.now().toString(), // สมมติใช้เวลาปัจจุบัน
        status: values.status,
        remark: values.remark,
      };

      if (editingRecord) {
        // อัพเดทข้อมูลเดิม
        await truckCheckinApi.updateTruckCheckin(editingRecord.id, updateData);
        message.success("อัพเดทข้อมูลสำเร็จ");
      } else {
        // เพิ่มข้อมูลใหม่
        await truckCheckinApi.createTruckCheckin(updateData);
        message.success("เพิ่มข้อมูลสำเร็จ");
      }

      handleCancel();
      fetchTruckCheckins(currentPage, pageSize);
    } catch (error: any) {
      console.error("Error saving truck check-in:", error);
      message.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  // ฟังก์ชันแสดง Tag สถานะ
  const renderStatusTag = (status: TruckCheckinStatus) => {
    switch (status) {
      case "CHECKED_IN":
        return <Tag color="success">Check In แล้ว</Tag>;
      case "NOT_CHECKED_IN":
        return <Tag color="error">ยังไม่ Check In</Tag>;
      case "PENDING":
        return <Tag color="warning">รอดำเนินการ</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  // Columns สำหรับตาราง
  const columns: ColumnsType<TruckCheckin> = [
    {
      title: "ลำดับ",
      key: "index",
      width: 80,
      align: "center",
      render: (_text, _record, index) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Plant",
      dataIndex: "plant",
      key: "plant",
      width: 150,
    },
    {
      title: "Carrier",
      dataIndex: "carrier",
      key: "carrier",
      width: 150,
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicleType",
      key: "vehicleType",
      width: 150,
    },
    {
      title: "Truck License",
      dataIndex: "license",
      key: "license",
      width: 150,
    },
    {
      title: "ชื่อคนขับ",
      dataIndex: "driver",
      key: "driver",
      width: 200,
    },
    {
      title: "Tel.",
      dataIndex: "tel",
      key: "tel",
      width: 150,
    },
    {
      title: "วันเวลา Check In",
      dataIndex: "checkin",
      key: "checkin",
      width: 150,
      // render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      width: 150,
      align: "center",
      render: (status: TruckCheckinStatus) => renderStatusTag(status),
    },
    {
      title: "หมายเหตุ",
      dataIndex: "remark",
      key: "remark",
      width: 200,
    },
    {
      title: "จัดการ",
      key: "action",
      width: 100,
      align: "center",
      fixed: "right",
      render: (_text, record) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          size="small"
          onClick={() => handleEdit(record)}
        >
          แก้ไข
        </Button>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}

      {/* Search Form */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Input
              placeholder="ค้นหาทะเบียนรถ, ชื่อคนขับ..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={handleSearch}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              placeholder="เลือก Plant"
              value={searchPlant}
              onChange={(value) => setSearchPlant(value)}
              style={{ width: "100%" }}
              allowClear
            >
              <Option value="Plant A">Plant A</Option>
              <Option value="Plant B">Plant B</Option>
              <Option value="Plant C">Plant C</Option>
              <Option value="Plant D">Plant D</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <DatePicker
              placeholder="เลือกวันที่ Check In"
              format="DD/MM/YYYY"
              value={searchDate}
              onChange={(date) => setSearchDate(date)}
              style={{ width: "100%" }}
              allowClear
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={6}>
            <Space>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearch}
                loading={loading}
              >
                ค้นหา
              </Button>
              <Button onClick={handleReset}>ล้างค่า</Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
              >
                เพิ่มข้อมูล
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            showTotal: (total) => `ทั้งหมด ${total} รายการ`,
            onChange: (page, size) => {
              setPageSize(size);
              fetchTruckCheckins(page, size);
            },
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Edit Modal */}
      <Modal
        title={
          editingRecord
            ? "แก้ไขข้อมูล Truck Check-in"
            : "เพิ่มข้อมูล Truck Check-in"
        }
        open={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
        width={600}
        okText="บันทึก"
        cancelText="ยกเลิก"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="license"
            label="ทะเบียนรถ"
            rules={[{ required: true, message: "กรุณากรอกทะเบียนรถ" }]}
          >
            <Input placeholder="เช่น 80-1234" />
          </Form.Item>

          <Form.Item
            name="driver"
            label="ชื่อคนขับ"
            rules={[{ required: true, message: "กรุณากรอกชื่อคนขับ" }]}
          >
            <Input placeholder="เช่น สมชาย ใจดี" />
          </Form.Item>

          <Form.Item
            name="status"
            label="สถานะ"
            rules={[{ required: true, message: "กรุณาเลือกสถานะ" }]}
          >
            <Select placeholder="เลือกสถานะ">
              <Option value="CHECKED_IN">Check In แล้ว</Option>
              <Option value="NOT_CHECKED_IN">ยังไม่ Check In</Option>
              <Option value="PENDING">รอดำเนินการ</Option>
            </Select>
          </Form.Item>

          <Form.Item name="remark" label="หมายเหตุ">
            <Input.TextArea rows={3} placeholder="กรอกหมายเหตุ (ถ้ามี)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TruckCheckinPage;
