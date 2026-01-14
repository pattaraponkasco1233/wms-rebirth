// src/pages/proactive-monitor/ProactiveMonitoringTab.tsx

import React from "react";
import { Empty, Card } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const ProactiveMonitoringTab: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <h3>Pro-active Monitoring</h3>
        <p style={{ color: "#8c8c8c" }}>
          ระบบติดตามและแจ้งเตือนเชิงรุกสำหรับการจัดการโลจิสติกส์
        </p>
      </div>
      <Card
        style={{
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Empty
          image={<InboxOutlined style={{ fontSize: 64, color: "#d9d9d9" }} />}
          description={
            <div>
              <h3 style={{ color: "#8c8c8c", marginBottom: "8px" }}>
                Coming Soon
              </h3>
              <p style={{ color: "#bfbfbf" }}>
                ฟีเจอร์นี้กำลังอยู่ระหว่างการพัฒนา
              </p>
              <p style={{ color: "#bfbfbf" }}>
                ระบบจะแจ้งเตือนเชิงรุกเมื่อมีสถานการณ์ที่ต้องการความสนใจ
              </p>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default ProactiveMonitoringTab;
