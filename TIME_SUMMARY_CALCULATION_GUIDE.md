# Time Summary Calculation Guide

## การคำนวณข้อมูลในตาราง Time Summary

### โครงสร้างตาราง

ตารางแสดงจำนวน shipments แยกตาม:

1. **ช่วงเวลา (Time Slot)** - เช่น "08:00 - 09:00", "09:00 - 10:00"
2. **Plant** - SNK, GLX, SSI, SSF
3. **Vehicle Type** - รถ 4 ล้อ, รถ 6 ล้อ

### ตัวอย่างข้อมูล

#### Mock Data ช่วงเวลา 08:00 - 09:00

| Shipment | Plant | Vehicle Type | firstTime |
| -------- | ----- | ------------ | --------- |
| SHP-001  | SNK   | รถ 4 ล้อ     | 080000    |
| SHP-002  | SNK   | รถ 4 ล้อ     | 080000    |
| SHP-011  | SSI   | รถ 6 ล้อ     | 080000    |
| SHP-014  | SSF   | รถ 4 ล้อ     | 080000    |
| SHP-015  | SSF   | รถ 6 ล้อ     | 080000    |
| SHP-019  | SSI   | รถ 4 ล้อ     | 080000    |

#### ผลลัพธ์ในตาราง (ช่วงเวลา 08:00 - 09:00)

| ช่วงเวลา    | SNK   |       | GLX   |       | SSI   |       | SSF   |       | Total |
| ----------- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
|             | 4 ล้อ | 6 ล้อ | 4 ล้อ | 6 ล้อ | 4 ล้อ | 6 ล้อ | 4 ล้อ | 6 ล้อ |       |
| 08:00-09:00 | 2     | 0     | 0     | 0     | 1     | 1     | 1     | 1     | **6** |

### วิธีการคำนวณ

#### 1. การนับแบบ Detail (แต่ละ cell)

```typescript
// ตัวอย่าง: นับ SNK + รถ 4 ล้อ ในช่วง 08:00-09:00
const countByPlantAndVehicle = (
  slotShipments: LogisticsShipment[],
  plantValue: string, // "snk"
  vehicleTypeValue: string, // "4_WHEEL"
): number => {
  return slotShipments.filter(
    (shipment) =>
      shipment.plant.toLowerCase() === plantValue.toLowerCase() &&
      shipment.vehicleType_key === vehicleTypeValue,
  ).length;
};
```

#### 2. การคำนวณ Total ของแต่ละ Plant

```typescript
// Total ของ SNK = SNK_4_WHEEL + SNK_6_WHEEL
const total = VEHICLE_TYPE_OPTIONS.reduce((sum, vehicleType) => {
  const key = `${plant.value}_${vehicleType.value}`; // "snk_4_WHEEL", "snk_6_WHEEL"
  const value = (record[key] as number) || 0;
  return sum + value;
}, 0);
```

#### 3. Grand Total

```typescript
// Total ทั้งหมดของช่วงเวลา
count: slotShipments.length; // จำนวน shipments ทั้งหมดในช่วงเวลานั้น
```

### Data Structure ที่ใช้

```typescript
interface TimeSlotSummary {
  timeSlot: string; // "08:00 - 09:00"
  count: number; // Total ทั้งหมด
  shipments: LogisticsShipment[];

  // Dynamic keys สำหรับแต่ละ Plant x Vehicle Type
  snk_4_WHEEL: number; // จำนวน SNK + รถ 4 ล้อ
  snk_6_WHEEL: number; // จำนวน SNK + รถ 6 ล้อ
  glx_4_WHEEL: number; // จำนวน GLX + รถ 4 ล้อ
  glx_6_WHEEL: number; // จำนวน GLX + รถ 6 ล้อ
  ssi_4_WHEEL: number; // จำนวน SSI + รถ 4 ล้อ
  ssi_6_WHEEL: number; // จำนวน SSI + รถ 6 ล้อ
  ssf_4_WHEEL: number; // จำนวน SSF + รถ 4 ล้อ
  ssf_6_WHEEL: number; // จำนวน SSF + รถ 6 ล้อ
}
```

### ตัวอย่างผลลัพธ์จริง

```javascript
{
    timeSlot: "08:00 - 09:00",
    count: 6,
    shipments: [...],
    snk_4_WHEEL: 2,
    snk_6_WHEEL: 0,
    glx_4_WHEEL: 0,
    glx_6_WHEEL: 0,
    ssi_4_WHEEL: 1,
    ssi_6_WHEEL: 1,
    ssf_4_WHEEL: 1,
    ssf_6_WHEEL: 1
}
```

### Column Definition

```typescript
{
    title: "Plant",
    children: PLANT_OPTIONS.map((plant) => ({
        title: plant.label,  // "SNK", "GLX", "SSI", "SSF"
        children: [
            {
                title: "รถ 4 ล้อ",
                dataIndex: `${plant.value}_4_WHEEL`,  // "snk_4_WHEEL"
                render: (value: number) => value || 0
            },
            {
                title: "รถ 6 ล้อ",
                dataIndex: `${plant.value}_6_WHEEL`,  // "snk_6_WHEEL"
                render: (value: number) => value || 0
            },
            {
                title: "Total",
                render: (_, record) => {
                    // รวม 4_WHEEL + 6_WHEEL
                    const total = record[`${plant.value}_4_WHEEL`] +
                                 record[`${plant.value}_6_WHEEL`];
                    return total;
                }
            }
        ]
    }))
}
```

## สรุป

✅ **การนับถูกต้องตาม:**

- Plant (SNK, GLX, SSI, SSF)
- Vehicle Type (รถ 4 ล้อ, รถ 6 ล้อ)
- Time Slot (08:00-09:00, 09:00-10:00, etc.)

✅ **ใช้ vehicleType_key สำหรับการเปรียบเทียบ:**

- "4_WHEEL" สำหรับรถ 4 ล้อ
- "6_WHEEL" สำหรับรถ 6 ล้อ

✅ **Column Structure:**

- Level 1: Plant
- Level 2: Vehicle Type + Total
- Final Column: Grand Total

## ตัวอย่างการใช้งาน

### กรณีที่ 1: Filter by Plant

```typescript
// User filter: Plant = "SNK"
// ผลลัพธ์: แสดงเฉพาะ shipments ที่ plant === "SNK"
// ตาราง: column อื่นๆ จะเป็น 0, แต่ SNK จะมีค่า
```

### กรณีที่ 2: Filter by Time

```typescript
// User filter: First Time = "080000"
// ผลลัพธ์: แสดงเฉพาะ shipments ที่ firstTime === "080000"
// ตาราง: เฉพาะช่วง 08:00-09:00 จะมีข้อมูล, ช่วงอื่นเป็น 0
```

### กรณีที่ 3: Filter by Plant + Vehicle Type

```typescript
// User filter: Plant = "SNK", Vehicle Type = "รถ 4 ล้อ"
// ผลลัพธ์: แสดงเฉพาะ SNK + รถ 4 ล้อ
// ตาราง: เฉพาะ column SNK_4_WHEEL จะมีค่า
```
