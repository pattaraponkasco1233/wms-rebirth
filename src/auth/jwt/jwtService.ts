import { AxiosResponse, AxiosInstance } from "axios";
// ตรวจสอบ Path การ Import axiosAuth
import jwtDefaultConfig, { JwtConfig } from "./jwtDefaultConfig";
import { wmsStorage, WMSData } from "../../utils/wmsStorage";

// 1. Interface สำหรับข้อมูลที่เก็บใน Local Storage (Key: 'wms')
// NOTE: ใช้ WMSData จาก wmsStorage แทน
interface WmsData extends WMSData { }

// 2. Type สำหรับ Subscriber Callback
type SubscriberCallback = (accessToken: string) => void;

// **********************************************
// * เปลี่ยนจากการ Export Instance เป็น Export Class *
// **********************************************
export default class JwtService { // <<< เปลี่ยนเป็น export default class
  // ** Type Annotation สำหรับตัวแปรสมาชิก **
  subscribers: SubscriberCallback[] = [];
  jwtConfig: JwtConfig = { ...jwtDefaultConfig };

  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance, jwtOverrideConfig?: Partial<JwtConfig>) {
    this.axiosInstance = axiosInstance; // กำหนด Instance ที่ถูก Inject เข้ามา
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig };
  }
  // ** Method สำหรับการจัดการ Token Refresh Subscribers **
  onAccessTokenFetched(accessToken: string): void {
    this.subscribers = this.subscribers.filter((callback) =>
      callback(accessToken)
    );
  }

  addSubscriber(callback: SubscriberCallback): void {
    this.subscribers.push(callback);
  }

  // ** Method สำหรับการเรียก API **
  // login(...args: any[]): Promise<AxiosResponse> {
  //   return this.axiosInstance.post(this.jwtConfig.loginEndpoint, ...args);
  // }
  login(...args: any[]): Promise<AxiosResponse> {
    return this.axiosInstance.post('http://203.151.6.30/gateway_bms_penk/web-api/v1/auth/login', ...args);
  }




  loginLdap(...args: any[]): Promise<AxiosResponse> {
    return this.axiosInstance.post(this.jwtConfig.loginLdapEndpoint, ...args);
  }

  // ** Method สำหรับจัดการ Secure Storage **
  getWmsData(): WmsData | null {
    return wmsStorage.getWMSData();
  }

  getToken(): string | null {
    return wmsStorage.getToken();
  }

  getRefreshToken(): string | null {
    const data = wmsStorage.getWMSData();
    return data.refreshToken || null;
  }

  setToken(value: string, expiresAt?: number): void {
    wmsStorage.setToken(value, expiresAt);
  }

  setRefreshToken(value: string): void {
    wmsStorage.updateWMSData({ refreshToken: value });
  }

  refreshToken(): Promise<AxiosResponse> {
    return this.axiosInstance.post(this.jwtConfig.refreshEndpoint, {
      refresh_token: this.getRefreshToken(),
    });
  }
}

// ลบ: const jwtService = new JwtService();
// ลบ: export default jwtService;