// src/pages/logistics-planner/index.tsx

import React, { useState, useEffect } from "react";
import { Card, Tabs, message } from "antd";
import type { TabsProps } from "antd";
import TimeSummaryTab from "./TimeSummaryTab";
import DataTableTab from "./DataTableTab";
import { LogisticsShipment } from "../../models/logistics-planner/logistics-planner.model";

const { TabPane } = Tabs;

const LogisticsPlannerCockpit: React.FC = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [shipments, setShipments] = useState<LogisticsShipment[]>([]);

  // Mock data สำหรับทดสอบ
  useEffect(() => {
    const mockShipments: LogisticsShipment[] = [
      {
        id: "1",
        plant: "Plant A",
        shipmentNo: "SHP-2026-001",
        route: "BKK-CNX",
        loadDate: "15012026",
        jobNumber: "JOB-001",
        pickSequence: 1,
        truckLicense: "กข-1234",
        vehicleType: "รถ 6 ล้อ",
        firstTime: "080000",
        carrier: "Kerry Express",
        generator: "auto",
        field1: "A",
        field2: "B",
        field3: "C",
        field4: "D",
      },
      {
        id: "2",
        plant: "Plant B",
        shipmentNo: "SHP-2026-002",
        route: "BKK-HDY",
        loadDate: "16012026",
        jobNumber: "JOB-002",
        pickSequence: 2,
        truckLicense: "คง-5678",
        vehicleType: "รถ 4 ล้อ",
        firstTime: "090000",
        carrier: "Flash Express",
        generator: "manual",
        field1: "E",
        field2: "F",
        field3: "G",
        field4: "H",
      },
      {
        id: "3",
        plant: "Plant C",
        shipmentNo: "SHP-2026-003",
        route: "BKK-PKT",
        loadDate: "16012026",
        jobNumber: "JOB-003",
        pickSequence: 3,
        truckLicense: "ขค-9999",
        vehicleType: "รถ 6 ล้อ",
        firstTime: "100000",
        carrier: "J&T Express",
        generator: "auto",
        field1: "I",
        field2: "J",
        field3: "K",
        field4: "L",
      },
      {
        id: "4",
        plant: "Plant D",
        shipmentNo: "SHP-2026-004",
        route: "BKK-CMI",
        loadDate: "16012026",
        jobNumber: "JOB-004",
        pickSequence: 4,
        truckLicense: "งจ-7777",
        vehicleType: "รถ 4 ล้อ",
        firstTime: "083000",
        carrier: "Thailand Post",
        generator: "manual",
        field1: "M",
        field2: "N",
        field3: "O",
        field4: "P",
      },
      {
        id: "5",
        plant: "Plant D",
        shipmentNo: "SHP-2026-005",
        route: "BKK-UBN",
        loadDate: "17012026",
        jobNumber: "JOB-005",
        pickSequence: 5,
        truckLicense: "ฉช-3333",
        vehicleType: "รถ 6 ล้อ",
        firstTime: "140000",
        carrier: "Kerry Express",
        generator: "auto",
        field1: "Q",
        field2: "R",
        field3: "S",
        field4: "T",
      },
    ];
    setShipments(mockShipments);
  }, []);

  // ฟังก์ชันสำหรับอัพเดทข้อมูล shipment
  const handleUpdateShipment = (updatedShipment: LogisticsShipment) => {
    setShipments((prevShipments) =>
      prevShipments.map((shipment) =>
        shipment.id === updatedShipment.id ? updatedShipment : shipment
      )
    );
    message.success("อัพเดทข้อมูลสำเร็จ");
  };

  // ฟังก์ชันสำหรับลบข้อมูล shipment
  const handleDeleteShipment = (id: string) => {
    setShipments((prevShipments) =>
      prevShipments.filter((shipment) => shipment.id !== id)
    );
    message.success("ลบข้อมูลสำเร็จ");
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "สรุปตามช่วงเวลา",
      children: <TimeSummaryTab shipments={shipments} />,
    },
    {
      key: "2",
      label: "ตารางข้อมูล",
      children: (
        <DataTableTab
          shipments={shipments}
          onUpdate={handleUpdateShipment}
          onDelete={handleDeleteShipment}
        />
      ),
    },
  ];

  return (
    <div>
      <Card>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={items}
          size="large"
        />
      </Card>
    </div>
  );
};

export default LogisticsPlannerCockpit;
