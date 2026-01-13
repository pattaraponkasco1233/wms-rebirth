# ตัวอย่างการใช้ i18n ในหน้า Truck Check-in

## การใช้งาน Key สำหรับเปลี่ยนภาษา

### 1. Import useTranslation Hook

```tsx
import { useTranslation } from "react-i18next";

const TruckCheckinPage: React.FC = () => {
  const { t } = useTranslation(); // เพิ่ม hook นี้
  // ...
};
```

### 2. ตัวอย่างการใช้ Key ในหน้า Truck Check-in

#### ✅ **ตัวอย่าง: Column "ลำดับ" (runno)**

**Before (Hard-coded):**

```tsx
const columns: ColumnsType<TruckCheckin> = [
  {
    title: "ลำดับ", // ❌ ภาษาไทยตายตัว
    key: "index",
    // ...
  },
];
```

**After (ใช้ i18n key):**

```tsx
const columns: ColumnsType<TruckCheckin> = [
  {
    title: t("labels.runno"), // ✅ ใช้ key เปลี่ยนภาษาได้
    key: "index",
    // ...
  },
];
```

**ผลลัพธ์:**

- เมื่อเลือก **TH**: แสดง "ลำดับ"
- เมื่อเลือก **EN**: แสดง "No."

---

### 3. ตัวอย่างการใช้ Key ทั้งหมดในหน้านี้

#### Table Columns

```tsx
const columns = [
  { title: t("labels.runno") }, // ลำดับ / No.
  { title: t("truckCheckin.plant") }, // Plant / Plant
  { title: t("truckCheckin.carrier") }, // Carrier / Carrier
  { title: t("truckCheckin.vehicleType") }, // Vehicle Type / Vehicle Type
  { title: t("truckCheckin.truckLicense") }, // Truck License / Truck License
  { title: t("truckCheckin.driverName") }, // ชื่อคนขับ / Driver Name
  { title: t("truckCheckin.tel") }, // Tel. / Tel.
  { title: t("truckCheckin.checkinDateTime") }, // วันเวลา Check In / Check-in Date/Time
  { title: t("truckCheckin.status") }, // สถานะ / Status
  { title: t("truckCheckin.remark") }, // หมายเหตุ / Remark
  { title: t("truckCheckin.action") }, // จัดการ / Action
];
```

#### Search Form

```tsx
<Input
  placeholder={t("truckCheckin.searchPlaceholder")}
  // "ค้นหาทะเบียนรถ, ชื่อคนขับ..." / "Search license plate, driver name..."
/>

<Select placeholder={t("truckCheckin.selectPlant")} />
// "เลือก Plant" / "Select Plant"

<DatePicker placeholder={t("truckCheckin.selectDate")} />
// "เลือกวันที่ Check In" / "Select Check-in Date"

<Button>{t("actions.search")}</Button>
// "ค้นหา" / "Search"

<Button>{t("actions.clearFilter")}</Button>
// "ล้างค่า" / "Clear Filter"

<Button>{t("actions.addData")}</Button>
// "เพิ่มข้อมูล" / "Add Data"
```

#### Status Tags

```tsx
const renderStatusTag = (status: TruckCheckinStatus) => {
  switch (status) {
    case "CHECKED_IN":
      return <Tag color="success">{t("truckCheckin.statusCheckedIn")}</Tag>;
    // "Check In แล้ว" / "Checked In"
    case "NOT_CHECKED_IN":
      return <Tag color="error">{t("truckCheckin.statusNotCheckedIn")}</Tag>;
    // "ยังไม่ Check In" / "Not Checked In"
    case "PENDING":
      return <Tag color="warning">{t("truckCheckin.statusPending")}</Tag>;
    // "รอดำเนินการ" / "Pending"
  }
};
```

#### Modal

```tsx
<Modal
  title={
    editingRecord
      ? t("truckCheckin.editTitle") // "แก้ไขข้อมูล Truck Check-in" / "Edit Truck Check-in"
      : t("truckCheckin.addTitle") // "เพิ่มข้อมูล Truck Check-in" / "Add Truck Check-in"
  }
  okText={t("actions.save")} // "บันทึก" / "Save"
  cancelText={t("actions.cancel")} // "ยกเลิก" / "Cancel"
>
  <Form.Item
    label={t("truckCheckin.truckLicense")}
    rules={[
      {
        required: true,
        message: t("truckCheckin.licenseRequired"),
      },
    ]}
  >
    <Input placeholder={t("truckCheckin.licensePlaceholder")} />
  </Form.Item>
</Modal>
```

#### Message Notifications

```tsx
message.success(t("truckCheckin.updateSuccess"));
// "อัพเดทข้อมูลสำเร็จ" / "Data updated successfully"

message.success(t("truckCheckin.addSuccess"));
// "เพิ่มข้อมูลสำเร็จ" / "Data added successfully"

message.error(t("truckCheckin.errorFetching"));
// "เกิดข้อผิดพลาดในการดึงข้อมูล" / "Error fetching data"

message.error(t("truckCheckin.errorSaving"));
// "เกิดข้อผิดพลาดในการบันทึกข้อมูล" / "Error saving data"
```

#### Pagination

```tsx
pagination={{
  showTotal: (total) => `${t("labels.total")} ${total} ${t("labels.items")}`
  // "ทั้งหมด 10 รายการ" / "Total 10 items"
}}
```

---

### 4. รายการ Key ทั้งหมดที่ใช้ได้

#### Keys สำหรับ Truck Check-in (truckCheckin.\*)

| Key                               | ภาษาไทย (TH)                    | English (EN)                         |
| --------------------------------- | ------------------------------- | ------------------------------------ |
| `truckCheckin.plant`              | Plant                           | Plant                                |
| `truckCheckin.carrier`            | Carrier                         | Carrier                              |
| `truckCheckin.vehicleType`        | Vehicle Type                    | Vehicle Type                         |
| `truckCheckin.truckLicense`       | Truck License                   | Truck License                        |
| `truckCheckin.driverName`         | ชื่อคนขับ                       | Driver Name                          |
| `truckCheckin.tel`                | Tel.                            | Tel.                                 |
| `truckCheckin.checkinDateTime`    | วันเวลา Check In                | Check-in Date/Time                   |
| `truckCheckin.status`             | สถานะ                           | Status                               |
| `truckCheckin.remark`             | หมายเหตุ                        | Remark                               |
| `truckCheckin.action`             | จัดการ                          | Action                               |
| `truckCheckin.searchPlaceholder`  | ค้นหาทะเบียนรถ, ชื่อคนขับ...    | Search license plate, driver name... |
| `truckCheckin.selectPlant`        | เลือก Plant                     | Select Plant                         |
| `truckCheckin.selectDate`         | เลือกวันที่ Check In            | Select Check-in Date                 |
| `truckCheckin.statusCheckedIn`    | Check In แล้ว                   | Checked In                           |
| `truckCheckin.statusNotCheckedIn` | ยังไม่ Check In                 | Not Checked In                       |
| `truckCheckin.statusPending`      | รอดำเนินการ                     | Pending                              |
| `truckCheckin.updateSuccess`      | อัพเดทข้อมูลสำเร็จ              | Data updated successfully            |
| `truckCheckin.addSuccess`         | เพิ่มข้อมูลสำเร็จ               | Data added successfully              |
| `truckCheckin.errorFetching`      | เกิดข้อผิดพลาดในการดึงข้อมูล    | Error fetching data                  |
| `truckCheckin.errorSaving`        | เกิดข้อผิดพลาดในการบันทึกข้อมูล | Error saving data                    |

#### Keys สำหรับ Actions (actions.\*)

| Key                   | ภาษาไทย (TH) | English (EN) |
| --------------------- | ------------ | ------------ |
| `actions.save`        | บันทึก       | Save         |
| `actions.cancel`      | ยกเลิก       | Cancel       |
| `actions.edit`        | แก้ไข        | Edit         |
| `actions.search`      | ค้นหา        | Search       |
| `actions.addData`     | เพิ่มข้อมูล  | Add Data     |
| `actions.clearFilter` | ล้างค่า      | Clear Filter |

#### Keys สำหรับ Labels (labels.\*)

| Key            | ภาษาไทย (TH) | English (EN) |
| -------------- | ------------ | ------------ |
| `labels.total` | ทั้งหมด      | Total        |
| `labels.items` | รายการ       | items        |
| `labels.runno` | ลำดับ        | No.          |

---

### 5. วิธีทดสอบ

1. **เปิดหน้า Truck Check-in**
2. **คลิกปุ่มเปลี่ยนภาษาที่ด้านบนขวา** (ใกล้รูป User)
3. **เลือก EN** → ข้อความทั้งหมดจะเปลี่ยนเป็นภาษาอังกฤษ
4. **เลือก TH** → ข้อความทั้งหมดจะเปลี่ยนเป็นภาษาไทย

### 6. สิ่งที่เปลี่ยนแปลง

✅ Column Header "ลำดับ" จะเป็น:

- **TH**: "ลำดับ"
- **EN**: "No."

✅ ทุกข้อความในหน้า Truck Check-in จะเปลี่ยนตามภาษาที่เลือก

✅ Placeholder, Label, Button, Message ทั้งหมดรองรับ 2 ภาษา

---

## ข้อดีของการใช้ i18n Key

1. ✅ **ง่ายต่อการบำรุงรักษา**: แก้ไขข้อความที่ไฟล์เดียว
2. ✅ **รองรับหลายภาษา**: เพิ่มภาษาใหม่ได้ง่าย
3. ✅ **Consistency**: ข้อความเหมือนกันทั่วทั้งแอป
4. ✅ **Dynamic**: เปลี่ยนภาษาได้ทันทีโดยไม่ต้อง reload
5. ✅ **Maintainable**: แยก logic จาก presentation

---

## หมายเหตุ

- ทุก key ต้องมีทั้งในไฟล์ `en.json` และ `th.json`
- ใช้ `t()` function ทุกที่ที่มีข้อความแสดงผล
- หลีกเลี่ยงการ hard-code ข้อความในภาษาใดภาษาหนึ่ง
