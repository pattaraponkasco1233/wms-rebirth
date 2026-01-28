// src/pages/truck-checkin/components/TruckCheckinFilter.tsx

import React from "react";
import { Row, Col, Input, DatePicker, Button, Select, Space, Card } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";
import { PLANT_OPTIONS } from "../../constant/constants";

const { Option } = Select;

interface TruckCheckinFilterProps {
  searchText: string;
  searchPlant: string | undefined;
  searchDate: Dayjs | null;
  loading: boolean;
  onSearchTextChange: (value: string) => void;
  onSearchPlantChange: (value: string | undefined) => void;
  onSearchDateChange: (date: Dayjs | null) => void;
  onSearch: () => void;
  onReset: () => void;
  onAdd: () => void;
}

const TruckCheckinFilter: React.FC<TruckCheckinFilterProps> = ({
  searchText,
  searchPlant,
  searchDate,
  loading,
  onSearchTextChange,
  onSearchPlantChange,
  onSearchDateChange,
  onSearch,
  onReset,
  onAdd,
}) => {
  const { t } = useTranslation();

  return (
    <Card>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={12} md={8} lg={6}>
          <Input
            placeholder={t("truckCheckin.searchPlaceholder")}
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => onSearchTextChange(e.target.value)}
            onPressEnter={onSearch}
            allowClear
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Select
            placeholder={t("truckCheckin.selectPlant")}
            value={searchPlant}
            onChange={onSearchPlantChange}
            style={{ width: "100%" }}
            allowClear
          >
            {PLANT_OPTIONS.map((plant) => (
              <Option key={plant.value} value={plant.value}>
                {plant.label}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <DatePicker
            placeholder={t("truckCheckin.selectDate")}
            format="DD/MM/YYYY"
            value={searchDate}
            onChange={onSearchDateChange}
            style={{ width: "100%" }}
            allowClear
          />
        </Col>
        <Col xs={24} sm={24} md={8} lg={6}>
          <Space>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={onSearch}
              loading={loading}
            >
              {t("actions.search")}
            </Button>
            <Button onClick={onReset}>{t("actions.clearFilter")}</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
              {t("actions.addData")}
            </Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default TruckCheckinFilter;
