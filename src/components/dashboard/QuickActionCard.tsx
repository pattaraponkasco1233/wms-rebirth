// src/components/dashboard/QuickActionCard.tsx

import React from "react";
import { Card, Button, Space } from "antd";

export interface QuickAction {
  key: string;
  label: string;
  icon?: React.ReactNode;
  type?: "primary" | "default" | "dashed" | "link" | "text";
  onClick: () => void;
}

export interface QuickActionCardProps {
  title?: string;
  actions: QuickAction[];
  loading?: boolean;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title = "การดำเนินการด่วน",
  actions,
  loading = false,
}) => {
  return (
    <Card title={title} bordered={false} loading={loading}>
      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        {actions.map((action) => (
          <Button
            key={action.key}
            type={action.type || "default"}
            icon={action.icon}
            onClick={action.onClick}
            block
            size="large"
          >
            {action.label}
          </Button>
        ))}
      </Space>
    </Card>
  );
};

export default QuickActionCard;
