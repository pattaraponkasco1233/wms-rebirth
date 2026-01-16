// src/components/proactive-monitor/ProactiveMonitorDetail.tsx

import React from "react";
import { Table, Card, Typography, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { ProactiveMonitorDetail } from "@/models/proactive-monitor";
import {
  STATUS_OPTIONS,
  CARRIER_OPTIONS,
  PLANT_OPTIONS,
  VEHICLE_TYPE_OPTIONS,
  TABLE,
} from "../../constant/constants";

const { Title } = Typography;

interface ProactiveMonitorDetailProps {
  data: ProactiveMonitorDetail[];
  loading?: boolean;
}

const ProactiveMonitorDetailTable: React.FC<ProactiveMonitorDetailProps> = ({
  data,
  loading = false,
}) => {
  // Helper function to format date
  const formatDate = (date?: string) => {
    if (!date) return "-";
    return dayjs(date).format("DD/MM/YYYY HH:mm");
  };

  // Helper function to get label from options
  const getLabel = (value: string, options: readonly any[]) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const columns: ColumnsType<ProactiveMonitorDetail> = [
    {
      title: "Shipment No",
      dataIndex: "shipmentNo",
      key: "shipmentNo",
      fixed: "left",
      width: 120,
    },
    {
      title: "Shipment Type",
      dataIndex: "shipmentType",
      key: "shipmentType",
      width: 120,
    },
    {
      title: "Plant",
      dataIndex: "plant",
      key: "plant",
      width: 80,
      render: (value: string) => getLabel(value, PLANT_OPTIONS),
    },
    {
      title: "Pick Seq",
      dataIndex: "pickSeq",
      key: "pickSeq",
      width: 90,
    },
    {
      title: "Job Number",
      dataIndex: "jobNumber",
      key: "jobNumber",
      width: 110,
    },
    {
      title: "Plant Load Date",
      dataIndex: "plantLoadDate",
      key: "plantLoadDate",
      width: 120,
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Operation Date",
      dataIndex: "operationDate",
      key: "operationDate",
      width: 130,
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Carrier",
      dataIndex: "carrier",
      key: "carrier",
      width: 140,
      render: (value: string) => getLabel(value, CARRIER_OPTIONS),
    },
    {
      title: "Shipment Status",
      dataIndex: "shipmentStatus",
      key: "shipmentStatus",
      width: 150,
      render: (value: string) => {
        const status = STATUS_OPTIONS.find((s) => s.value === value);
        return status ? <Tag color="blue">{status.label}</Tag> : value;
      },
    },
    {
      title: "Check In",
      dataIndex: "checkIn",
      key: "checkIn",
      width: 90,
      align: "center",
      render: (value: boolean) => (
        <Tag color={value ? "success" : "error"}>{value ? "Yes" : "No"}</Tag>
      ),
    },
    {
      title: "Time Remaining",
      dataIndex: "timeRemaining",
      key: "timeRemaining",
      width: 130,
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicleType",
      key: "vehicleType",
      width: 120,
      render: (value: string) => getLabel(value, VEHICLE_TYPE_OPTIONS),
    },
    {
      title: "Vehicle License",
      dataIndex: "vehicleLicense",
      key: "vehicleLicense",
      width: 130,
    },
    {
      title: "Loading Scheduler",
      dataIndex: "loadingScheduler",
      key: "loadingScheduler",
      width: 150,
      render: formatDate,
    },
    {
      title: "Booked",
      dataIndex: "booked",
      key: "booked",
      width: 150,
      render: formatDate,
    },
    {
      title: "Start Pick",
      dataIndex: "startPick",
      key: "startPick",
      width: 150,
      render: formatDate,
    },
    {
      title: "End Pick",
      dataIndex: "endPick",
      key: "endPick",
      width: 150,
      render: formatDate,
    },
    {
      title: "RTS",
      dataIndex: "rts",
      key: "rts",
      width: 150,
      render: formatDate,
    },
    {
      title: "Assign Bay",
      dataIndex: "assignBay",
      key: "assignBay",
      width: 150,
      render: formatDate,
    },
    {
      title: "Start Load",
      dataIndex: "startLoad",
      key: "startLoad",
      width: 150,
      render: formatDate,
    },
    {
      title: "End Load",
      dataIndex: "endLoad",
      key: "endLoad",
      width: 150,
      render: formatDate,
    },
    {
      title: "Check Out",
      dataIndex: "checkOut",
      key: "checkOut",
      width: 150,
      render: formatDate,
    },
  ];

  return (
    <Card>
      <Title level={4}>รายละเอียด (Detail)</Title>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="shipmentNo"
        loading={loading}
        pagination={{
          defaultPageSize: TABLE.pageSizeDefault,
          // showSizeChanger: true,
          // showTotal: (total) => `ทั้งหมด ${total} รายการ`,
          // pageSizeOptions: ["10", "20", "50", "100"],
        }}
        scroll={{ x: 2500 }}
        bordered
        size="small"
      />
    </Card>
  );
};

export default ProactiveMonitorDetailTable;
