// src/components/warehouse-status/WarehouseStatusDetail.tsx

import React from "react";
import { Card, Table } from "antd";
import { WarehouseStatusDetail } from "../../models/warehouse-status";
import { PLANT_OPTIONS, STATUS_OPTIONS, TABLE } from "../../constant/constants";
import dayjs from "dayjs";

interface WarehouseStatusDetailProps {
  data: WarehouseStatusDetail[];
  loading?: boolean;
}

const WarehouseStatusDetailComponent: React.FC<WarehouseStatusDetailProps> = ({
  data,
  loading = false,
}) => {
  const columns = [
    {
      title: "Plant",
      dataIndex: "plant",
      key: "plant",
      width: 100,
      fixed: "left" as const,
      render: (value: string) => {
        const plant = PLANT_OPTIONS.find((p) => p.value === value);
        return plant ? plant.label : value;
      },
    },
    {
      title: "SAP Shipment",
      dataIndex: "sapShipment",
      key: "sapShipment",
      width: 150,
    },
    {
      title: "Shipment No",
      dataIndex: "shipmentNo",
      key: "shipmentNo",
      width: 150,
    },
    {
      title: "WH Status",
      dataIndex: "whStatus",
      key: "whStatus",
      width: 150,
      render: (value: string) => {
        const status = STATUS_OPTIONS.find((s) => s.value === value);
        return status ? status.label : value;
      },
    },
    {
      title: "Route",
      dataIndex: "route",
      key: "route",
      width: 120,
    },
    {
      title: "Delivery No",
      dataIndex: "deliveryNo",
      key: "deliveryNo",
      width: 150,
    },
    {
      title: "Ready to Ship",
      dataIndex: "readyToShip",
      key: "readyToShip",
      width: 160,
      render: (value: string) => {
        return value ? dayjs(value).format("DD/MM/YYYY HH:mm") : "-";
      },
    },
    {
      title: "Load Date",
      dataIndex: "loadDate",
      key: "loadDate",
      width: 120,
      render: (value: string) => {
        return value ? dayjs(value).format("DD/MM/YYYY") : "-";
      },
    },
    {
      title: "Cut Load",
      dataIndex: "cutLoad",
      key: "cutLoad",
      width: 100,
      align: "center" as const,
    },
    {
      title: "Truck Ready",
      dataIndex: "truckReady",
      key: "truckReady",
      width: 100,
      align: "center" as const,
    },
  ];

  return (
    <Card title="รายละเอียดสถานะคลังสินค้า">
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record, index) => `${record.shipmentNo}_${index}`}
        pagination={{
          defaultPageSize: TABLE.pageSizeDefault,
        }}
        bordered
        scroll={{ x: 1400 }}
        size="small"
        loading={loading}
      />
    </Card>
  );
};

export default WarehouseStatusDetailComponent;
