// src/components/kpi-on-time/KpiOnTimeSummary.tsx

import React, { useMemo } from "react";
import { Card, Table } from "antd";
import { KpiOnTimeSummaryData, KpiOnTimeDetailData } from "../../models/kpi-on-time";
import { ListConditionKPI } from "../../constant/constants";

interface KpiOnTimeSummaryProps {
  detailData: KpiOnTimeDetailData[];
  loading?: boolean;
}

const KpiOnTimeSummary: React.FC<KpiOnTimeSummaryProps> = ({
  detailData,
  loading = false,
}) => {
  // Calculate summary data from detail data
  const summaryData = useMemo(() => {
    const summary: KpiOnTimeSummaryData[] = [];

    // สร้างตาราง matrix ของ CheckIn vs ReadyToShip
    ListConditionKPI.forEach((checkInCondition) => {
      const row: KpiOnTimeSummaryData = {
        checkInCondition,
      };

      ListConditionKPI.forEach((readyToShipCondition) => {
        // Count จำนวนแถวใน detail ที่มี condition ตรงกัน
        const count = detailData.filter(
          (item) =>
            item.checkInCondition === checkInCondition &&
            item.readyToShipCondition === readyToShipCondition
        ).length;

        row[readyToShipCondition] = count;
      });

      summary.push(row);
    });

    return summary;
  }, [detailData]);

  // Calculate column totals
  const columnTotals = useMemo(() => {
    const totals: { [key: string]: number } = {
      checkInCondition: 0, // Not used but for consistency
    };

    ListConditionKPI.forEach((condition) => {
      totals[condition] = summaryData.reduce(
        (sum, row) => sum + ((row[condition] as number) || 0),
        0
      );
    });

    return totals;
  }, [summaryData]);

  // Calculate row totals
  const rowTotals = useMemo(() => {
    return summaryData.map((row) => {
      let total = 0;
      ListConditionKPI.forEach((condition) => {
        total += (row[condition] as number) || 0;
      });
      return total;
    });
  }, [summaryData]);

  // Define columns for the table
  const columns = [
    {
      title: "Check In / Ready to Ship",
      dataIndex: "checkInCondition",
      key: "checkInCondition",
      fixed: "left" as const,
      width: 150,
      render: (text: string) => <strong>{text}</strong>,
    },
    ...ListConditionKPI.map((condition) => ({
      title: condition,
      dataIndex: condition,
      key: condition,
      width: 80,
      align: "center" as const,
      render: (value: number) => value || 0,
    })),
    {
      title: "Total",
      key: "total",
      fixed: "right" as const,
      width: 80,
      align: "center" as const,
      render: (_: any, __: any, index: number) => (
        <strong>{rowTotals[index]}</strong>
      ),
    },
  ];

  // Add summary row
  const dataWithSummary = [
    ...summaryData.map((row, index) => ({
      ...row,
      key: `summary-${index}`,
    })),
    {
      key: "total-row",
      checkInCondition: "Total",
      ...columnTotals,
      total: rowTotals.reduce((sum, val) => sum + val, 0),
    },
  ];

  return (
    <Card title="ตารางสรุป KPI On Time" style={{ marginBottom: 16 }}>
      <Table
        columns={columns}
        dataSource={dataWithSummary}
        loading={loading}
        scroll={{ x: "max-content", y: 400 }}
        pagination={false}
        size="small"
        bordered
        rowClassName={(record) =>
          record.key === "total-row" ? "summary-row-bold" : ""
        }
      />
      <style>
        {`
          .summary-row-bold {
            background-color: #f0f0f0;
            font-weight: bold;
          }
        `}
      </style>
    </Card>
  );
};

export default KpiOnTimeSummary;
