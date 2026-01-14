// src/pages/proactive-monitor/OverallMonitoringTab.tsx

import React, { useMemo } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  CARRIER_OPTIONS,
  LIST_TIEM_SLOTS,
  TABLE,
} from "../../constant/constants";

interface PlantLoadData {
  timeSlot: string;
  [key: string]: string | number;
}

const OverallMonitoringTab: React.FC = () => {
  // สร้างข้อมูล mock สำหรับแต่ละช่วงเวลา
  const dataSource = useMemo(() => {
    return LIST_TIEM_SLOTS.map((timeSlot, index) => {
      const data: PlantLoadData = {
        timeSlot,
        key: `time-${index}`,
      };

      // สร้างข้อมูลสุ่มสำหรับแต่ละ carrier
      CARRIER_OPTIONS.forEach((carrier) => {
        // สุ่มจำนวน 0-10
        data[carrier.value] = Math.floor(Math.random() * 11);
      });

      // คำนวณ total
      data.total = CARRIER_OPTIONS.reduce((sum, carrier) => {
        return sum + (data[carrier.value] as number);
      }, 0);

      return data;
    });
  }, []);

  // คำนวณผลรวมของแต่ละ carrier
  const carrierTotals = useMemo(() => {
    const totals: { [key: string]: number } = {};
    CARRIER_OPTIONS.forEach((carrier) => {
      totals[carrier.value] = dataSource.reduce((sum, record) => {
        return sum + (record[carrier.value] as number);
      }, 0);
    });
    return totals;
  }, [dataSource]);

  // คำนวณผลรวมทั้งหมด
  carrierTotals["total"] = dataSource.reduce((sum, record) => {
    return sum + (record.total as number);
  }, 0);

  // สร้าง columns สำหรับตาราง
  const columns: ColumnsType<PlantLoadData> = [
    {
      title: "Plant Load Time",
      dataIndex: "timeSlot",
      key: "timeSlot",
      width: 100,
      fixed: "left",
      align: "center" as const,
      render: (timeSlot: string) => (
        <span style={{ fontWeight: "bold", fontSize: "14px" }}>{timeSlot}</span>
      ),
    },
    {
      title: "Plant",
      key: "plant",
      children: [
        ...CARRIER_OPTIONS.map((carrier) => ({
          title: (
            <div>
              <div>{carrier.label}</div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#52c41a",
                  marginTop: "4px",
                }}
              >
                รวม: {carrierTotals[carrier.value]}
              </div>
            </div>
          ),
          dataIndex: carrier.value,
          key: carrier.value,
          width: 150,
          align: "center" as const,
          render: (value: number) => (
            <span
              style={{
                fontWeight: value > 0 ? "600" : "normal",
                color: value > 0 ? "#1890ff" : "#d9d9d9",
              }}
            >
              {value || 0}
            </span>
          ),
        })),
        {
          title: (
            <div>
              <div>Total</div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#52c41a",
                  marginTop: "4px",
                }}
              >
                รวม: {carrierTotals["total"] || 0}
              </div>
            </div>
          ),
          dataIndex: "total",
          key: "total",
          width: 120,
          align: "center" as const,
          render: (value: number) => (
            <span
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                color:
                  value > 0
                    ? "var(--color-primary)"
                    : "var(--color-text-disabled)",
              }}
            >
              {value}
            </span>
          ),
        },
      ],
    },
  ];

  // คำนวณ Grand Total
  const grandTotal = useMemo(() => {
    return dataSource.reduce(
      (sum, record) => sum + (record.total as number),
      0
    );
  }, [dataSource]);

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <h3>Overall Monitoring - Plant Load Summary</h3>
        <p style={{ color: "#8c8c8c" }}>
          สรุปภาพรวมการโหลดสินค้าของแต่ละ Plant ตามช่วงเวลา (08:00 - 05:00)
        </p>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="key"
        pagination={{
          pageSize: TABLE.pageSizeDefault,
          showTotal: (total) => `ทั้งหมด ${total} ช่วงเวลา`,
        }}
        scroll={{ x: 1000 }}
        bordered
        size="middle"
      />
    </div>
  );
};

export default OverallMonitoringTab;
