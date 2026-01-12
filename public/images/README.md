# 📁 Images Folder Structure

## โครงสร้าง Folder

```
public/images/
├── logo/           - โลโก้บริษัท, โลโก้แอป
├── icons/          - ไอคอนต่างๆ (SVG, PNG)
├── banners/        - แบนเนอร์, ภาพหัวเว็บ
├── defaults/       - รูปภาพเริ่มต้น (no-image, avatar-default)
├── vehicles/       - รูปรถ, ยานพาหนะ
├── products/       - รูปสินค้า, สต็อก
└── profiles/       - รูปโปรไฟล์ผู้ใช้
```

## การใช้งาน

### 1. รูปภาพใน `public/images/` (Static Assets)

```tsx
// วิธีที่ 1: ใช้ absolute path
<img src="/images/logo/logo.png" alt="Logo" />

// วิธีที่ 2: ใช้ process.env.PUBLIC_URL
<img src={`${process.env.PUBLIC_URL}/images/logo/logo.png`} alt="Logo" />

// วิธีที่ 3: ใช้ในการตั้งค่า
const logoUrl = '/images/logo/logo.png';
```

### 2. ตัวอย่างการใช้งาน

```tsx
// Header/Navbar
<img src="/images/logo/logo.png" alt="WMS Logo" width={120} />

// Vehicle Card
<img src="/images/vehicles/truck-001.jpg" alt="Truck" />

// Default Image
<img src="/images/defaults/no-image.png" alt="No Image" />

// User Profile
<Avatar src="/images/profiles/user-123.jpg" />
```

## 📝 Naming Convention

### Logo

- `logo.png` - โลโก้หลัก
- `logo-dark.png` - โลโก้สำหรับ dark mode
- `logo-small.png` - โลโก้ขนาดเล็ก
- `favicon.ico` - Favicon

### Icons

- `icon-name.svg` - ไอคอน SVG
- `icon-name.png` - ไอคอน PNG

### Vehicles

- `{vehicle-type}-{id}.jpg` - เช่น truck-001.jpg, van-002.jpg
- `{license-plate}.jpg` - เช่น 1กก-1234.jpg

### Products

- `{product-code}.jpg` - เช่น PRD-001.jpg
- `{product-code}-{variant}.jpg` - เช่น PRD-001-red.jpg

### Profiles

- `user-{id}.jpg` - เช่น user-123.jpg
- `avatar-default.png` - รูป avatar เริ่มต้น

## 🎨 ข้อกำหนดรูปภาพ

### Logo

- Format: PNG (with transparency)
- Size: 512x512px (high res), 120x40px (navbar)
- Max file size: 500KB

### Icons

- Format: SVG (preferred) or PNG
- Size: 24x24px, 32x32px, 64x64px
- Max file size: 100KB

### Vehicles/Products

- Format: JPG or PNG
- Size: 800x600px (recommended)
- Max file size: 2MB
- Aspect ratio: 4:3 or 16:9

### Profiles

- Format: JPG or PNG
- Size: 400x400px (square)
- Max file size: 1MB

## ⚠️ หมายเหตุ

1. **ไม่ควรเก็บรูปที่ user upload ใน public/** (ควรเก็บบน server/cloud)
2. เก็บเฉพาะรูปภาพที่เป็น **static assets** เท่านั้น
3. สำหรับ production ควรใช้ **CDN** เพื่อความเร็วในการโหลด
4. ตั้งชื่อไฟล์เป็น **lowercase** และใช้ **dash (-)**
5. หลีกเลี่ยงการใช้ **ภาษาไทย** หรือ **ช่องว่าง** ในชื่อไฟล์

## 🚀 Optimization

### Before Upload

```bash
# Optimize JPG
jpegoptim --size=500k image.jpg

# Optimize PNG
optipng image.png
pngquant --quality=65-80 image.png

# Convert to WebP
cwebp -q 80 image.jpg -o image.webp
```

### React Component

```tsx
// Lazy loading
<img src="/images/vehicle.jpg" loading="lazy" />

// Responsive images
<img
  src="/images/vehicle-800.jpg"
  srcSet="/images/vehicle-400.jpg 400w, /images/vehicle-800.jpg 800w"
  sizes="(max-width: 600px) 400px, 800px"
/>
```

## 📚 แหล่งรูปภาพฟรี

- [Unsplash](https://unsplash.com/) - ภาพคุณภาพสูง
- [Pexels](https://www.pexels.com/) - ภาพและวิดีโอฟรี
- [Flaticon](https://www.flaticon.com/) - ไอคอนฟรี
- [SVG Repo](https://www.svgrepo.com/) - SVG icons
- [Heroicons](https://heroicons.com/) - SVG icons by Tailwind

---

**Created:** 2026-01-12
**Version:** 1.0.0
