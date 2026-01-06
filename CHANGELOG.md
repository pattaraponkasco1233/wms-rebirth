# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

-

### Changed

-

### Fixed

-

---

## [1.0.0] - 2026-01-06

### Added

- ✨ เปิดตัวระบบ WMS Rebirth
- 🔐 ระบบ Login/Logout พร้อม Authentication
- 📊 Dashboard หลักแสดงภาพรวมระบบ
- 🚗 หน้า Dashboard Car พร้อมกราฟและสถิติ
- 📋 หน้าจัดการ Booking Car (สร้าง, แก้ไข, ลบ)
- 🔍 ระบบ Filter ข้อมูลแบบ Real-time
- 📤 Export ข้อมูลเป็น Excel
- 🌍 รองรับ Multiple Environments (Dev, UAT, Prod)
- 📦 แสดง Version Number ในหน้า Login
- 🎨 UI Components แบบ Reusable

### Components Created

- StatisticCard - แสดงตัวเลขสถิติ
- ChartCard - Container สำหรับกราฟ
- SimpleBarChart - กราฟแท่งแบบ Simple
- SimplePieChart - กราฟวงกลมแบบ Simple
- RecentActivityList - รายการกิจกรรมล่าสุด
- QuickActionCard - ปุ่มการดำเนินการด่วน
- DataTableCard - ตารางข้อมูลใน Card
- ProgressCard - Progress Bar
- VersionDisplay - แสดง Version และ Environment

### API Integration

- Axios Instance พร้อม Interceptors
- Dashboard Car API Service
- Environment-based API URL Configuration
- Auto Token Management
- Global Error Handling

### Documentation

- 📚 API Integration Guide
- 🌍 Environment Configuration Guide
- 📦 Version Management Guide
- 🚀 Dashboard Components Documentation

---

## Version History Template

### [x.y.z] - YYYY-MM-DD

#### Added

- ใช้สำหรับฟีเจอร์ใหม่

#### Changed

- ใช้สำหรับการเปลี่ยนแปลงฟีเจอร์เดิม

#### Deprecated

- ใช้สำหรับฟีเจอร์ที่จะถูกลบในอนาคต

#### Removed

- ใช้สำหรับฟีเจอร์ที่ถูกลบออก

#### Fixed

- ใช้สำหรับ bug fixes

#### Security

- ใช้สำหรับ security fixes

---

## Icons Legend

- ✨ New Feature
- 🔧 Improvement
- 🐛 Bug Fix
- 🔐 Security
- 📚 Documentation
- 🎨 UI/UX
- ⚡ Performance
- 🔥 Breaking Change
- 📦 Dependencies
- 🌍 Environment/Config

---

[Unreleased]: https://github.com/your-org/wms-rebirth/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/your-org/wms-rebirth/releases/tag/v1.0.0
