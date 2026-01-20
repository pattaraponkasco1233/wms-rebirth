// src/components/warehouse-status/WarehouseStatusPlantOverview.tsx

import React from "react";
import { Card, Row, Col } from "antd";
import { CarOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { WarehouseStatusDetail } from "../../models/warehouse-status";
import { PLANT_OPTIONS } from "../../constant/constants";

interface WarehouseStatusPlantOverviewProps {
  data: WarehouseStatusDetail[];
}

const WarehouseStatusPlantOverview: React.FC<WarehouseStatusPlantOverviewProps> = ({
  data,
}) => {
  // Calculate Picking and Check in counts for each plant
  const calculatePlantStats = (plantValue: string) => {
    const plantData = data.filter((item) => item.plant === plantValue);

    // Picking: Status 003 (Start Pick), 004 (End Pick)
    const pickingCount = plantData.filter(
      (item) => item.whStatus === "003" || item.whStatus === "004"
    ).length;

    // Check in: Status >= 005 (RTS, Assign Bay, Start Load, End Load, Check Out)
    const checkInCount = plantData.filter(
      (item) =>
        parseInt(item.whStatus) >= 5 && parseInt(item.whStatus) <= 9
    ).length;

    return { pickingCount, checkInCount };
  };

  return (
    <Row gutter={[16, 16]}>
      {PLANT_OPTIONS.map((plant) => {
        const stats = calculatePlantStats(plant.value);
        return (
          <Col key={plant.value} xs={24} sm={24} md={12} lg={12}>
            <Card
              size="small"
              style={{
                background: "#fafafa",
                borderRadius: "8px",
              }}
            >
              <Row gutter={16} align="middle">
                <Col span={8}>
                  <div style={{ 
                    textAlign: "center",
                    padding: "8px",
                    background: "#1890ff",
                    borderRadius: "6px"
                  }}>
                    <h2 style={{ 
                      margin: 0, 
                      fontSize: "24px", 
                      fontWeight: "bold",
                      color: "#fff"
                    }}>
                      {plant.label}
                    </h2>
                  </div>
                </Col>
                <Col span={8}>
                  <div style={{ textAlign: "center", padding: "4px" }}>
                    <div style={{ fontSize: "12px", color: "#8c8c8c", marginBottom: "4px" }}>
                      <CarOutlined /> Picking
                    </div>
                    <div style={{ 
                      fontSize: "28px", 
                      fontWeight: "bold", 
                      color: "#1890ff",
                      lineHeight: 1
                    }}>
                      {stats.pickingCount}
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div style={{ textAlign: "center", padding: "4px" }}>
                    <div style={{ fontSize: "12px", color: "#8c8c8c", marginBottom: "4px" }}>
                      <CheckCircleOutlined /> Check in
                    </div>
                    <div style={{ 
                      fontSize: "28px", 
                      fontWeight: "bold", 
                      color: "#52c41a",
                      lineHeight: 1
                    }}>
                      {stats.checkInCount}
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default WarehouseStatusPlantOverview;
