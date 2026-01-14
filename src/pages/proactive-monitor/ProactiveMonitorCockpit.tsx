// src/pages/proactive-monitor/ProactiveMonitorCockpit.tsx

import React, { useState } from "react";
import { Tabs, Card } from "antd";
import { DashboardOutlined, MonitorOutlined } from "@ant-design/icons";
import OverallMonitoringTab from "./OverallMonitoringTab";
import ProactiveMonitoringTab from "./ProactiveMonitoringTab";

const ProactiveMonitorCockpit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overall");

  const items = [
    {
      key: "overall",
      label: (
        <span>
          <DashboardOutlined />
          Overall Monitoring
        </span>
      ),
      children: <OverallMonitoringTab />,
    },
    {
      key: "proactive",
      label: (
        <span>
          <MonitorOutlined />
          Pro-active Monitoring
        </span>
      ),
      children: <ProactiveMonitoringTab />,
    },
  ];

  return (
    <div>
      <Card>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={items}
          size="large"
        />
      </Card>
    </div>
  );
};

export default ProactiveMonitorCockpit;
