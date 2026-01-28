// src/pages/truck-checkin/index.tsx

import React, { useState, useEffect } from "react";
import { Space, Modal, Form, Select, message, Row, Col, Input } from "antd";
import { Dayjs } from "dayjs";
import "dayjs/locale/th";
import { useTranslation } from "react-i18next";
import { truckCheckinApi } from "../../services/api/truckCheckinService";
import type {
  TruckCheckin,
  TruckCheckinSearchParams,
  UpdateTruckCheckinRequest,
} from "../../models/truck-checkin/truck-checkin.model";
import {
  PATTERN,
  TABLE,
  PLANT_OPTIONS,
  CARRIER_OPTIONS,
  VEHICLE_TYPE_OPTIONS,
  TRUCK_CHECKIN_STATUS_OPTIONS,
} from "../../constant/constants";
import {
  TruckCheckinFilter,
  TruckCheckinTable,
} from "../../components/truck-checkin";

const { Option } = Select;

// Component สำหรับหน้า Truck Check-in
const TruckCheckinPage: React.FC = () => {
  const { t } = useTranslation(); // เพิ่ม useTranslation hook
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<TruckCheckin[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(TABLE.pageSizeDefault);

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
    } finally {
      setLoading(false);
    }
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
      plant: record.plant,
      carrier: record.carrier,
      vehicleType: record.vehicleType,
      license: record.license,
      driver: record.driver,
      tel: record.tel,
      shipmentNo: record.shipmentNo || "",
      checkin: record.checkin,
      status: record.status,
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
        plant: values.plant,
        carrier: values.carrier,
        vehicleType: values.vehicleType,
        license: values.license,
        driver: values.driver,
        tel: values.tel,
        shipmentNo: values.shipmentNo,
        checkin: Date.now().toString(), // สมมติใช้เวลาปัจจุบัน
        status: values.status,
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

  return (
    <div>
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        {/* Search Form */}
        <TruckCheckinFilter
          searchText={searchText}
          searchPlant={searchPlant}
          searchDate={searchDate}
          loading={loading}
          onSearchTextChange={setSearchText}
          onSearchPlantChange={setSearchPlant}
          onSearchDateChange={setSearchDate}
          onSearch={handleSearch}
          onReset={handleReset}
          onAdd={handleAdd}
        />

        {/* Table */}
        <TruckCheckinTable
          dataSource={dataSource}
          loading={loading}
          currentPage={currentPage}
          pageSize={pageSize}
          total={total}
          onEdit={handleEdit}
          onPageChange={(page, size) => {
            setPageSize(size);
            fetchTruckCheckins(page, size);
          }}
        />
      </Space>
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="plant"
                label={t("truckCheckin.plant")}
                rules={[
                  { required: true, message: t("truckCheckin.plantRequired") },
                ]}
              >
                <Select placeholder={t("truckCheckin.selectPlant")}>
                  {PLANT_OPTIONS.map((plant) => (
                    <Option key={plant.value} value={plant.label}>
                      {plant.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="carrier"
                label={t("truckCheckin.carrier")}
                rules={[
                  {
                    required: true,
                    message: t("truckCheckin.carrierRequired"),
                  },
                ]}
              >
                <Select placeholder={t("truckCheckin.selectCarrier")}>
                  {CARRIER_OPTIONS.map((carrier) => (
                    <Option key={carrier.value} value={carrier.label}>
                      {carrier.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="vehicleType"
                label={t("truckCheckin.vehicleType")}
                rules={[
                  {
                    required: true,
                    message: t("truckCheckin.vehicleTypeRequired"),
                  },
                ]}
              >
                <Select placeholder={t("truckCheckin.selectVehicleType")}>
                  {VEHICLE_TYPE_OPTIONS.map((vehicle) => (
                    <Option key={vehicle.value} value={vehicle.label}>
                      {vehicle.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label={t("truckCheckin.status")}
                rules={[
                  { required: true, message: t("truckCheckin.statusRequired") },
                ]}
              >
                <Select placeholder={t("truckCheckin.selectStatus")}>
                  {TRUCK_CHECKIN_STATUS_OPTIONS.map((status) => (
                    <Option key={status.value} value={status.value}>
                      {t(status.labelKey)}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="license"
                label={t("truckCheckin.truckLicense")}
                rules={[
                  {
                    required: true,
                    message: t("truckCheckin.licenseRequired"),
                  },
                ]}
              >
                <Input placeholder={t("truckCheckin.licensePlaceholder")} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="shipmentNo"
                label={t("truckCheckin.shipmentNo")}
                rules={[
                  {
                    required: true,
                    message: t("truckCheckin.shipmentNoRequired"),
                  },
                  // {
                  //   pattern: /^[A-Z0-9-]+$/,
                  //   message: t("truckCheckin.shipmentNoInvalid"),
                  // },
                  // {
                  //   min: 5,
                  //   message: t("truckCheckin.shipmentNoMinLength"),
                  // },
                ]}
              >
                <Input
                  placeholder={t("truckCheckin.shipmentNoPlaceholder")}
                  maxLength={20}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="driver"
                label={t("truckCheckin.driverName")}
                rules={[
                  { required: true, message: t("truckCheckin.driverRequired") },
                ]}
              >
                <Input placeholder={t("truckCheckin.driverPlaceholder")} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="tel"
                label={t("truckCheckin.tel")}
                rules={[
                  { required: true, message: t("truckCheckin.telRequired") },
                  {
                    pattern: PATTERN.telephone,
                    message: t("truckCheckin.telInvalid"),
                  },
                ]}
              >
                <Input
                  placeholder={t("truckCheckin.telPlaceholder")}
                  maxLength={10}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default TruckCheckinPage;
