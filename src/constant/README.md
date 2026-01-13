# Constants - ค่าคงที่กลางของระบบ

## ภาพรวม

ไฟล์ `constants.ts` เป็นไฟล์กลางที่เก็บค่าคงที่ (constants) ทั้งหมดของระบบ เพื่อให้ง่ายต่อการบำรุงรักษาและนำกลับมาใช้ซ้ำ

## โครงสร้างไฟล์

```
src/constant/
  └── constants.ts        // ไฟล์ Constants กลางทั้งหมด
```

## หมวดหมู่ Constants

### 1. 🚛 TRUCK CHECK-IN CONSTANTS

#### PLANT_OPTIONS

รายการโรงงาน (Plant) ทั้งหมด

```typescript
export const PLANT_OPTIONS = [
  { value: "PLANT_A", label: "Plant A" },
  { value: "PLANT_B", label: "Plant B" },
  { value: "PLANT_C", label: "Plant C" },
  { value: "PLANT_D", label: "Plant D" },
] as const;
```

**การใช้งาน:**

```tsx
import { PLANT_OPTIONS } from "../../constant/constants";

<Select>
  {PLANT_OPTIONS.map((plant) => (
    <Option key={plant.value} value={plant.value}>
      {plant.label}
    </Option>
  ))}
</Select>;
```

---

#### VEHICLE_TYPE_OPTIONS

ประเภทรถบรรทุก พร้อม translation key

```typescript
export const VEHICLE_TYPE_OPTIONS = [
  { value: "4_WHEEL", labelKey: "truckCheckin.vehicleType4Wheel" },
  { value: "6_WHEEL", labelKey: "truckCheckin.vehicleType6Wheel" },
  { value: "8_WHEEL", labelKey: "truckCheckin.vehicleType8Wheel" },
  { value: "10_WHEEL", labelKey: "truckCheckin.vehicleType10Wheel" },
] as const;
```

**การใช้งาน:**

```tsx
import { VEHICLE_TYPE_OPTIONS } from "../../constant/constants";
import { useTranslation } from "react-i18next";

const { t } = useTranslation();

<Select>
  {VEHICLE_TYPE_OPTIONS.map((vehicle) => (
    <Option key={vehicle.value} value={vehicle.value}>
      {t(vehicle.labelKey)}
    </Option>
  ))}
</Select>;
```

---

#### TRUCK_CHECKIN_STATUS_OPTIONS

สถานะของ Truck Check-in พร้อม translation key

```typescript
export const TRUCK_CHECKIN_STATUS_OPTIONS = [
  { value: "CHECKED_IN", labelKey: "truckCheckin.statusCheckedIn" },
  { value: "NOT_CHECKED_IN", labelKey: "truckCheckin.statusNotCheckedIn" },
  { value: "PENDING", labelKey: "truckCheckin.statusPending" },
] as const;
```

**การใช้งาน:**

```tsx
import { TRUCK_CHECKIN_STATUS_OPTIONS } from "../../constant/constants";

<Select>
  {TRUCK_CHECKIN_STATUS_OPTIONS.map((status) => (
    <Option key={status.value} value={status.value}>
      {t(status.labelKey)}
    </Option>
  ))}
</Select>;
```

---

### 2. 🚗 BOOKING CAR CONSTANTS

#### BOOKING_CAR_STATUS_OPTIONS

สถานะของการจองรถ

```typescript
export const BOOKING_CAR_STATUS_OPTIONS = [
  { value: "PENDING", labelKey: "bookingCar.statusPending" },
  { value: "CONFIRMED", labelKey: "bookingCar.statusConfirmed" },
  { value: "CANCELLED", labelKey: "bookingCar.statusCancelled" },
  { value: "COMPLETED", labelKey: "bookingCar.statusCompleted" },
] as const;
```

---

### 3. 🌐 COMMON CONSTANTS

#### COMMON_STATUS_OPTIONS

สถานะทั่วไป (Active/Inactive)

```typescript
export const COMMON_STATUS_OPTIONS = [
  { value: "ACTIVE", labelKey: "common.statusActive" },
  { value: "INACTIVE", labelKey: "common.statusInactive" },
] as const;
```

---

#### DATE_FORMATS

รูปแบบวันที่มาตรฐาน

```typescript
export const DATE_FORMATS = {
  DISPLAY: "DD/MM/YYYY",
  DISPLAY_WITH_TIME: "DD/MM/YYYY HH:mm",
  API: "YYYY-MM-DD",
  API_WITH_TIME: "YYYY-MM-DD HH:mm:ss",
} as const;
```

**การใช้งาน:**

```tsx
import { DATE_FORMATS } from "../../constant/constants";
import dayjs from "dayjs";

dayjs(date).format(DATE_FORMATS.DISPLAY); // "13/01/2026"
dayjs(date).format(DATE_FORMATS.DISPLAY_WITH_TIME); // "13/01/2026 10:30"
```

---

#### PAGINATION

ค่า Pagination มาตรฐาน

```typescript
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;
```

**การใช้งาน:**

```tsx
import { PAGINATION } from "../../constant/constants";

const [currentPage, setCurrentPage] = useState(PAGINATION.DEFAULT_PAGE);
const [pageSize, setPageSize] = useState(PAGINATION.DEFAULT_PAGE_SIZE);

<Table
  pagination={{
    current: currentPage,
    pageSize: pageSize,
    pageSizeOptions: PAGINATION.PAGE_SIZE_OPTIONS,
  }}
/>;
```

---

## Type Definitions

ไฟล์ constants มี Type definitions สำหรับ TypeScript:

```typescript
// Truck Check-in Types
export type PlantValue = (typeof PLANT_OPTIONS)[number]["value"];
export type VehicleTypeValue = (typeof VEHICLE_TYPE_OPTIONS)[number]["value"];
export type TruckCheckinStatusValue =
  (typeof TRUCK_CHECKIN_STATUS_OPTIONS)[number]["value"];

// Booking Car Types
export type BookingCarStatusValue =
  (typeof BOOKING_CAR_STATUS_OPTIONS)[number]["value"];

// Common Types
export type CommonStatusValue = (typeof COMMON_STATUS_OPTIONS)[number]["value"];
```

**การใช้งาน:**

```tsx
import type {
  PlantValue,
  TruckCheckinStatusValue,
} from "../../constant/constants";

const [plant, setPlant] = useState<PlantValue | undefined>();
const [status, setStatus] = useState<TruckCheckinStatusValue | undefined>();

// TypeScript จะช่วย autocomplete และตรวจสอบค่า
setPlant("PLANT_A"); // ✅ OK
setPlant("PLANT_X"); // ❌ Error
```

---

## ข้อดีของการใช้ Constants กลาง

| ข้อดี                  | คำอธิบาย                        |
| ---------------------- | ------------------------------- |
| 📦 **Centralized**     | เก็บรวมไว้ที่เดียว หาง่าย       |
| 🔧 **Maintainability** | แก้ไขที่เดียว ใช้ได้ทั่วทั้งแอป |
| ♻️ **Reusability**     | Import มาใช้ได้ทุกหน้า          |
| 🛡️ **Type Safety**     | TypeScript ตรวจสอบค่าอัตโนมัติ  |
| ✨ **Consistency**     | ใช้ค่าเดียวกันทุกที่            |
| 🌍 **i18n Ready**      | รองรับหลายภาษา                  |

---

## วิธีเพิ่ม Constants ใหม่

### เพิ่มหมวดหมู่ใหม่:

```typescript
/**
 * ========================================
 * YOUR NEW FEATURE CONSTANTS
 * ========================================
 */

export const YOUR_OPTIONS = [
  { value: "OPTION_1", labelKey: "yourFeature.option1" },
  { value: "OPTION_2", labelKey: "yourFeature.option2" },
] as const;

export type YourValue = (typeof YOUR_OPTIONS)[number]["value"];
```

### เพิ่ม Option ในหมวดที่มีอยู่:

```typescript
export const PLANT_OPTIONS = [
  { value: "PLANT_A", label: "Plant A" },
  { value: "PLANT_B", label: "Plant B" },
  { value: "PLANT_C", label: "Plant C" },
  { value: "PLANT_D", label: "Plant D" },
  { value: "PLANT_E", label: "Plant E" }, // ✅ เพิ่มใหม่
] as const;
```

---

## Best Practices

1. ✅ **ใช้ `as const`** - ทำให้เป็น readonly และ TypeScript รู้จัก literal types
2. ✅ **แยกหมวดหมู่ชัดเจน** - ใช้คอมเมนต์แบ่งส่วน
3. ✅ **ใช้ labelKey สำหรับ i18n** - ข้อความที่ต้องแปลภาษา
4. ✅ **ใช้ label สำหรับข้อความคงที่** - ข้อความที่ไม่ต้องแปล
5. ✅ **Export Types** - เพื่อใช้กับ TypeScript
6. ✅ **ตั้งชื่อตัวแปรให้สื่อความหมาย** - `TRUCK_CHECKIN_STATUS_OPTIONS` ดีกว่า `STATUS_OPTIONS`

---

## ตัวอย่างการใช้งานจริง

### ตัวอย่างที่ 1: Search Form

```tsx
import {
  PLANT_OPTIONS,
  TRUCK_CHECKIN_STATUS_OPTIONS,
} from "../../constant/constants";

<Row>
  <Col>
    <Select placeholder="Select Plant">
      {PLANT_OPTIONS.map((plant) => (
        <Option key={plant.value} value={plant.value}>
          {plant.label}
        </Option>
      ))}
    </Select>
  </Col>
  <Col>
    <Select placeholder="Select Status">
      {TRUCK_CHECKIN_STATUS_OPTIONS.map((status) => (
        <Option key={status.value} value={status.value}>
          {t(status.labelKey)}
        </Option>
      ))}
    </Select>
  </Col>
</Row>;
```

### ตัวอย่างที่ 2: Date Formatting

```tsx
import { DATE_FORMATS } from "../../constant/constants";
import dayjs from "dayjs";

// แสดงวันที่
const formattedDate = dayjs(data.createdAt).format(DATE_FORMATS.DISPLAY);

// ส่งไป API
const apiDate = dayjs(selectedDate).format(DATE_FORMATS.API);
```

### ตัวอย่างที่ 3: Pagination

```tsx
import { PAGINATION } from "../../constant/constants";

const [page, setPage] = useState(PAGINATION.DEFAULT_PAGE);
const [size, setSize] = useState(PAGINATION.DEFAULT_PAGE_SIZE);

<Table
  pagination={{
    current: page,
    pageSize: size,
    pageSizeOptions: PAGINATION.PAGE_SIZE_OPTIONS,
  }}
/>;
```

---

## สรุป

ใช้ `constants.ts` เป็นศูนย์กลางเก็บค่าคงที่ทั้งหมด เพื่อให้:

- 🎯 Code สะอาด อ่านง่าย
- 🔧 Maintain ง่าย แก้ที่เดียว
- ♻️ Reuse ได้ทั่วทั้งแอป
- 🛡️ Type-safe ป้องกันข้อผิดพลาด
- 📦 Centralized รวมศูนย์
