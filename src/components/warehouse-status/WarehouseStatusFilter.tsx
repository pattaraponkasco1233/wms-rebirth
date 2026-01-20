// src/components/warehouse-status/WarehouseStatusFilter.tsx

import React from "react";
import { Card, Row, Col, DatePicker, Select, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { WarehouseStatusFilter } from "../../models/warehouse-status";
import { ROUTE_OPTIONS } from "../../constant/constants";

const { RangePicker } = DatePicker;

interface WarehouseStatusFilterProps {
  filter: WarehouseStatusFilter;
  onFilterChange: (filter: WarehouseStatusFilter) => void;
  onSearch: () => void;
}

const WarehouseStatusFilterComponent: React.FC<WarehouseStatusFilterProps> = ({
  filter,
  onFilterChange,
  onSearch,
}) => {
  const handleRouteChange = (value: string) => {
    onFilterChange({
      ...filter,
      route: value,
    });
  };

  const handleShipmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filter,
      shipment: e.target.value,
    });
  };

  const handleDateRangeChange = (dates: any) => {
    if (dates && dates.length === 2) {
      onFilterChange({
        ...filter,
        dateFrom: dayjs(dates[0]).format("YYYY-MM-DD"),
        dateTo: dayjs(dates[1]).format("YYYY-MM-DD"),
      });
    } else {
      onFilterChange({
        ...filter,
        dateFrom: undefined,
        dateTo: undefined,
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
    filter.dateFrom && filter.dateTo
      ? [dayjs(filter.dateFrom), dayjs(filter.dateTo)]
      : getDefaultDateRange();

  return (
    <Card >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Select
            placeholder="เลือก Route"
            value={filter.route || undefined}
            onChange={handleRouteChange}
            style={{ width: "100%" }}
            allowClear
          >
            {ROUTE_OPTIONS.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Input
            placeholder="ค้นหา Shipment"
            value={filter.shipment}
            onChange={handleShipmentChange}
          />
        </Col>

        <Col xs={24} sm={12} md={8}>
          <RangePicker
            value={dateRange as any}
            onChange={handleDateRangeChange}
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
          />
        </Col>

        <Col xs={24} sm={12} md={4}>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={onSearch}
            style={{ width: "100%" }}
          >
            ค้นหา
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default WarehouseStatusFilterComponent;
