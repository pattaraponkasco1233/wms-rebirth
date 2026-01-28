// src/components/warehouse-status/WarehouseStatusSummary.tsx

import React from "react";
import { Card, Table } from "antd";
import { WarehouseStatusSummary } from "../../models/warehouse-status";
import { PLANT_OPTIONS, STATUS_OPTIONS } from "../../constant/constants";

interface WarehouseStatusSummaryProps {
  data: WarehouseStatusSummary[];
}

const WarehouseStatusSummaryComponent: React.FC<
  WarehouseStatusSummaryProps
> = ({ data }) => {
  // Calculate total row
  const calculateTotal = () => {
    const totals: any = {
      status: "TOTAL",
      statusLabel: "Total",
      plants: {},
    };

    PLANT_OPTIONS.forEach((plant) => {
      totals.plants[plant.value] = {
        sm: 0,
        dn: 0,
        items: 0,
        box: 0,
      };
    });

    data.forEach((row) => {
      PLANT_OPTIONS.forEach((plant) => {
        const plantData = row.plants[plant.value];
        if (plantData) {
          totals.plants[plant.value].sm += plantData.sm || 0;
          totals.plants[plant.value].dn += plantData.dn || 0;
          totals.plants[plant.value].items += plantData.items || 0;
          totals.plants[plant.value].box += plantData.box || 0;
        }
      });
    });

    return totals;
  };

  // Add total row to data
  const dataWithTotal = [...data, calculateTotal()];

  // Create columns for the summary table
  const columns: any[] = [
    {
      title: "Status",
      dataIndex: "statusLabel",
      key: "statusLabel",
      fixed: "left",
      width: 150,
      render: (value: string, record: any) => {
        // Find the color for this status
        const statusOption = STATUS_OPTIONS.find(
          (opt) => opt.value === record.status,
        );
        const backgroundColor = statusOption?.color || "transparent";

        if (record.status === "TOTAL") {
          return <strong>{value}</strong>;
        }
        return (
          <div
            style={{
              backgroundColor,
              padding: "8px",
              margin: "-8px -8px",
            }}
          >
            {value}
          </div>
        );
      },
    },
  ];

  // Add columns for each plant
  PLANT_OPTIONS.forEach((plant) => {
    columns.push({
      title: plant.label,
      key: plant.value,
      children: [
        {
          title: "SM",
          dataIndex: ["plants", plant.value, "sm"],
          key: `${plant.value}_sm`,
          width: 80,
          align: "center" as const,
          render: (value: number, record: any) => {
            const val = value || 0;
            return record.status === "TOTAL" ? <strong>{val}</strong> : val;
          },
        },
        {
          title: "DN",
          dataIndex: ["plants", plant.value, "dn"],
          key: `${plant.value}_dn`,
          width: 80,
          align: "center" as const,
          render: (value: number, record: any) => {
            const val = value || 0;
            return record.status === "TOTAL" ? <strong>{val}</strong> : val;
          },
        },
        {
          title: "ITEMS",
          dataIndex: ["plants", plant.value, "items"],
          key: `${plant.value}_items`,
          width: 80,
          align: "center" as const,
          render: (value: number, record: any) => {
            const val = value || 0;
            return record.status === "TOTAL" ? <strong>{val}</strong> : val;
          },
        },
        {
          title: "BOX",
          dataIndex: ["plants", plant.value, "box"],
          key: `${plant.value}_box`,
          width: 80,
          align: "center" as const,
          render: (value: number, record: any) => {
            const val = value || 0;
            return record.status === "TOTAL" ? <strong>{val}</strong> : val;
          },
        },
      ],
    });
  });

  return (
    <Card>
      <Table
        columns={columns}
        dataSource={dataWithTotal}
        rowKey="status"
        pagination={false}
        bordered
        size="small"
        onRow={(record) => {
          // Find the color for this status
          const statusOption = STATUS_OPTIONS.find(
            (opt) => opt.value === record.status,
          );
          return {
            style: {
              backgroundColor: statusOption?.color || "transparent",
            },
          };
        }}
      />
    </Card>
  );
};

export default WarehouseStatusSummaryComponent;
