// src/components/dashboard/ChartCard.tsx

import React from "react";
import { Card } from "antd";

export interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
  loading?: boolean;
  bodyStyle?: React.CSSProperties;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  children,
  extra,
  loading = false,
  bodyStyle,
}) => {
  return (
    <Card
      title={title}
      extra={extra}
      bordered={false}
      loading={loading}
      bodyStyle={bodyStyle || { padding: "20px 24px" }}
    >
      {children}
    </Card>
  );
};

export default ChartCard;
