// src/pages/booking-car/index.tsx

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Card,
  Row,
  Col,
  DatePicker,
  message,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const { Option } = Select;
const { RangePicker } = DatePicker;

// Interface สำหรับข้อมูล Booking Car
interface BookingCarData {
  id: string;
  orderNo: string;
  carType: string;
  carPlate: string;
  driverName: string;
  destination: string;
  bookingDate: string;
  status: string;
}

const BookingCarPage: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<BookingCarData[]>([]);
  const [filteredData, setFilteredData] = useState<BookingCarData[]>([]);
  const [editingRecord, setEditingRecord] = useState<BookingCarData | null>(
    null
  );

  // Filter states
  const [filterOrderNo, setFilterOrderNo] = useState("");
  const [filterCarType, setFilterCarType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Mock data สำหรับตัวอย่าง
  useEffect(() => {
    const mockData: BookingCarData[] = [
      {
        id: "1",
        orderNo: "ORD-2026-001",
        carType: "รถ 6 ล้อ",
        carPlate: "กข-1234",
        driverName: "สมชาย ใจดี",
        destination: "กรุงเทพฯ",
        bookingDate: "2026-01-05",
        status: "รอดำเนินการ",
      },
      {
        id: "2",
        orderNo: "ORD-2026-002",
        carType: "รถ 10 ล้อ",
        carPlate: "คง-5678",
        driverName: "สมหญิง รักษ์ดี",
        destination: "เชียงใหม่",
        bookingDate: "2026-01-04",
        status: "กำลังขนส่ง",
      },
      {
        id: "3",
        orderNo: "ORD-2026-003",
        carType: "รถกระบะ",
        carPlate: "ขค-9999",
        driverName: "สมศักดิ์ มั่นคง",
        destination: "ภูเก็ต",
        bookingDate: "2026-01-03",
        status: "เสร็จสิ้น",
      },
    ];
    setDataSource(mockData);
    setFilteredData(mockData);
  }, []);

  // Columns สำหรับตาราง
  const columns: ColumnsType<BookingCarData> = [
    {
      title: "เลขที่ออเดอร์",
      dataIndex: "orderNo",
      key: "orderNo",
      width: 150,
    },
    {
      title: "ประเภทรถ",
      dataIndex: "carType",
      key: "carType",
      width: 120,
    },
    {
      title: "ทะเบียนรถ",
      dataIndex: "carPlate",
      key: "carPlate",
      width: 120,
    },
    {
      title: "ชื่อคนขับ",
      dataIndex: "driverName",
      key: "driverName",
      width: 150,
    },
    {
      title: "ปลายทาง",
      dataIndex: "destination",
      key: "destination",
      width: 150,
    },
    {
      title: "วันที่จอง",
      dataIndex: "bookingDate",
      key: "bookingDate",
      width: 120,
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: string) => {
        let color = "default";
        if (status === "กำลังขนส่ง") color = "blue";
        else if (status === "เสร็จสิ้น") color = "green";
        else if (status === "รอดำเนินการ") color = "orange";
        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: "จัดการ",
      key: "action",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            แก้ไข
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDelete(record)}
          >
            ลบ
          </Button>
        </Space>
      ),
    },
  ];

  // เปิด Modal
  const showModal = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  // ปิด Modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
    form.resetFields();
  };

  // แก้ไขข้อมูล
  const handleEdit = (record: BookingCarData) => {
    setEditingRecord(record);
    form.setFieldsValue({
      orderNo: record.orderNo,
      carType: record.carType,
      carPlate: record.carPlate,
      driverName: record.driverName,
      destination: record.destination,
      bookingDate: dayjs(record.bookingDate),
    });
    setIsModalOpen(true);
  };

  // ลบข้อมูล
  const handleDelete = (record: BookingCarData) => {
    Modal.confirm({
      title: "ยืนยันการลบ",
      content: `คุณต้องการลบการจองรถเลขที่ ${record.orderNo} หรือไม่?`,
      okText: "ลบ",
      okType: "danger",
      cancelText: "ยกเลิก",
      onOk() {
        const newDataSource = dataSource.filter(
          (item) => item.id !== record.id
        );
        const newFilteredData = filteredData.filter(
          (item) => item.id !== record.id
        );
        setDataSource(newDataSource);
        setFilteredData(newFilteredData);
        message.success("ลบข้อมูลสำเร็จ");
      },
    });
  };

  // Submit Form
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // จำลองการบันทึกข้อมูล (เชื่อมต่อ API ของคุณที่นี่)
      console.log("Form values:", values);

      if (editingRecord) {
        // กรณีแก้ไข
        const updatedBooking: BookingCarData = {
          ...editingRecord,
          orderNo: values.orderNo,
          carType: values.carType,
          carPlate: values.carPlate,
          driverName: values.driverName,
          destination: values.destination,
          bookingDate: values.bookingDate.format("YYYY-MM-DD"),
        };

        const newDataSource = dataSource.map((item) =>
          item.id === editingRecord.id ? updatedBooking : item
        );
        const newFilteredData = filteredData.map((item) =>
          item.id === editingRecord.id ? updatedBooking : item
        );

        setDataSource(newDataSource);
        setFilteredData(newFilteredData);
        message.success("แก้ไขข้อมูลสำเร็จ");
      } else {
        // กรณีสร้างใหม่
        const newBooking: BookingCarData = {
          id: String(dataSource.length + 1),
          orderNo: values.orderNo,
          carType: values.carType,
          carPlate: values.carPlate,
          driverName: values.driverName,
          destination: values.destination,
          bookingDate: values.bookingDate.format("YYYY-MM-DD"),
          status: "รอดำเนินการ",
        };

        setDataSource([newBooking, ...dataSource]);
        setFilteredData([newBooking, ...filteredData]);
        message.success("บันทึกข้อมูลสำเร็จ");
      }

      setIsModalOpen(false);
      setEditingRecord(null);
      form.resetFields();
    } catch (error) {
      message.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชัน Filter
  const handleFilter = () => {
    let filtered = [...dataSource];

    if (filterOrderNo) {
      filtered = filtered.filter((item) =>
        item.orderNo.toLowerCase().includes(filterOrderNo.toLowerCase())
      );
    }

    if (filterCarType) {
      filtered = filtered.filter((item) => item.carType === filterCarType);
    }

    if (filterStatus) {
      filtered = filtered.filter((item) => item.status === filterStatus);
    }

    setFilteredData(filtered);
  };

  // Reset Filter
  const handleResetFilter = () => {
    setFilterOrderNo("");
    setFilterCarType("");
    setFilterStatus("");
    setFilteredData(dataSource);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Card title="จัดการจองรถ (Booking Car)">
        {/* Filter Section */}
        <Card
          title="ค้นหาและกรองข้อมูล"
          size="small"
          style={{ marginBottom: 16 }}
        >
          <Row gutter={16}>
            <Col span={6}>
              <Input
                placeholder="เลขที่ออเดอร์"
                value={filterOrderNo}
                onChange={(e) => setFilterOrderNo(e.target.value)}
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col span={6}>
              <Select
                placeholder="เลือกประเภทรถ"
                style={{ width: "100%" }}
                value={filterCarType || undefined}
                onChange={(value) => setFilterCarType(value)}
                allowClear
              >
                <Option value="รถกระบะ">รถกระบะ</Option>
                <Option value="รถ 6 ล้อ">รถ 6 ล้อ</Option>
                <Option value="รถ 10 ล้อ">รถ 10 ล้อ</Option>
                <Option value="รถพ่วง">รถพ่วง</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Select
                placeholder="เลือกสถานะ"
                style={{ width: "100%" }}
                value={filterStatus || undefined}
                onChange={(value) => setFilterStatus(value)}
                allowClear
              >
                <Option value="รอดำเนินการ">รอดำเนินการ</Option>
                <Option value="กำลังขนส่ง">กำลังขนส่ง</Option>
                <Option value="เสร็จสิ้น">เสร็จสิ้น</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Space>
                <Button type="primary" onClick={handleFilter}>
                  ค้นหา
                </Button>
                <Button onClick={handleResetFilter}>รีเซ็ต</Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Button สร้างใหม่ */}
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showModal}
            size="large"
          >
            สร้างการจองรถใหม่
          </Button>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `ทั้งหมด ${total} รายการ`,
          }}
          bordered
        />
      </Card>

      {/* Modal Form */}
      <Modal
        title={editingRecord ? "แก้ไขการจองรถ" : "สร้างการจองรถใหม่"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="เลขที่ออเดอร์"
            name="orderNo"
            rules={[{ required: true, message: "กรุณากรอกเลขที่ออเดอร์" }]}
          >
            <Input placeholder="ORD-2026-XXX" />
          </Form.Item>

          <Form.Item
            label="ประเภทรถ"
            name="carType"
            rules={[{ required: true, message: "กรุณาเลือกประเภทรถ" }]}
          >
            <Select placeholder="เลือกประเภทรถ">
              <Option value="รถกระบะ">รถกระบะ</Option>
              <Option value="รถ 6 ล้อ">รถ 6 ล้อ</Option>
              <Option value="รถ 10 ล้อ">รถ 10 ล้อ</Option>
              <Option value="รถพ่วง">รถพ่วง</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="ทะเบียนรถ"
            name="carPlate"
            rules={[{ required: true, message: "กรุณากรอกทะเบียนรถ" }]}
          >
            <Input placeholder="กข-1234" />
          </Form.Item>

          <Form.Item
            label="ชื่อคนขับ"
            name="driverName"
            rules={[{ required: true, message: "กรุณากรอกชื่อคนขับ" }]}
          >
            <Input placeholder="ชื่อ-นามสกุล" />
          </Form.Item>

          <Form.Item
            label="ปลายทาง"
            name="destination"
            rules={[{ required: true, message: "กรุณากรอกปลายทาง" }]}
          >
            <Input placeholder="กรุงเทพฯ, เชียงใหม่, ภูเก็ต" />
          </Form.Item>

          <Form.Item
            label="วันที่จอง"
            name="bookingDate"
            rules={[{ required: true, message: "กรุณาเลือกวันที่จอง" }]}
          >
            <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={handleCancel}>ยกเลิก</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                บันทึก
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BookingCarPage;
