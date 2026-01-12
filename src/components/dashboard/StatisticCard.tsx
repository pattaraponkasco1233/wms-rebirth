// src/components/dashboard/StatisticCard.tsx

import React from "react";
import { Card, Statistic, Row, Col } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

export interface StatisticCardProps {
  title: string;
  value: number | string;
  prefix?: React.ReactNode;
  suffix?: string;
  precision?: number;
  valueStyle?: React.CSSProperties;
  trend?: "up" | "down";
  trendValue?: number;
  loading?: boolean;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  prefix,
  suffix,
  precision = 0,
  valueStyle,
  trend,
  trendValue,
  loading = false,
}) => {
  const getTrendColor = () => {
    if (trend === "up") return "#3f8600";
    if (trend === "down") return "#cf1322";
    return undefined;
  };

  const getTrendIcon = () => {
    if (trend === "up") return <ArrowUpOutlined />;
    if (trend === "down") return <ArrowDownOutlined />;
    return null;
  };

  return (
    <Card loading={loading}>
      <Statistic
        title={title}
        value={value}
        precision={precision}
        valueStyle={valueStyle || { color: "#1890ff" }}
        prefix={prefix}
        suffix={suffix}
      />
      {trend && trendValue !== undefined && (
        <div style={{ marginTop: 8, fontSize: 14 }}>
          <span style={{ color: getTrendColor() }}>
            {getTrendIcon()} {trendValue}%
          </span>
          <span style={{ marginLeft: 8, color: "#8c8c8c" }}>
            เทียบกับเดือนที่แล้ว
          </span>
        </div>
      )}
    </Card>
  );
};

export default StatisticCard;
