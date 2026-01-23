// src/components/proactive-monitor/ProactiveMonitorFilter.tsx

import React from "react";
import { Card, Row, Col, DatePicker, Select, Input, Button, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { ProactiveMonitorFilter } from "../../models/proactive-monitor";
import {
  PLANT_OPTIONS,
  CARRIER_OPTIONS,
  VEHICLE_TYPE_OPTIONS,
} from "../../constant/constants";

import { useTranslation } from "react-i18next";

interface ProactiveMonitorFilterProps {
  filter: ProactiveMonitorFilter;
  onFilterChange: (filter: ProactiveMonitorFilter) => void;
  onSearch: () => void;
}

const ProactiveMonitorFilterComponent: React.FC<
  ProactiveMonitorFilterProps
> = ({ filter, onFilterChange, onSearch }) => {
  const { t } = useTranslation();

  const handleDateChange = (field: "date" | "operationDate") => (date: any) => {
    onFilterChange({
      ...filter,
      [field]: date ? dayjs(date).format("YYYY-MM-DD") : "",
    });
  };

  const handleSelectChange =
    (field: keyof ProactiveMonitorFilter) => (value: string) => {
      onFilterChange({
        ...filter,
        [field]: value,
      });
    };

  const handleInputChange =
    (field: keyof ProactiveMonitorFilter) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFilterChange({
        ...filter,
        [field]: e.target.value,
      });
    };

  const dataSource = [
    {
      key: "1",
      name: "SNK",
      value: "7",
    },
    {
      key: "1",
      name: "GLX",
      value: "5",
    },
    {
      key: "1",
      name: "SSI",
      value: "3",
    },
    {
      key: "1",
      name: "SSF",
      value: "6",
    },
  ];

  const columns = [
    {
      title: "Plant",
      dataIndex: "name",
      key: "name",
      width: "50%",
    },
    {
      title: "CAP",
      dataIndex: "value",
      key: "value",
      width: "50%",
      align: "right" as const,
    },
  ];

  return (
    <Card style={{ marginBottom: 16 }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12}>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            style={{ width: "100%" }}
            bordered
            size="small"
          />
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <DatePicker
                placeholder="วันที่"
                value={filter.date ? dayjs(filter.date) : null}
                onChange={handleDateChange("date")}
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
              />
            </Col>
            <Col span={24}>
              <Select
                placeholder="Plant"
                value={filter.plant || undefined}
                onChange={handleSelectChange("plant")}
                style={{ width: "100%" }}
                allowClear
              >
                {PLANT_OPTIONS.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={24}>
              <Select
                placeholder="Carrier"
                value={filter.carrier || undefined}
                onChange={handleSelectChange("carrier")}
                style={{ width: "100%" }}
                allowClear
              >
                {CARRIER_OPTIONS.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={24}>
              <Input
                placeholder="Route"
                value={filter.route}
                onChange={handleInputChange("route")}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} sm={12} md={12}>
          <Select
            placeholder="Vehicle Type"
            value={filter.vehicleType || undefined}
            onChange={handleSelectChange("vehicleType")}
            style={{ width: "100%" }}
            allowClear
          >
            {VEHICLE_TYPE_OPTIONS.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} sm={12} md={12}>
          <Input
            placeholder="Shipment No"
            value={filter.shipmentNo}
            onChange={handleInputChange("shipmentNo")}
          />
        </Col>

        <Col xs={24} sm={12} md={12}>
          <Input
            placeholder="Job Number"
            value={filter.jobNumber}
            onChange={handleInputChange("jobNumber")}
          />
        </Col>

        <Col xs={24} sm={12} md={12}>
          <DatePicker
            placeholder="Operation Date"
            value={filter.operationDate ? dayjs(filter.operationDate) : null}
            onChange={handleDateChange("operationDate")}
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
          />
        </Col>
        <Col xs={12}></Col>
        <Col xs={12}>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={onSearch}
            block
          >
            {t("actions.search")}
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default ProactiveMonitorFilterComponent;
