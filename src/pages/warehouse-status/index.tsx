// src/pages/warehouse-status/index.tsx

import React, { useState, useEffect } from "react";
import { Space, message } from "antd";
import dayjs from "dayjs";
import {
  WarehouseStatusFilter,
  WarehouseStatusPlantOverview,
  WarehouseStatusSummary,
  WarehouseStatusDetail,
} from "../../components/warehouse-status";
import {
  WarehouseStatusFilter as FilterModel,
  WarehouseStatusSummary as SummaryModel,
} from "../../models/warehouse-status";
import { warehouseStatusApi } from "../../services/api";

const WarehouseStatusMonitor: React.FC = () => {
  const [filter, setFilter] = useState<FilterModel>({
    route: undefined,
    shipment: undefined,
    dateFrom: dayjs().startOf("month").format("YYYY-MM-DD"),
    dateTo: dayjs().endOf("month").format("YYYY-MM-DD"),
  });

  const [summaryData, setSummaryData] = useState<SummaryModel[]>([]);
  const [detailData, setDetailData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await warehouseStatusApi.getWarehouseStatus(filter);
      setSummaryData(response.summary);
      setDetailData(response.details);
    } catch (error) {
      console.error("Error fetching warehouse status:", error);
      message.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    fetchData();
  };

  return (
    <div>
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <WarehouseStatusFilter
          filter={filter}
          onFilterChange={setFilter}
          onSearch={handleSearch}
        />

        <WarehouseStatusPlantOverview data={detailData} />

        <WarehouseStatusSummary data={summaryData} />
        <WarehouseStatusDetail data={detailData} loading={loading} />
      </Space>
    </div>
  );
};

export default WarehouseStatusMonitor;
