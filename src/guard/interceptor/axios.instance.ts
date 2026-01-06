// src/guard/interceptor/axios.instance.ts (ฉบับแก้ไข)

import axios, { AxiosInstance } from "axios";
// ต้องมั่นใจว่า alias "@utils" ถูกตั้งค่าใน tsconfig/webpack
import { currentDateNow } from "../../utils/Utils";
import setupInterceptors from "./setupInterceptors";
// นำเข้า CONFIG หลัก (ใช้ Partial<BaseUrlConfig> ใน BASE_CONFIG)
import { BASE_CONFIG, BaseUrlConfig } from "../../constant/api.base";

// 1. ดึง Base URL Configs ตาม Environment (ใช้ Partial เพื่อให้ Type ยอมรับ properties ที่อาจขาดไป)
const {
  AUTH_BASE_URL,
  INBOUND_BASE_URL,
  OUTBOUND_BASE_URL,
  MASTER_BASE_URL,
  RTLS_BASE_URL,
  BALANCE_BASE_URL,
  REPORT_BASE_URL,
  TRANSFER_BASE_URL,
  MAT2MAT_BASE_URL,
  CONVERSION_BASE_URL,
} = BASE_CONFIG;

// 2. กำหนดข้อมูล Request Infomation
const requestInfomation = {
  lang: "TH",
  time: currentDateNow(),
};

// 3. ฟังก์ชันสร้าง Instance
// ใช้ Partial<BaseUrlConfig> เพื่อให้เข้ากับ Type ของ Object ที่มาจาก BASE_CONFIG
const createAxiosInstance = (
  baseUrlConfig: Partial<BaseUrlConfig>
): AxiosInstance => {
  // เนื่องจากการใช้ Partial, เราต้องตรวจสอบว่า Property มีอยู่ก่อนใช้งาน
  const useServer = baseUrlConfig.useServer;

  let baseURL: string | null = null;

  // Logic การเลือก Base URL (ยังคงเดิม)
  if (useServer === "LOCAL") {
    baseURL = baseUrlConfig.local || null;
  } else if (useServer === "84") {
    baseURL = baseUrlConfig.server84 || null;
  } else if (useServer === "STD") {
    baseURL = baseUrlConfig.public || null;
  } else if (useServer === "NKIE") {
    baseURL = baseUrlConfig.uat_nkie || null;
  } else if (useServer === "NK12") {
    baseURL = baseUrlConfig.uat_nk1 || null;
  } else if (useServer === "LJ11") {
    baseURL = baseUrlConfig.uat_nk2 || null;
  } else if (useServer === "HK") {
    baseURL = baseUrlConfig.uat_hk || null;
  } else if (useServer === "KR") {
    baseURL = baseUrlConfig.uat_kr || null;
  } else if (useServer === "123") {
    baseURL = baseUrlConfig.uat_ssi || null;
  } else if (useServer === "456") {
    baseURL = baseUrlConfig.uat_ssf || null;
  }

  if (baseURL === null) {
    console.warn("API Base URL not set for this config:", baseUrlConfig);
  }

  const defaultTransformRequest = axios.defaults.transformRequest!;
  // สร้าง Instance
  const instance = axios.create({
    baseURL: baseURL || undefined,
    // @ts-ignore: เพิ่ม useApiKey เข้าไปใน config
    useApiKey: baseUrlConfig.requiresApiKey,
    transformRequest: [
      (data: Record<string, any> | undefined) => {
        if (data) {
          return { info: requestInfomation, ...data };
        }
        return { info: requestInfomation };
      },
      // ใช้ Spread Operator ร่วมกับการตรวจสอบว่าเป็น Array หรือไม่
      ...(Array.isArray(defaultTransformRequest)
        ? defaultTransformRequest
        : [defaultTransformRequest]),
    ],
  });

  // สร้างฟังก์ชัน setTimeout และกำหนด Type ให้ถูกต้อง
  (instance as any).setTimeout = (ms: number, allowOver: boolean = false) => {
    instance.defaults.timeout = allowOver ? 0 : ms;
    // @ts-ignore: กำหนด allowOverTimeout ให้กับ Instance
    instance.defaults.allowOverTimeout = allowOver;
  };

  return instance;
};

// 4. สร้าง Instances ทั้งหมด (ไม่มีการเปลี่ยนแปลง)
// ... (โค้ดสร้าง Instances)
const axiosAuth = createAxiosInstance(AUTH_BASE_URL);
const axiosInbound = createAxiosInstance(INBOUND_BASE_URL);
const axiosOutbound = createAxiosInstance(OUTBOUND_BASE_URL);
const axiosMaster = createAxiosInstance(MASTER_BASE_URL);
const axiosBinbalance = createAxiosInstance(BALANCE_BASE_URL);
const axiosRtls = createAxiosInstance(RTLS_BASE_URL);
const axiosConversion = createAxiosInstance(CONVERSION_BASE_URL);
const axiosReport = createAxiosInstance(REPORT_BASE_URL);
const axiosTransfer = createAxiosInstance(TRANSFER_BASE_URL);
const axiosMat2Mat = createAxiosInstance(MAT2MAT_BASE_URL);

setupInterceptors(axiosAuth);
setupInterceptors(axiosInbound);
setupInterceptors(axiosOutbound);
setupInterceptors(axiosBinbalance);
setupInterceptors(axiosMaster);
setupInterceptors(axiosRtls);
setupInterceptors(axiosReport);
setupInterceptors(axiosTransfer);
setupInterceptors(axiosMat2Mat);
setupInterceptors(axiosConversion);

// 6. Export Instances (ไม่มีการเปลี่ยนแปลง)
export {
  axiosAuth,
  axiosInbound,
  axiosOutbound,
  axiosMaster,
  axiosBinbalance,
  axiosRtls,
  axiosReport,
  axiosTransfer,
  axiosMat2Mat,
  axiosConversion,
};
