// src/pages/truck-checkin/components/TruckCheckinTable.tsx

import React from "react";
import { Table, Button, Tag, Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import type { TruckCheckin } from "../../models/truck-checkin/truck-checkin.model";
import { TRUCK_CHECKIN_STATUS_OPTIONS } from "../../constant/constants";

interface TruckCheckinTableProps {
  dataSource: TruckCheckin[];
  loading: boolean;
  currentPage: number;
  pageSize: number;
  total: number;
  onEdit: (record: TruckCheckin) => void;
  onPageChange: (page: number, size: number) => void;
}

const TruckCheckinTable: React.FC<TruckCheckinTableProps> = ({
  dataSource,
  loading,
  currentPage,
  pageSize,
  total,
  onEdit,
  onPageChange,
}) => {
  const { t } = useTranslation();

  // ฟังก์ชันแสดง Tag สถานะ
  const renderStatusTag = (status: string) => {
    const statusOption = TRUCK_CHECKIN_STATUS_OPTIONS.find(
      (option) => option.value === status,
    );

    if (statusOption) {
      return <Tag color={statusOption.color}>{t(statusOption.labelKey)}</Tag>;
    }

    return <Tag>{status}</Tag>;
  };

  // Columns สำหรับตาราง
  const columns: ColumnsType<TruckCheckin> = [
    {
      title: t("labels.runno"),
      key: "index",
      width: 80,
      align: "center",
      render: (_text, _record, index) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: t("truckCheckin.plant"),
      dataIndex: "plant",
      key: "plant",
      width: 150,
    },
    {
      title: t("truckCheckin.carrier"),
      dataIndex: "carrier",
      key: "carrier",
      width: 150,
    },
    {
      title: t("truckCheckin.vehicleType"),
      dataIndex: "vehicleType",
      key: "vehicleType",
      width: 150,
    },
    {
      title: t("truckCheckin.truckLicense"),
      dataIndex: "license",
      key: "license",
      width: 150,
    },
    {
      title: t("truckCheckin.shipmentNo"),
      dataIndex: "shipmentNo",
      key: "shipmentNo",
      width: 180,
    },
    {
      title: t("truckCheckin.driverName"),
      dataIndex: "driver",
      key: "driver",
      width: 200,
    },
    {
      title: t("truckCheckin.tel"),
      dataIndex: "tel",
      key: "tel",
      width: 150,
    },
    {
      title: t("truckCheckin.checkinDateTime"),
      dataIndex: "checkin",
      key: "checkin",
      width: 150,
    },
    {
      title: t("truckCheckin.status"),
      dataIndex: "status",
      key: "status",
      width: 150,
      align: "center",
      render: (status: string) => renderStatusTag(status),
    },
    {
      title: t("truckCheckin.action"),
      key: "action",
      width: 100,
      align: "center",
      fixed: "right",
      render: (_text, record) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          size="small"
          onClick={() => onEdit(record)}
        >
          {t("actions.edit")}
        </Button>
      ),
    },
  ];

  return (
    <Card>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          showTotal: (total) =>
            `${t("labels.total")} ${total} ${t("labels.items")}`,
          onChange: onPageChange,
        }}
        scroll={{ x: 1200 }}
      />
    </Card>
  );
};

export default TruckCheckinTable;
