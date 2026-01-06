// src/components/dashboard/ProgressCard.tsx

import React from "react";
import { Card, Progress, Space } from "antd";

export interface ProgressItem {
  label: string;
  percent: number;
  status?: "success" | "exception" | "normal" | "active";
  color?: string;
}

export interface ProgressCardProps {
  title: string;
  items: ProgressItem[];
  loading?: boolean;
  type?: "line" | "circle" | "dashboard";
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  items,
  loading = false,
  type = "line",
}) => {
  return (
    <Card title={title} bordered={false} loading={loading}>
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        {items.map((item, index) => (
          <div key={index}>
            <div style={{ marginBottom: 8, fontWeight: 500 }}>{item.label}</div>
            <Progress
              percent={item.percent}
              status={item.status}
              strokeColor={item.color}
              type={type}
            />
          </div>
        ))}
      </Space>
    </Card>
  );
};

export default ProgressCard;
