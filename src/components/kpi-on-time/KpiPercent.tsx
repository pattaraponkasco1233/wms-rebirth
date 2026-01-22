// src/components/kpi-on-time/KpiPercent.tsx

import React, { useMemo } from "react";
import { Card, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { KpiPercentDailyData } from "../../models/kpi-on-time";

interface KpiPercentProps {
  data: KpiPercentDailyData[];
  loading?: boolean;
}

interface TableRowData {
  key: string;
  category: string;
  type: "Target" | "Actual" | "Diff";
  [date: string]: any; // Dynamic columns for dates
}

const KpiPercent: React.FC<KpiPercentProps> = ({ data, loading = false }) => {
  // สร้างข้อมูลสำหรับตาราง
  const tableData = useMemo(() => {
    const rows: TableRowData[] = [];

    // Driver Check in rows
    rows.push({
      key: "driver-target",
      category: "Driver Check in",
      type: "Target",
    });
    rows.push({
      key: "driver-actual",
      category: "Driver Check in",
      type: "Actual",
    });
    rows.push({
      key: "driver-diff",
      category: "Driver Check in",
      type: "Diff",
    });

    // Ready to Ship rows
    rows.push({
      key: "ready-target",
      category: "Ready to Ship",
      type: "Target",
    });
    rows.push({
      key: "ready-actual",
      category: "Ready to Ship",
      type: "Actual",
    });
    rows.push({
      key: "ready-diff",
      category: "Ready to Ship",
      type: "Diff",
    });

    // MultiPick rows
    rows.push({
      key: "multi-target",
      category: "MultiPick",
      type: "Target",
    });
    rows.push({
      key: "multi-actual",
      category: "MultiPick",
      type: "Actual",
    });
    rows.push({
      key: "multi-diff",
      category: "MultiPick",
      type: "Diff",
    });

    // เติมข้อมูลตามวันที่
    data.forEach((dayData) => {
      const dateKey = dayjs(dayData.date).format("DD/MM/YYYY");

      // Driver Check in
      rows[0][dateKey] = dayData.driverCheckIn.target;
      rows[1][dateKey] = dayData.driverCheckIn.actual;
      rows[2][dateKey] = dayData.driverCheckIn.diff;

      // Ready to Ship
      rows[3][dateKey] = dayData.readyToShip.target;
      rows[4][dateKey] = dayData.readyToShip.actual;
      rows[5][dateKey] = dayData.readyToShip.diff;

      // MultiPick
      rows[6][dateKey] = dayData.multiPick.target;
      rows[7][dateKey] = dayData.multiPick.actual;
      rows[8][dateKey] = dayData.multiPick.diff;
    });

    return rows;
  }, [data]);

  // สร้าง columns สำหรับตาราง
  const columns: ColumnsType<TableRowData> = useMemo(() => {
    const cols: ColumnsType<TableRowData> = [
      {
        title: "KPI",
        dataIndex: "category",
        key: "category",
        fixed: "left",
        width: 150,
        onCell: (_, index) => {
          // Merge cells สำหรับ category
          if (index !== undefined) {
            if (index % 3 === 0) {
              return { rowSpan: 3 };
            }
            return { rowSpan: 0 };
          }
          return {};
        },
        render: (text) => <strong>{text}</strong>,
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        fixed: "left",
        width: 80,
        align: "center",
      },
    ];

    // เพิ่ม columns สำหรับแต่ละวันที่
    data.forEach((dayData) => {
      const dateKey = dayjs(dayData.date).format("DD/MM/YYYY");
      cols.push({
        title: dateKey,
        dataIndex: dateKey,
        key: dateKey,
        width: 100,
        align: "center",
        render: (value: number, record) => {
          if (value === undefined || value === null) return "-";

          const displayValue = `${value}%`;
          
          // สีสำหรับ Diff
          if (record.type === "Diff") {
            const color = value >= 0 ? "#52c41a" : "#ff4d4f";
            return <span style={{ color, fontWeight: "bold" }}>{displayValue}</span>;
          }

          return displayValue;
        },
      });
    });

    return cols;
  }, [data]);

  return (
    <Card title="KPI Percent" style={{ marginBottom: 16 }}>
      <Table
        columns={columns}
        dataSource={tableData}
        loading={loading}
        scroll={{ x: "max-content" }}
        pagination={false}
        size="small"
        bordered
      />
    </Card>
  );
};

export default KpiPercent;
