// src/pages/proactive-monitor/ProactiveMonitoringTab.tsx

import React, { useState, useEffect } from "react";
import { Table, Card, Col, message, Row } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import {
  ProactiveMonitorFilter,
  ProactiveMonitorSummary,
  ProactiveMonitorDetail,
} from "../../components/proactive-monitor";
import { ProactiveMonitorFilter as FilterType } from "../../models/proactive-monitor";
import { fetchProactiveMonitorData } from "../../services/api/proactiveMonitor.service";
import type { ProactiveMonitorResponse } from "../../models/proactive-monitor";

// Shared styles
const styles = {
  labelText: {
    fontSize: 14,
  },
  valueText: {
    fontSize: 14,
  },
  centerText: {
    textAlign: "center" as const,
  },
  rightText: {
    textAlign: "right" as const,
  },
};

const ProactiveMonitoringTab: React.FC = () => {
  const { t } = useTranslation();
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
    target: {
      delivey_check_in: { target: 0, actual: 0, diff: 0 },
      ready_to_ship: { target: 0, actual: 0, diff: 0 },
      multipick: { target: 0, actual: 0, diff: 0 },
    },
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

  const dataSourceMultipick = [
    {
      key: "1",
      name: t("proactive.kpi.target"),
      value: data.target.multipick.target + "%",
    },
    {
      key: "2",
      name: t("proactive.kpi.actual"),
      value: data.target.multipick.actual + "%",
    },
    {
      key: "3",
      name: t("proactive.kpi.diff"),
      value: data.target.multipick.diff + "%",
    },
  ];

  const columnsMultipick = [
    {
      title: t("proactive.kpi.multipickOperations"),
      dataIndex: "name",
      key: "name",
      width: "60%",
    },
    {
      title: t("labels.total"),
      dataIndex: "value",
      key: "value",
      width: "40%",
      align: "right" as const,
    },
  ];

  const dataSourceRTS = [
    {
      key: "1",
      name: t("proactive.kpi.target"),
      value: data.target.ready_to_ship.target + "%",
    },
    {
      key: "2",
      name: t("proactive.kpi.actual"),
      value: data.target.ready_to_ship.actual + "%",
    },
    {
      key: "3",
      name: t("proactive.kpi.diff"),
      value: data.target.ready_to_ship.diff + "%",
    },
  ];

  const columnsRTS = [
    {
      title: t("proactive.kpi.readyToShip"),
      dataIndex: "name",
      key: "name",
      width: "60%",
    },
    {
      title: t("labels.total"),
      dataIndex: "value",
      key: "value",
      width: "40%",
      align: "right" as const,
    },
  ];

  const dataSourceDCI = [
    {
      key: "1",
      name: t("proactive.kpi.target"),
      value: data.target.delivey_check_in.target + "%",
    },
    {
      key: "2",
      name: t("proactive.kpi.actual"),
      value: data.target.delivey_check_in.actual + "%",
    },
    {
      key: "3",
      name: t("proactive.kpi.diff"),
      value: data.target.delivey_check_in.diff + "%",
    },
  ];

  const columnsDCI = [
    {
      title: t("proactive.kpi.driverCheckIns"),
      dataIndex: "name",
      key: "name",
      width: "60%",
    },
    {
      title: t("labels.total"),
      dataIndex: "value",
      key: "value",
      width: "40%",
      align: "right" as const,
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={14}>
          {/* Summary Table */}
          <ProactiveMonitorSummary
            data={data.summary}
            grandTotal={data.grandTotal}
          />
        </Col>
        <Col span={4}>
          <Card bodyStyle={{ paddingTop: 0 }}>
            <Row gutter={[16, 16]}>
              <h4>{t("proactive.kpi.percentageontime")}</h4>
            </Row>
            <Row gutter={[16, 16]}>
              {/* Driver Check-Ins KPI */}
              <Table
                dataSource={dataSourceDCI}
                columns={columnsDCI}
                pagination={false}
                style={{ width: "100%" }}
                bordered
                size="small"
              />
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: "15px" }}>
              {/* Ready to Ship KPI */}

              <Table
                dataSource={dataSourceRTS}
                columns={columnsRTS}
                pagination={false}
                style={{ width: "100%" }}
                bordered
                size="small"
              />
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: "15px" }}>
              {/* Multipick Operations KPI */}

              <Table
                dataSource={dataSourceMultipick}
                columns={columnsMultipick}
                pagination={false}
                style={{ width: "100%" }}
                bordered
                size="small"
              />
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          {/* เป็นแบบ แยก เป็น Component */}
          {/* Filter Section */}
          <ProactiveMonitorFilter
            filter={filter}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
          />
        </Col>
      </Row>

      {/* Detail Table */}
      <ProactiveMonitorDetail data={data.details} loading={loading} />
    </div>
  );
};

export default ProactiveMonitoringTab;
