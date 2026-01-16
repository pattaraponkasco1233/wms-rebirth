// src/pages/proactive-monitor/ProactiveMonitoringTab.tsx

import React, { useState, useEffect } from "react";
import { Card, Col, message, Row } from "antd";
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
    fontSize: 18,
    fontWeight: 'bold' as const,
  },
  valueText: {
    fontSize: 18,
    fontWeight: 'bold' as const,
  },
  centerText: {
    textAlign: 'center' as const,
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
    target: { delivey_check_in: { target: 0, actual: 0, diff: 0 }, ready_to_ship: { target: 0, actual: 0, diff: 0 }, multipick: { target: 0, actual: 0, diff: 0 } },
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
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* เป็นแบบ แยก เป็น Component */}
      {/* Filter Section */}
      <ProactiveMonitorFilter
        filter={filter}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />

      {/* KPI Cards Section */}
      <Row gutter={[16, 16]}>
        {/* Driver Check-Ins KPI */}
        <Col span={8}>
          <Card title={t('proactive.kpi.driverCheckIns')}>
            <Row justify="space-between" align="middle">
              <Col span={12} style={styles.centerText}>
                <div style={styles.labelText}>{t('proactive.kpi.target')}</div>
              </Col>
              <Col span={12} style={styles.centerText}>
                <div style={styles.valueText}>{data.target.delivey_check_in.target}%</div>
              </Col>
            </Row>
            <Row justify="space-between" align="middle">
              <Col span={12} style={styles.centerText}>
                <div style={styles.labelText}>{t('proactive.kpi.actual')}</div>
              </Col>
              <Col span={12} style={styles.centerText}>
                <div style={styles.valueText}>{data.target.delivey_check_in.actual}%</div>
              </Col>
            </Row>
            <Row justify="space-between" align="middle">
              <Col span={12} style={styles.centerText}>
                <div style={styles.labelText}>{t('proactive.kpi.diff')}</div>
              </Col>
              <Col span={12} style={styles.centerText}>
                <div style={{ ...styles.valueText, color: '#f5222d' }}>{data.target.delivey_check_in.diff}%</div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Ready to Ship KPI */}
        <Col span={8}>
          <Card title={t('proactive.kpi.readyToShip')}>
            <Row justify="space-between" align="middle">
              <Col span={12} style={styles.centerText}>
                <div style={styles.labelText}>{t('proactive.kpi.target')}</div>
              </Col>
              <Col span={12} style={styles.centerText}>
                <div style={styles.valueText}>{data.target.ready_to_ship.target}%</div>
              </Col>
            </Row>
            <Row justify="space-between" align="middle">
              <Col span={12} style={styles.centerText}>
                <div style={styles.labelText}>{t('proactive.kpi.actual')}</div>
              </Col>
              <Col span={12} style={styles.centerText}>
                <div style={styles.valueText}>{data.target.ready_to_ship.actual}%</div>
              </Col>
            </Row>
            <Row justify="space-between" align="middle">
              <Col span={12} style={styles.centerText}>
                <div style={styles.labelText}>{t('proactive.kpi.diff')}</div>
              </Col>
              <Col span={12} style={styles.centerText}>
                <div style={{ ...styles.valueText,color: '#311de4' } }>{data.target.ready_to_ship.diff}%</div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Multipick Operations KPI */}
        <Col span={8}>
          <Card title={t('proactive.kpi.multipickOperations')}>
            <Row justify="space-between" align="middle">
              <Col span={12} style={styles.centerText}>
                <div style={styles.labelText}>{t('proactive.kpi.target')}</div>
              </Col>
              <Col span={12} style={styles.centerText}>
                <div style={styles.valueText}>{data.target.multipick.target}%</div>
              </Col>
            </Row>
            <Row justify="space-between" align="middle">
              <Col span={12} style={styles.centerText}>
                <div style={styles.labelText}>{t('proactive.kpi.actual')}</div>
              </Col>
              <Col span={12} style={styles.centerText}>
                <div style={styles.valueText}>{data.target.multipick.actual}%</div>
              </Col>
            </Row>
            <Row justify="space-between" align="middle">
              <Col span={12} style={styles.centerText}>
                <div style={styles.labelText}>{t('proactive.kpi.diff')}</div>
              </Col>
              <Col span={12} style={styles.centerText}>
                <div style={{ ...styles.valueText,   color: '#03c51d' }}>{data.target.multipick.diff}%</div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      {/* Summary Table */}
      <ProactiveMonitorSummary
        data={data.summary}
        grandTotal={data.grandTotal}
      />

      {/* Detail Table */}
      <ProactiveMonitorDetail data={data.details} loading={loading} />
    </div>
  );
};

export default ProactiveMonitoringTab;
