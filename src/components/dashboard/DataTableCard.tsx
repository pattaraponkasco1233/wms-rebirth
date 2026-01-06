// src/components/dashboard/DataTableCard.tsx

import React from "react";
import { Card, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

export interface DataTableCardProps<T> {
  title: string;
  columns: ColumnsType<T>;
  dataSource: T[];
  loading?: boolean;
  pagination?: boolean | object;
  extra?: React.ReactNode;
  rowKey?: string | ((record: T) => string);
}

function DataTableCard<T extends object>({
  title,
  columns,
  dataSource,
  loading = false,
  pagination = true,
  extra,
  rowKey = "id",
}: DataTableCardProps<T>) {
  return (
    <Card title={title} extra={extra} bordered={false} loading={loading}>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={rowKey}
        pagination={
          pagination === true
            ? {
                pageSize: 5,
                showSizeChanger: false,
                showTotal: (total) => `ทั้งหมด ${total} รายการ`,
              }
            : pagination || false
        }
        bordered
        scroll={{ x: true }}
      />
    </Card>
  );
}

export default DataTableCard;
