// src/pages/logistics-planner/index.tsx

import React, { useState, useEffect, useCallback } from "react";
import { Card, message, Spin } from "antd";
import TimeSummaryTab from "../../components/logistics-planner/TimeSummaryTab";
import DataTableTab from "../../components/logistics-planner/DataTableTab";
import { LogisticsShipment } from "../../models/logistics-planner/logistics-planner.model";
import {
  mockLogisticsPlannerApi,
  LogisticsFilterParams,
} from "../../services/api/logisticsPlanner.service";

const LogisticsPlannerCockpit: React.FC = () => {
  const [shipments, setShipments] = useState<LogisticsShipment[]>([]);
  const [filteredShipments, setFilteredShipments] = useState<
    LogisticsShipment[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  // ฟังก์ชันสำหรับดึงข้อมูลจาก API
  const fetchShipments = useCallback(
    async (filters?: LogisticsFilterParams) => {
      try {
        setLoading(true);
        const response = await mockLogisticsPlannerApi.getShipments(filters);
        setShipments(response.data);
        message.success(`ดึงข้อมูลสำเร็จ ${response.total} รายการ`);
      } catch (error) {
        console.error("Error fetching shipments:", error);
        message.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // โหลดข้อมูลครั้งแรก
  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  // ฟังก์ชันสำหรับค้นหาด้วย filter จาก TimeSummaryTab
  const handleSearch = useCallback(
    (filters: {
      plant?: string;
      license?: string;
      shipmentNo?: string;
      route?: string;
      date?: string;
      time?: string;
    }) => {
      const apiFilters: LogisticsFilterParams = {
        plant: filters.plant,
        truckLicense: filters.license,
        shipmentNo: filters.shipmentNo,
        route: filters.route,
        loadDate: filters.date,
        firstTime: filters.time,
      };
      fetchShipments(apiFilters);
    },
    [fetchShipments],
  );

  // ฟังก์ชันสำหรับอัพเดทข้อมูล shipment
  const handleUpdateShipment = (updatedShipment: LogisticsShipment) => {
    setShipments((prevShipments) =>
      prevShipments.map((shipment) =>
        shipment.id === updatedShipment.id ? updatedShipment : shipment,
      ),
    );
    message.success("อัพเดทข้อมูลสำเร็จ");
  };

  // ฟังก์ชันสำหรับลบข้อมูล shipment
  const handleDeleteShipment = (id: string) => {
    setShipments((prevShipments) =>
      prevShipments.filter((shipment) => shipment.id !== id),
    );
    message.success("ลบข้อมูลสำเร็จ");
  };

  return (
    <div style={{ padding: "0" }}>
      <Spin spinning={loading} tip="กำลังโหลดข้อมูล...">
        {/* สรุปตามช่วงเวลา */}
        <Card>
          <TimeSummaryTab
            shipments={shipments}
            onFilterChange={setFilteredShipments}
            onSearch={handleSearch}
          />
        </Card>

        {/* ตารางข้อมูล */}
        <Card>
          <DataTableTab
            shipments={filteredShipments}
            onUpdate={handleUpdateShipment}
            onDelete={handleDeleteShipment}
          />
        </Card>
      </Spin>
    </div>
  );
};

export default LogisticsPlannerCockpit;
