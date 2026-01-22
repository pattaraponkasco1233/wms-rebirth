// src/components/kpi-on-time/KpiOnTimeFilter.tsx

import React from "react";
import { Card, Row, Col, DatePicker, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { KpiOnTimeFilterParams } from "../../models/kpi-on-time";
import {STATUS_OPTIONS } from "../../constant/constants";

const { RangePicker } = DatePicker;

interface KpiOnTimeFilterProps {
  filter: KpiOnTimeFilterParams;
  onFilterChange: (filter: KpiOnTimeFilterParams) => void;
  onSearch: () => void;
  loading?: boolean;
}

const KpiOnTimeFilter: React.FC<KpiOnTimeFilterProps> = ({
  filter,
  onFilterChange,
  onSearch,
  loading = false,
}) => {
  const handleDateRangeChange = (dates: any) => {
    if (dates && dates.length === 2) {
      onFilterChange({
        startDate: dayjs(dates[0]).format("YYYY-MM-DD"),
        endDate: dayjs(dates[1]).format("YYYY-MM-DD"),
      });
    } else {
      // Reset to default (current month)
      const startOfMonth = dayjs().startOf("month");
      const endOfMonth = dayjs().endOf("month");
      onFilterChange({
        startDate: startOfMonth.format("YYYY-MM-DD"),
        endDate: endOfMonth.format("YYYY-MM-DD"),
      });
    }
  };

  // Get default date range (current month)
  const getDefaultDateRange = () => {
    const startOfMonth = dayjs().startOf("month");
    const endOfMonth = dayjs().endOf("month");
    return [startOfMonth, endOfMonth];
  };

  const dateRange =
    filter.startDate && filter.endDate
      ? [dayjs(filter.startDate), dayjs(filter.endDate)]
      : getDefaultDateRange();

  return (
    <Card >
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={12} md={8} lg={6}>
          <RangePicker
            value={dateRange as any}
            onChange={handleDateRangeChange}
            format="DD/MM/YYYY"
            style={{ width: "100%" }}
            placeholder={["วันที่เริ่มต้น", "วันที่สิ้นสุด"]}
          />
        </Col>
        <Col xs={24} sm={12} md={4} lg={3}>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={onSearch}
            style={{ width: "100%" }}
            loading={loading}
          >
            ค้นหา
          </Button>
        </Col>
        <Col xs={24} sm={0} md={12} lg={15}>
            <Row gutter={[16,16]} style={{width:'100%'}} justify="end">
                {STATUS_OPTIONS.map((status) => (
                    <Col key={status.value}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{
                                width: 16,
                                height: 16,
                                backgroundColor: status.color,  
                                border: '1px solid #000',
                                marginRight: 8,
                            }}></div>
                            <span>{status.label}</span>
                        </div>
                    </Col>
                ))}

            </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default KpiOnTimeFilter;
