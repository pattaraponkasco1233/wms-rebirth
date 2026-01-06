// src/constant/baseURL.prd.ts

import { BaseConfigRecord } from './api.base'; 
const oneWms = JSON.parse(localStorage.getItem("wms") || "{}");
const SetServer = oneWms.server;


const hederserver = "wmap01";
const apiserver = "API";
const serverPrefix = `https://${hederserver}.scgceramics.com`;

// PRODUCTION Configuration
export const PRD_CONFIG: BaseConfigRecord = {
  AUTH_BASE_URL: { 
    local: "http://localhost:8400/auth-api/v2",
    public: `${serverPrefix}/auth-api/v2`,
    uat_hk: `${serverPrefix}/${apiserver}_WMS_HK_GATEWAY/web-api/v1`,
    useServer: SetServer,
    requiresApiKey: true,
  },
};