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
        truckNumber: "80-1234",
        driverName: "สมชาย ใจดี",
        checkinDate: "2026-01-13",
        checkinTime: "08:30",
        status: "CHECKED_IN" as TruckCheckinStatus,
        remark: "ปกติ",
        createdAt: "2026-01-13T08:30:00",
        updatedAt: "2026-01-13T08:30:00",
      },
      {
        id: "2",
        truckNumber: "70-5678",
        driverName: "สมหญิง รักงาน",
        checkinDate: "2026-01-13",
        checkinTime: "09:15",
        status: "CHECKED_IN" as TruckCheckinStatus,
        remark: "",
        createdAt: "2026-01-13T09:15:00",
        updatedAt: "2026-01-13T09:15:00",
      },
      {
        id: "3",
        truckNumber: "60-9999",
        driverName: "สมศักดิ์ ขยัน",
        checkinDate: "2026-01-13",
        checkinTime: "10:00",
        status: "NOT_CHECKED_IN" as TruckCheckinStatus,
        remark: "รอเข้า",
        createdAt: "2026-01-13T10:00:00",
        updatedAt: "2026-01-13T10:00:00",
      },
      {
        id: "4",
        truckNumber: "50-1111",
        driverName: "วิชัย มั่นคง",
        checkinDate: "2026-01-12",
        checkinTime: "14:30",
        status: "CHECKED_IN" as TruckCheckinStatus,
        remark: "เข้าล่าช้า",
        createdAt: "2026-01-12T14:30:00",
        updatedAt: "2026-01-12T14:30:00",
      },
      {
        id: "5",
        truckNumber: "40-2222",
        driverName: "ประสิทธิ์ เร็ว",
        checkinDate: "2026-01-12",
        checkinTime: "11:00",
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
    setSearchDate(null);
    setCurrentPage(1);
    fetchTruckCheckins(1, pageSize);
  };

  // ฟังก์ชันเปิด Modal แก้ไข
  const handleEdit = (record: TruckCheckin) => {
    setEditingRecord(record);
    form.setFieldsValue({
      truckNumber: record.truckNumber,
      driverName: record.driverName,
      checkinDate: record.checkinDate ? dayjs(record.checkinDate) : null,
      checkinTime: record.checkinTime
        ? dayjs(record.checkinTime, "HH:mm")
        : null,
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
        truckNumber: values.truckNumber,
        driverName: values.driverName,
        checkinDate: values.checkinDate?.format("YYYY-MM-DD"),
        checkinTime: values.checkinTime?.format("HH:mm"),
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
      title: "ทะเบียนรถ",
      dataIndex: "truckNumber",
      key: "truckNumber",
      width: 150,
    },
    {
      title: "ชื่อคนขับ",
      dataIndex: "driverName",
      key: "driverName",
      width: 200,
    },
    {
      title: "วันที่ Check In",
      dataIndex: "checkinDate",
      key: "checkinDate",
      width: 150,
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "เวลา Check In",
      dataIndex: "checkinTime",
      key: "checkinTime",
      width: 120,
      align: "center",
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
    <div style={{ padding: "24px" }}>
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2} style={{ margin: 0 }}>
            Truck Check-in
          </Title>
        </Col>
        <Col>
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              เพิ่มข้อมูล
            </Button>
            <Button
              icon={<ReloadOutlined />}
              onClick={handleReset}
              loading={loading}
            >
              รีเฟรช
            </Button>
          </Space>
        </Col>
      </Row>

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
            name="truckNumber"
            label="ทะเบียนรถ"
            rules={[{ required: true, message: "กรุณากรอกทะเบียนรถ" }]}
          >
            <Input placeholder="เช่น 80-1234" />
          </Form.Item>

          <Form.Item
            name="driverName"
            label="ชื่อคนขับ"
            rules={[{ required: true, message: "กรุณากรอกชื่อคนขับ" }]}
          >
            <Input placeholder="เช่น สมชาย ใจดี" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="checkinDate"
                label="วันที่ Check In"
                rules={[{ required: true, message: "กรุณาเลือกวันที่" }]}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
                  placeholder="เลือกวันที่"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="checkinTime"
                label="เวลา Check In"
                rules={[{ required: true, message: "กรุณาเลือกเวลา" }]}
              >
                <TimePicker
                  format="HH:mm"
                  style={{ width: "100%" }}
                  placeholder="เลือกเวลา"
                />
              </Form.Item>
            </Col>
          </Row>

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
