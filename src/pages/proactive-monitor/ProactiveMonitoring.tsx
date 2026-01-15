// src/pages/proactive-monitor/ProactiveMonitoring.tsx

import React, { useState, useEffect } from "react";
import { Space, message } from "antd";
import dayjs from "dayjs";
import {
  ProactiveMonitorFilter,
  ProactiveMonitorSummary,
  ProactiveMonitorDetail,
} from "../../components/proactive-monitor";
import { ProactiveMonitorFilter as FilterType } from "../../models/proactive-monitor";
import { fetchProactiveMonitorData } from "../../services/api/proactiveMonitor.service";
import type { ProactiveMonitorResponse } from "../../models/proactive-monitor";

const ProactiveMonitoring: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<FilterType>({
    date: dayjs().format("YYYY-MM-DD"),
    plant: "",
    carrier: "",
    route: "",
    vehicleType: "",
    shipmentNo: "",
    jobNumber: "",
    operationDate: "",
  });
  const [data, setData] = useState<ProactiveMonitorResponse>({
    summary: [],
    details: [],
    grandTotal: {
      checkInYes: 0,
      checkInNo: 0,
      status001: 0,
      status002: 0,
      status003: 0,
      status004: 0,
      status005: 0,
      status006: 0,
      status007: 0,
      status008: 0,
      status009: 0,
      total: 0,
    },
  });

  // Load data on component mount
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const result = await fetchProactiveMonitorData(filter);
      setData(result);
      message.success("ดึงข้อมูลสำเร็จ");
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Filter Section */}
        <ProactiveMonitorFilter
          filter={filter}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />

        {/* Summary Table */}
        <ProactiveMonitorSummary
          data={data.summary}
          grandTotal={data.grandTotal}
        />

        {/* Detail Table */}
        <ProactiveMonitorDetail data={data.details} loading={loading} />
      </Space>
    </div>
  );
};

export default ProactiveMonitoring;
