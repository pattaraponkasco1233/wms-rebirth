# Truck Check-in Components Structure

## 📁 โครงสร้างไฟล์

```
src/pages/truck-checkin/
├── index.tsx                           # Main Page Component
├── components/
│   ├── index.ts                        # Export barrel file
│   ├── TruckCheckinFilter.tsx          # Filter Component
│   └── TruckCheckinTable.tsx           # Table Component
└── README.md
```

## 🎯 Components Overview

### 1. **TruckCheckinFilter Component**

**ไฟล์**: `components/TruckCheckinFilter.tsx`

**หน้าที่**: จัดการส่วน Filter และ Search ของหน้า Truck Check-in

**Props**:

```typescript
interface TruckCheckinFilterProps {
  searchText: string; // ข้อความค้นหา
  searchPlant: string | undefined; // โรงงานที่เลือก
  searchDate: Dayjs | null; // วันที่เลือก
  loading: boolean; // สถานะ loading
  onSearchTextChange: (value: string) => void;
  onSearchPlantChange: (value: string | undefined) => void;
  onSearchDateChange: (date: Dayjs | null) => void;
  onSearch: () => void; // เมื่อกดปุ่มค้นหา
  onReset: () => void; // เมื่อกดปุ่มล้างค่า
  onAdd: () => void; // เมื่อกดปุ่มเพิ่มข้อมูล
}
```

**Features**:

- ✅ Input สำหรับค้นหา (ทะเบียนรถ, พนักงานขับรถ, Shipment No, Carrier)
- ✅ Select สำหรับเลือก Plant
- ✅ DatePicker สำหรับเลือกวันที่
- ✅ ปุ่ม Search, Clear Filter, Add Data

---

### 2. **TruckCheckinTable Component**

**ไฟล์**: `components/TruckCheckinTable.tsx`

**หน้าที่**: แสดงตารางข้อมูล Truck Check-in

**Props**:

```typescript
interface TruckCheckinTableProps {
  dataSource: TruckCheckin[]; // ข้อมูลที่จะแสดงในตาราง
  loading: boolean; // สถานะ loading
  currentPage: number; // หน้าปัจจุบัน
  pageSize: number; // จำนวนรายการต่อหน้า
  total: number; // จำนวนข้อมูลทั้งหมด
  onEdit: (record: TruckCheckin) => void; // เมื่อกดปุ่มแก้ไข
  onPageChange: (page: number, size: number) => void; // เมื่อเปลี่ยนหน้า
}
```

**Features**:

- ✅ แสดงตารางข้อมูลพร้อม 11 columns
- ✅ Pagination (แบ่งหน้า)
- ✅ Status Tag พร้อมสี (ดึงจาก TRUCK_CHECKIN_STATUS_OPTIONS)
- ✅ ปุ่ม Edit แต่ละแถว
- ✅ Responsive scroll (x: 1200)

**Columns**:

1. ลำดับ (Run No.)
2. โรงงาน (Plant)
3. ผู้ขนส่ง (Carrier)
4. ประเภทรถ (Vehicle Type)
5. ทะเบียนรถ (License)
6. หมายเลขการจัดส่ง (Shipment No)
7. ชื่อพนักงานขับรถ (Driver Name)
8. เบอร์โทร (Tel)
9. วันเวลาเช็คอิน (Check-in DateTime)
10. สถานะ (Status)
11. จัดการ (Action)

---

### 3. **Main Page Component**

**ไฟล์**: `index.tsx`

**หน้าที่**: จัดการ State, Logic และ Modal

**Responsibilities**:

- 📊 State Management (data, loading, pagination)
- 🔄 API Calls (fetch, create, update)
- 📝 Form Handling (Modal เพิ่ม/แก้ไข)
- 🎨 Layout Composition (รวม Filter + Table)

**Removed from Main Page** (ย้ายไป Components):

- ❌ Filter UI (→ TruckCheckinFilter)
- ❌ Table UI (→ TruckCheckinTable)
- ❌ Columns Definition (→ TruckCheckinTable)
- ❌ renderStatusTag function (→ TruckCheckinTable)

---

## 🔧 Usage Example

### Import Components

```typescript
import { TruckCheckinFilter, TruckCheckinTable } from "./components";
```

### Use in Main Page

```tsx
<Space direction="vertical" size="small" style={{ width: "100%" }}>
  {/* Filter Component */}
  <TruckCheckinFilter
    searchText={searchText}
    searchPlant={searchPlant}
    searchDate={searchDate}
    loading={loading}
    onSearchTextChange={setSearchText}
    onSearchPlantChange={setSearchPlant}
    onSearchDateChange={setSearchDate}
    onSearch={handleSearch}
    onReset={handleReset}
    onAdd={handleAdd}
  />

  {/* Table Component */}
  <TruckCheckinTable
    dataSource={dataSource}
    loading={loading}
    currentPage={currentPage}
    pageSize={pageSize}
    total={total}
    onEdit={handleEdit}
    onPageChange={(page, size) => {
      setPageSize(size);
      fetchTruckCheckins(page, size);
    }}
  />
</Space>
```

---

## 📊 Component Architecture

```
┌─────────────────────────────────────────┐
│     TruckCheckinPage (index.tsx)        │
│  • State Management                     │
│  • API Calls                            │
│  • Modal Logic                          │
│  • Form Handling                        │
└──────────┬──────────────────────────────┘
           │
           ├──────────────────┬────────────────────
           │                  │
           ▼                  ▼
┌──────────────────┐  ┌──────────────────────┐
│ TruckCheckinFilter│  │ TruckCheckinTable    │
│  • Search Input   │  │  • Data Display      │
│  • Plant Select   │  │  • Columns           │
│  • Date Picker    │  │  • Pagination        │
│  • Action Buttons │  │  • Status Tags       │
└──────────────────┘  └──────────────────────┘
```

---

## ✅ Benefits of Separation

### 1. **Code Organization**

- 📁 แยกส่วน UI ออกจาก Logic
- 🔍 ง่ายต่อการค้นหาและแก้ไข
- 📝 Code ในแต่ละไฟล์สั้นลงและอ่านง่ายขึ้น

### 2. **Reusability**

- ♻️ สามารถนำ Components ไปใช้ในหน้าอื่นได้
- 🔄 แก้ไข UI ครั้งเดียว ใช้ได้หลายที่

### 3. **Maintainability**

- 🛠️ แก้ไข Filter → แก้แค่ TruckCheckinFilter.tsx
- 📊 แก้ไข Table → แก้แค่ TruckCheckinTable.tsx
- 🎯 แก้ไข Logic → แก้แค่ index.tsx

### 4. **Testing**

- ✅ Test แต่ละ Component แยกกันได้
- 🧪 Mock Props ได้ง่าย
- 📈 Test Coverage สูงขึ้น

### 5. **Type Safety**

- 🔒 Props มี Interface ชัดเจน
- 🎯 TypeScript ช่วย validate
- 📝 IntelliSense ทำงานได้ดี

---

## 🎨 Styling Consistency

### Card Wrapper

ทั้ง Filter และ Table ใช้ `<Card>` wrapper เหมือนกัน

### Spacing

ใช้ `<Space direction="vertical" size="small">` สำหรับ layout

### Responsive

- Filter: Responsive columns (xs, sm, md, lg)
- Table: Horizontal scroll เมื่อหน้าจอเล็ก

---

## 🔄 Data Flow

```
User Action (Filter/Table)
    ↓
Props Callback Functions (onSearch, onEdit, etc.)
    ↓
Main Page (index.tsx)
    ↓
API Call / State Update
    ↓
Props Update to Components
    ↓
Components Re-render
```

---

## 📝 File Sizes Comparison

### Before Separation

- `index.tsx`: ~600 lines ❌

### After Separation

- `index.tsx`: ~370 lines ✅
- `TruckCheckinFilter.tsx`: ~90 lines ✅
- `TruckCheckinTable.tsx`: ~140 lines ✅
- `index.ts`: ~2 lines ✅

**Total**: Same functionality, better organization! 🎉

---

## 🚀 Future Enhancements

### Possible Additions:

1. **TruckCheckinModal Component** - แยก Modal ออกมา
2. **TruckCheckinForm Component** - แยก Form ออกมา
3. **StatusBadge Component** - แยก Status Tag ออกมา (ใช้ร่วมกับหน้าอื่นได้)

---

**Last Updated**: January 28, 2026  
**Version**: 2.0.0
