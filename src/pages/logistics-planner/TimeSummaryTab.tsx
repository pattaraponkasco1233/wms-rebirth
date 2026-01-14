// src/pages/logistics-planner/TimeSummaryTab.tsx

import React, { useMemo } from "react";
import { Table } from "antd";
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
} from "../../constant/constants";

interface TimeSummaryTabProps {
  shipments: LogisticsShipment[];
}

const TimeSummaryTab: React.FC<TimeSummaryTabProps> = ({ shipments }) => {
  // คำนวณข้อมูลสรุปตามช่วงเวลา
  const timeSlotSummary = useMemo(() => {
    return calculateTimeSlotSummary(shipments);
  }, [shipments]);

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
                    color: total > 0 ? "#52c41a" : "#d9d9d9",
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
            color: count > 0 ? "#1890ff" : "#d9d9d9",
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
      <div style={{ marginBottom: "16px" }}>
        <h3>สรุปจำนวนรอบขนส่งตามช่วงเวลา</h3>
        <p style={{ color: "#8c8c8c" }}>
          แสดงจำนวนรอบขนส่งที่กำหนดเวลาในแต่ละช่วงเวลา (8:00 - 05:00)
        </p>
      </div>
      <Table
        columns={columns}
        dataSource={timeSlotSummary}
        rowKey="timeSlot"
        pagination={{
          pageSize: TABLE.pageSizeDefault,
          //   showSizeChanger: true,
          showTotal: (total) => `ทั้งหมด ${total} ช่วงเวลา`,
        }}
        scroll={{ x: 800 }}
        bordered
      />
    </div>
  );
};

export default TimeSummaryTab;
