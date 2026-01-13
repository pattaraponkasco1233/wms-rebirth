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
  Select,
  message,
  Card,
} from "antd";
import { SearchOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Dayjs } from "dayjs";
import "dayjs/locale/th";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation(); // เพิ่ม useTranslation hook
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
      message.error(t("truckCheckin.errorFetching"));

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
        message.success(t("truckCheckin.updateSuccess"));
      } else {
        // เพิ่มข้อมูลใหม่
        await truckCheckinApi.createTruckCheckin(updateData);
        message.success(t("truckCheckin.addSuccess"));
      }

      handleCancel();
      fetchTruckCheckins(currentPage, pageSize);
    } catch (error: any) {
      console.error("Error saving truck check-in:", error);
      message.error(t("truckCheckin.errorSaving"));
    }
  };

  // ฟังก์ชันแสดง Tag สถานะ
  const renderStatusTag = (status: TruckCheckinStatus) => {
    switch (status) {
      case "CHECKED_IN":
        return <Tag color="success">{t("truckCheckin.statusCheckedIn")}</Tag>;
      case "NOT_CHECKED_IN":
        return <Tag color="error">{t("truckCheckin.statusNotCheckedIn")}</Tag>;
      case "PENDING":
        return <Tag color="warning">{t("truckCheckin.statusPending")}</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  // Columns สำหรับตาราง
  const columns: ColumnsType<TruckCheckin> = [
    {
      title: t("labels.runno"), // ใช้ key เพื่อเปลี่ยนภาษา
      key: "index",
      width: 80,
      align: "center",
      render: (_text, _record, index) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: t("truckCheckin.plant"),
      dataIndex: "plant",
      key: "plant",
      width: 150,
    },
    {
      title: t("truckCheckin.carrier"),
      dataIndex: "carrier",
      key: "carrier",
      width: 150,
    },
    {
      title: t("truckCheckin.vehicleType"),
      dataIndex: "vehicleType",
      key: "vehicleType",
      width: 150,
    },
    {
      title: t("truckCheckin.truckLicense"),
      dataIndex: "license",
      key: "license",
      width: 150,
    },
    {
      title: t("truckCheckin.driverName"),
      dataIndex: "driver",
      key: "driver",
      width: 200,
    },
    {
      title: t("truckCheckin.tel"),
      dataIndex: "tel",
      key: "tel",
      width: 150,
    },
    {
      title: t("truckCheckin.checkinDateTime"),
      dataIndex: "checkin",
      key: "checkin",
      width: 150,
      // render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: t("truckCheckin.status"),
      dataIndex: "status",
      key: "status",
      width: 150,
      align: "center",
      render: (status: TruckCheckinStatus) => renderStatusTag(status),
    },
    {
      title: t("truckCheckin.remark"),
      dataIndex: "remark",
      key: "remark",
      width: 200,
    },
    {
      title: t("truckCheckin.action"),
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
          {t("actions.edit")}
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
              placeholder={t("truckCheckin.searchPlaceholder")}
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={handleSearch}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              placeholder={t("truckCheckin.selectPlant")}
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
              placeholder={t("truckCheckin.selectDate")}
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
                {t("actions.search")}
              </Button>
              <Button onClick={handleReset}>{t("actions.clearFilter")}</Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
              >
                {t("actions.addData")}
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
            showTotal: (total) =>
              `${t("labels.total")} ${total} ${t("labels.items")}`,
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
            ? t("truckCheckin.editTitle")
            : t("truckCheckin.addTitle")
        }
        open={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
        width={600}
        okText={t("actions.save")}
        cancelText={t("actions.cancel")}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="license"
            label={t("truckCheckin.truckLicense")}
            rules={[
              { required: true, message: t("truckCheckin.licenseRequired") },
            ]}
          >
            <Input placeholder={t("truckCheckin.licensePlaceholder")} />
          </Form.Item>

          <Form.Item
            name="driver"
            label={t("truckCheckin.driverName")}
            rules={[
              { required: true, message: t("truckCheckin.driverRequired") },
            ]}
          >
            <Input placeholder={t("truckCheckin.driverPlaceholder")} />
          </Form.Item>

          <Form.Item
            name="status"
            label={t("truckCheckin.status")}
            rules={[
              { required: true, message: t("truckCheckin.statusRequired") },
            ]}
          >
            <Select placeholder={t("truckCheckin.selectStatus")}>
              <Option value="CHECKED_IN">
                {t("truckCheckin.statusCheckedIn")}
              </Option>
              <Option value="NOT_CHECKED_IN">
                {t("truckCheckin.statusNotCheckedIn")}
              </Option>
              <Option value="PENDING">{t("truckCheckin.statusPending")}</Option>
            </Select>
          </Form.Item>

          <Form.Item name="remark" label={t("truckCheckin.remark")}>
            <Input.TextArea
              rows={3}
              placeholder={t("truckCheckin.remarkPlaceholder")}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TruckCheckinPage;
