import { BaseConfigRecord } from "./api.base";
import { wmsStorage } from "../utils/wmsStorage";

const oneWms = wmsStorage.getWMSData();
const SetServer = oneWms.server;

const hederserver = "wmap01";
const apiserver = "API";
const serverPrefix = `https://${hederserver}.scgceramics.com`;

// UAT Configuration (ใช้ Partial เพื่อให้ Object ที่สร้างมี Properties ไม่ครบได้)
export const UAT_CONFIG: BaseConfigRecord = {
  AUTH_BASE_URL: {
    local: "http://localhost:8400/auth-api/v2",
    public: `${serverPrefix}/auth-api/v2`,
    uat_hk: `${serverPrefix}/${apiserver}_WMS_HK_GATEWAY/web-api/v1`,
    useServer: SetServer,
    requiresApiKey: true,
  },
  INBOUND_BASE_URL: {
    local: "http://localhost:8400/inbound-api/v2",
    server84: `${serverPrefix}:8400/inbound-api/v2`,
    public: `${serverPrefix}/inbound-api/v2`,
    uat_hk: `${serverPrefix}/${apiserver}_WMS_NKIE_MASTER/inbound-api/v2`,
    useServer: SetServer,
    requiresApiKey: true,
  },
  OUTBOUND_BASE_URL: {
    // ... URLs
    useServer: SetServer, // <<< ต้องมี
    requiresApiKey: true,
  },
  MASTER_BASE_URL: {
    // ... URLs
    useServer: SetServer, // <<< ต้องมี
    requiresApiKey: true,
  },
  RTLS_BASE_URL: {
    // ... URLs
    useServer: SetServer, // <<< ต้องมี
    requiresApiKey: true,
  },
  BALANCE_BASE_URL: {
    // ... URLs
    useServer: SetServer, // <<< ต้องมี
    requiresApiKey: true,
  },
  REPORT_BASE_URL: {
    // ... URLs
    useServer: SetServer, // <<< ต้องมี
    requiresApiKey: true,
  },
  TRANSFER_BASE_URL: {
    // ... URLs
    useServer: SetServer, // <<< ต้องมี
    requiresApiKey: true,
  },
  MAT2MAT_BASE_URL: {
    // ... URLs
    useServer: SetServer, // <<< ต้องมี
    requiresApiKey: true,
  },
  CONVERSION_BASE_URL: {
    // ... URLs
    useServer: SetServer, // <<< ต้องมี
    requiresApiKey: true,
  },
};
