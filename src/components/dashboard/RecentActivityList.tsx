// src/components/dashboard/RecentActivityList.tsx

import React from "react";
import { Card, List, Tag, Avatar } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

export interface Activity {
  id: string;
  title: string;
  description: string;
  status: "success" | "processing" | "pending" | "error";
  timestamp: string;
  avatar?: string;
}

export interface RecentActivityListProps {
  activities: Activity[];
  title?: string;
  loading?: boolean;
  maxItems?: number;
}

const RecentActivityList: React.FC<RecentActivityListProps> = ({
  activities,
  title = "กิจกรรมล่าสุด",
  loading = false,
  maxItems = 5,
}) => {
  const getStatusConfig = (status: Activity["status"]) => {
    switch (status) {
      case "success":
        return {
          color: "success",
          icon: <CheckCircleOutlined />,
          text: "เสร็จสิ้น",
        };
      case "processing":
        return {
          color: "processing",
          icon: <SyncOutlined spin />,
          text: "กำลังดำเนินการ",
        };
      case "pending":
        return {
          color: "warning",
          icon: <ClockCircleOutlined />,
          text: "รอดำเนินการ",
        };
      case "error":
        return {
          color: "error",
          icon: <CloseCircleOutlined />,
          text: "ผิดพลาด",
        };
      default:
        return {
          color: "default",
          icon: null,
          text: status,
        };
    }
  };

  const displayActivities = activities.slice(0, maxItems);

  return (
    <Card title={title} bordered={false} loading={loading}>
      <List
        itemLayout="horizontal"
        dataSource={displayActivities}
        renderItem={(item) => {
          const statusConfig = getStatusConfig(item.status);
          return (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon={statusConfig.icon}
                    style={{
                      backgroundColor:
                        statusConfig.color === "success"
                          ? "#52c41a"
                          : statusConfig.color === "processing"
                          ? "#1890ff"
                          : statusConfig.color === "warning"
                          ? "#faad14"
                          : statusConfig.color === "error"
                          ? "#ff4d4f"
                          : "#d9d9d9",
                    }}
                  />
                }
                title={
                  <div>
                    {item.title}
                    <Tag color={statusConfig.color} style={{ marginLeft: 8 }}>
                      {statusConfig.text}
                    </Tag>
                  </div>
                }
                description={
                  <div>
                    <div>{item.description}</div>
                    <span style={{ color: "#8c8c8c", fontSize: 12 }}>
                      {item.timestamp}
                    </span>
                  </div>
                }
              />
            </List.Item>
          );
        }}
      />
    </Card>
  );
};

export default RecentActivityList;
