// src/i18n/i18n.config.ts

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// นำเข้าไฟล์ translation
import en from "./locales/en.json";
import th from "./locales/th.json";

// กำหนดค่า i18n
i18n
    .use(LanguageDetector) // ตรวจจับภาษาจาก browser
    .use(initReactI18next) // เชื่อมต่อกับ React
    .init({
        resources: {
            en: {
                translation: en,
            },
            th: {
                translation: th,
            },
        },
        fallbackLng: "th", // ภาษาเริ่มต้น
        lng: "th", // ภาษาเริ่มต้น
        debug: false, // เปิดดีบักในโหมด development
        interpolation: {
            escapeValue: false, // ไม่ต้อง escape สำหรับ React
        },
    });

export default i18n;
