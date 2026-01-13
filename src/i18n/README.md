# คู่มือการใช้งาน i18n (Internationalization)

## ภาพรวม

โปรเจคนี้ใช้ `i18next` และ `react-i18next` สำหรับการจัดการภาษาหนาภาษา (Multi-language support)

## ภาษาที่รองรับ

- `en` - English
- `th` - ภาษาไทย (ภาษาเริ่มต้น)

## โครงสร้างไฟล์

```
src/
  i18n/
    locales/
      en.json        # ไฟล์แปลภาษาอังกฤษ
      th.json        # ไฟล์แปลภาษาไทย
    i18n.config.ts   # การตั้งค่า i18n
```

## วิธีใช้งาน

### 1. การเพิ่มคำแปลใหม่

แก้ไขไฟล์ `en.json` และ `th.json`:

```json
// en.json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel"
  },
  "pages": {
    "dashboard": "Dashboard"
  }
}

// th.json
{
  "common": {
    "save": "บันทึก",
    "cancel": "ยกเลิก"
  },
  "pages": {
    "dashboard": "แดชบอร์ด"
  }
}
```

### 2. การใช้งานใน Component

```tsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t("pages.dashboard")}</h1>
      <button>{t("common.save")}</button>

      {/* เปลี่ยนภาษา */}
      <button onClick={() => i18n.changeLanguage("en")}>EN</button>
      <button onClick={() => i18n.changeLanguage("th")}>TH</button>

      {/* ตรวจสอบภาษาปัจจุบัน */}
      <p>Current language: {i18n.language}</p>
    </div>
  );
}
```

### 3. การใช้ Key ในการเรียก

Key ในการเรียกใช้มีรูปแบบ: `category.key`

ตัวอย่าง:

- `t('common.logout')` → "ออกจากระบบ" (TH) / "Logout" (EN)
- `t('pages.dashboard')` → "แดชบอร์ด" (TH) / "Dashboard" (EN)
- `t('actions.save')` → "บันทึก" (TH) / "Save" (EN)

### 4. ปุ่มเปลี่ยนภาษา

ปุ่มเปลี่ยนภาษาอยู่ที่ Header ด้านขวาบน ใกล้กับรูป User Profile:

- เลือก **EN** สำหรับภาษาอังกฤษ
- เลือก **TH** สำหรับภาษาไทย

## คุณสมบัติเพิ่มเติม

### การใช้งานกับ Ant Design

ถ้าต้องการให้ Ant Design Component เปลี่ยนภาษาด้วย:

```tsx
import { ConfigProvider } from "antd";
import thTH from "antd/locale/th_TH";
import enUS from "antd/locale/en_US";

function App() {
  const { i18n } = useTranslation();
  const locale = i18n.language === "th" ? thTH : enUS;

  return <ConfigProvider locale={locale}>{/* Your app */}</ConfigProvider>;
}
```

### การเพิ่ม Parameter ในข้อความ

```json
{
  "greeting": "Hello, {{name}}!"
}
```

```tsx
t("greeting", { name: "John" }); // "Hello, John!"
```

## Tips

1. **Key Naming**: ใช้ naming แบบ hierarchical (category.subcategory.key) เพื่อความชัดเจน
2. **Fallback**: ถ้าไม่พบ key ระบบจะแสดง key ที่ใช้เรียก
3. **Default Language**: ภาษาเริ่มต้นคือ `th` (ภาษาไทย)
4. **Browser Detection**: ระบบจะตรวจจับภาษาจาก browser อัตโนมัติ

## การเพิ่มภาษาใหม่

1. สร้างไฟล์ใหม่ เช่น `src/i18n/locales/ja.json` (ภาษาญี่ปุ่น)
2. แก้ไข `i18n.config.ts`:

```ts
import ja from "./locales/ja.json";

i18n.init({
  resources: {
    en: { translation: en },
    th: { translation: th },
    ja: { translation: ja }, // เพิ่มภาษาใหม่
  },
  // ...
});
```

3. เพิ่มตัวเลือกใน Language Selector

## Troubleshooting

**ปัญหา**: ข้อความไม่เปลี่ยนเมื่อสลับภาษา

- **วิธีแก้**: ตรวจสอบว่าใช้ `t()` function ในการแสดงข้อความ ไม่ใช่ hard-code string

**ปัญหา**: Key ไม่พบ

- **วิธีแก้**: ตรวจสอบ path ของ key ให้ตรงกับโครงสร้างใน JSON file
