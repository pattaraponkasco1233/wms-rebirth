// src/components/kpi-on-time/KpiOnTimeDetail.tsx

import React from "react";
import { Card, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { KpiOnTimeDetailData } from "../../models/kpi-on-time";
import { TABLE } from "../../constant/constants";

interface KpiOnTimeDetailProps {
  data: KpiOnTimeDetailData[];
  loading?: boolean;
}

const KpiOnTimeDetail: React.FC<KpiOnTimeDetailProps> = ({
  data,
  loading = false,
}) => {
  const columns: ColumnsType<KpiOnTimeDetailData> = [
    {
      title: "SAP Shipment",
      dataIndex: "sapShipment",
      key: "sapShipment",
      fixed: "left",
      width: 130,
    },
    {
      title: "Route",
      dataIndex: "route",
      key: "route",
      width: 100,
    },
    {
      title: "Job",
      dataIndex: "job",
      key: "job",
      width: 100,
    },
    {
      title: "ลำดับจัดสินค้า",
      dataIndex: "orderSequence",
      key: "orderSequence",
      width: 130,
    },
    {
      title: "Operation Date",
      dataIndex: "operationDate",
      key: "operationDate",
      width: 120,
    },
    {
      title: "Load Date",
      dataIndex: "loadDate",
      key: "loadDate",
      width: 120,
    },
    {
      title: "Cut Load",
      dataIndex: "cutLoad",
      key: "cutLoad",
      width: 100,
    },
    {
      title: "Truck License",
      dataIndex: "truckLicense",
      key: "truckLicense",
      width: 120,
    },
    {
      title: "Truck Type",
      dataIndex: "truckType",
      key: "truckType",
      width: 100,
    },
    {
      title: "Total",
      children: [
        {
          title: "DN",
          dataIndex: "totalDN",
          key: "totalDN",
          width: 70,
          align: "center",
        },
        {
          title: "ITEM",
          dataIndex: "totalItem",
          key: "totalItem",
          width: 70,
          align: "center",
        },
        {
          title: "BOX",
          dataIndex: "totalBox",
          key: "totalBox",
          width: 70,
          align: "center",
        },
      ],
    },
    {
      title: "PICK",
      dataIndex: "pick",
      key: "pick",
      width: 100,
    },
    {
      title: "WH Status",
      children: [
        {
          title: "Status",
          dataIndex: "whStatus",
          key: "whStatus",
          width: 100,
        },
        {
          title: "HK",
          dataIndex: "whStatusHK",
          key: "whStatusHK",
          width: 80,
        },
        {
          title: "NKIE",
          dataIndex: "whStatusNKIE",
          key: "whStatusNKIE",
          width: 80,
        },
        {
          title: "NK",
          dataIndex: "whStatusNK",
          key: "whStatusNK",
          width: 80,
        },
        {
          title: "KRW",
          dataIndex: "whStatusKRW",
          key: "whStatusKRW",
          width: 80,
        },
      ],
    },
    {
      title: "พาเรท (In Gate)",
      dataIndex: "inGate",
      key: "inGate",
      width: 120,
    },
    {
      title: "รอบยื่น",
      dataIndex: "submitRound",
      key: "submitRound",
      width: 100,
    },
    {
      title: "รถพร้อม",
      dataIndex: "truckReady",
      key: "truckReady",
      width: 100,
    },
    {
      title: "สถานะรถ",
      children: [
        {
          title: "HK",
          dataIndex: "truckStatusHK",
          key: "truckStatusHK",
          width: 80,
        },
        {
          title: "NKIE",
          dataIndex: "truckStatusNKIE",
          key: "truckStatusNKIE",
          width: 80,
        },
        {
          title: "NK",
          dataIndex: "truckStatusNK",
          key: "truckStatusNK",
          width: 80,
        },
        {
          title: "KRW",
          dataIndex: "truckStatusKRW",
          key: "truckStatusKRW",
          width: 80,
        },
      ],
    },
    {
      title: "ลำดับการเข้ารับสินค้า",
      children: [
        {
          title: "HK",
          dataIndex: "pickupSequenceHK",
          key: "pickupSequenceHK",
          width: 80,
        },
        {
          title: "NKIE",
          dataIndex: "pickupSequenceNKIE",
          key: "pickupSequenceNKIE",
          width: 80,
        },
        {
          title: "NK",
          dataIndex: "pickupSequenceNK",
          key: "pickupSequenceNK",
          width: 80,
        },
        {
          title: "KRW",
          dataIndex: "pickupSequenceKRW",
          key: "pickupSequenceKRW",
          width: 80,
        },
      ],
    },
  ];

  return (
    <Card title="ตารางรายละเอียด" style={{ marginBottom: 16 }}>
      <Table
        columns={columns}
        dataSource={data.map((item, index) => ({
          ...item,
          key: `detail-${index}`,
        }))}
        loading={loading}
        scroll={{ x: "max-content", y: 600 }}
        pagination={{
          defaultPageSize: TABLE.pageSizeDefault,
          showTotal: (total) => `ทั้งหมด ${total} รายการ`,
        }}
        size="small"
        bordered
      />
    </Card>
  );
};

export default KpiOnTimeDetail;
