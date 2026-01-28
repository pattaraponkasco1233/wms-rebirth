// src/components/proactive-monitor/ProactiveMonitorSummary.tsx

import React from "react";
import { Table, Card, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ProactiveMonitorSummary } from "../../models/proactive-monitor";
import { STATUS_OPTIONS } from "../../constant/constants";

const { Title } = Typography;

interface ProactiveMonitorSummaryProps {
  data: ProactiveMonitorSummary[];
  grandTotal: {
    checkInYes: number;
    checkInNo: number;
    status001: number;
    status002: number;
    status003: number;
    status004: number;
    status005: number;
    status006: number;
    status007: number;
    status008: number;
    status009: number;
    total: number;
  };
}

const ProactiveMonitorSummaryTable: React.FC<ProactiveMonitorSummaryProps> = ({
  data,
  grandTotal,
}) => {
  const columns: ColumnsType<ProactiveMonitorSummary> = [
    {
      title: "Plant Load Time",
      dataIndex: "plantLoadTime",
      key: "plantLoadTime",
      fixed: "left",
      width: 150,
    },
    {
      title: "Check In Yes",
      dataIndex: "checkInYes",
      key: "checkInYes",
      // width: 120,
      align: "center",
    },
    {
      title: "Check In No",
      dataIndex: "checkInNo",
      key: "checkInNo",
      // width: 120,
      align: "center",
    },
    ...STATUS_OPTIONS.map((status) => ({
      title: status.label,
      dataIndex: `status${status.value}` as keyof ProactiveMonitorSummary,
      key: `status${status.value}`,
      // width: 150,
      align: "center" as const,
    })),
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      // width: 100,
      align: "center",
      fixed: "right",
      render: (value: number) => <strong>{value}</strong>,
    },
  ];

  // สร้างแถว Grand Total
  const renderSummary = () => (
    <Table.Summary fixed>
      <Table.Summary.Row
        style={{ backgroundColor: "#fafafa", fontWeight: "bold" }}
      >
        <Table.Summary.Cell index={0}>
          <strong>Grand Total</strong>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={1} align="center">
          <strong>{grandTotal.checkInYes}</strong>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={2} align="center">
          <strong>{grandTotal.checkInNo}</strong>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={3} align="center">
          <strong>{grandTotal.status001}</strong>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={4} align="center">
          <strong>{grandTotal.status002}</strong>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={5} align="center">
          <strong>{grandTotal.status003}</strong>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={6} align="center">
          <strong>{grandTotal.status004}</strong>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={7} align="center">
          <strong>{grandTotal.status005}</strong>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={8} align="center">
          <strong>{grandTotal.status006}</strong>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={9} align="center">
          <strong>{grandTotal.status007}</strong>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={10} align="center">
          <strong>{grandTotal.status008}</strong>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={11} align="center">
          <strong>{grandTotal.status009}</strong>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={12} align="center">
          <strong>{grandTotal.total}</strong>
        </Table.Summary.Cell>
      </Table.Summary.Row>
    </Table.Summary>
  );

  return (
    // <Card style={{ marginBottom: 16 }}>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="plantLoadTime"
        pagination={false}
        // scroll={{ x: 1500 }}
        bordered
        size="small"
        summary={renderSummary}
      />
    // </Card>
  );
};

export default ProactiveMonitorSummaryTable;
