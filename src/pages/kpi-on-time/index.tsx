// src/pages/kpi-on-time/index.tsx

import React, { useState, useEffect } from "react";
import { Space, message } from "antd";
import dayjs from "dayjs";
import KpiOnTimeFilter from "../../components/kpi-on-time/KpiOnTimeFilter";
import KpiOnTimeSummary from "../../components/kpi-on-time/KpiOnTimeSummary";
import KpiOnTimeDetail from "../../components/kpi-on-time/KpiOnTimeDetail";
import KpiPercent from "../../components/kpi-on-time/KpiPercent";
import {
  KpiOnTimeFilterParams,
  KpiOnTimeDetailData,
  KpiPercentDailyData,
} from "../../models/kpi-on-time";
import { kpiOnTimeApi } from "../../services/api";

const KpiOnTimePage: React.FC = () => {
  const [filter, setFilter] = useState<KpiOnTimeFilterParams>({
    startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
    endDate: dayjs().endOf("month").format("YYYY-MM-DD"),
  });

  const [detailData, setDetailData] = useState<KpiOnTimeDetailData[]>([]);
  const [percentData, setPercentData] = useState<KpiPercentDailyData[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch both data in parallel
      const [detailResponse, percentResponse] = await Promise.all([
        kpiOnTimeApi.getKpiOnTimeData(filter),
        kpiOnTimeApi.getKpiPercentData(filter),
      ]);
      
      setDetailData(detailResponse.data.detail);
      setPercentData(percentResponse);
      
      message.success("โหลดข้อมูลสำเร็จ");
    } catch (error) {
      console.error("Error fetching KPI On Time data:", error);
      message.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    fetchData();
  };

  return (
    <div >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <KpiOnTimeFilter
          filter={filter}
          onFilterChange={setFilter}
          onSearch={handleSearch}
          loading={loading}
        />

        <KpiOnTimeSummary detailData={detailData} loading={loading} />

             <KpiPercent data={percentData} loading={loading} />

        
        <KpiOnTimeDetail data={detailData} loading={loading} />
      </Space>
    </div>
  );
};

export default KpiOnTimePage;
