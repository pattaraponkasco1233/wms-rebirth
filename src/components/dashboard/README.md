# Dashboard Components

คอลเลกชันของ React Components สำหรับสร้างหน้า Dashboard ที่สามารถนำกลับมาใช้ใหม่ได้

## Components ที่มีให้ใช้งาน

### 1. StatisticCard

แสดงข้อมูลสถิติพร้อมไอคอนและแนวโน้ม

```tsx
import { StatisticCard } from "@/components/dashboard";

<StatisticCard
  title="ออเดอร์ทั้งหมด"
  value={1234}
  prefix={<ShoppingCartOutlined />}
  trend="up"
  trendValue={12.5}
/>;
```

### 2. ChartCard

Card สำหรับแสดงกราฟหรือข้อมูลแบบภาพ

```tsx
import { ChartCard, SimpleBarChart } from "@/components/dashboard";

<ChartCard title="จำนวนการจอง">
  <SimpleBarChart data={chartData} />
</ChartCard>;
```

### 3. SimpleBarChart

กราฟแท่งแบบง่าย

```tsx
import { SimpleBarChart } from "@/components/dashboard";

const data = [
  { label: "มกราคม", value: 120, color: "#1890ff" },
  { label: "กุมภาพันธ์", value: 150, color: "#52c41a" },
];

<SimpleBarChart data={data} height={300} showValues={true} />;
```

### 4. SimplePieChart

กราฟวงกลมแบบง่าย

```tsx
import { SimplePieChart } from "@/components/dashboard";

const data = [
  { label: "รถกระบะ", value: 30, color: "#1890ff" },
  { label: "รถ 6 ล้อ", value: 45, color: "#52c41a" },
];

<SimplePieChart data={data} size={200} showLegend={true} />;
```

### 5. RecentActivityList

แสดงรายการกิจกรรมล่าสุด

```tsx
import { RecentActivityList } from "@/components/dashboard";

const activities = [
  {
    id: "1",
    title: "ORD-2026-001",
    description: "จองรถ 6 ล้อ",
    status: "success",
    timestamp: "5 นาทีที่แล้ว",
  },
];

<RecentActivityList activities={activities} maxItems={5} />;
```

### 6. QuickActionCard

Card สำหรับปุ่มการดำเนินการด่วน

```tsx
import { QuickActionCard } from "@/components/dashboard";

const actions = [
  {
    key: "create",
    label: "สร้างใหม่",
    icon: <PlusOutlined />,
    type: "primary",
    onClick: () => navigate("/create"),
  },
];

<QuickActionCard actions={actions} />;
```

### 7. DataTableCard

Card พร้อมตารางข้อมูล

```tsx
import { DataTableCard } from "@/components/dashboard";

<DataTableCard
  title="รายการล่าสุด"
  columns={columns}
  dataSource={data}
  pagination={true}
/>;
```

### 8. ProgressCard

Card แสดง Progress Bar

```tsx
import { ProgressCard } from "@/components/dashboard";

const items = [
  { label: "งานเสร็จสิ้น", percent: 75, status: "success" },
  { label: "กำลังดำเนินการ", percent: 50, status: "active" },
];

<ProgressCard title="ความคืบหน้า" items={items} />;
```

## การใช้งาน

### Import Components

```tsx
// Import แบบเดี่ยว
import { StatisticCard } from "@/components/dashboard";

// Import หลาย components
import {
  StatisticCard,
  ChartCard,
  SimpleBarChart,
  RecentActivityList,
} from "@/components/dashboard";
```

### Layout แนะนำ

```tsx
import { Row, Col } from "antd";

<Row gutter={[16, 16]}>
  <Col xs={24} sm={12} lg={6}>
    <StatisticCard {...props} />
  </Col>
  <Col xs={24} lg={16}>
    <ChartCard {...props}>
      <SimpleBarChart {...props} />
    </ChartCard>
  </Col>
</Row>;
```

## ตัวอย่างการใช้งานจริง

ดูตัวอย่างการใช้งานได้ที่:

- `/src/pages/dashboard/index.tsx` - Dashboard หลัก
