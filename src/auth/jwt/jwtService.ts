import { AxiosResponse, AxiosInstance } from "axios";
// ตรวจสอบ Path การ Import axiosAuth
import jwtDefaultConfig, { JwtConfig } from "./jwtDefaultConfig"; 

// 1. Interface สำหรับข้อมูลที่เก็บใน Local Storage (Key: 'one_wms')
interface WmsData {
  token?: string;
  refreshToken?: string;
  [key: string]: any; 
}

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
  login(...args: any[]): Promise<AxiosResponse> {
    return this.axiosInstance.post(this.jwtConfig.loginEndpoint, ...args);
  }

  loginLdap(...args: any[]): Promise<AxiosResponse> {
    return this.axiosInstance.post(this.jwtConfig.loginLdapEndpoint, ...args);
  }

  // ** Method สำหรับจัดการ Local Storage **
  getWmsData(): WmsData | null {
    const item = localStorage.getItem("wms");
    try {
      return item ? JSON.parse(item) as WmsData : null;
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    // ใช้ .token ตามที่ setToken กำหนด
    return this.getWmsData()?.token || null; 
  }

  getRefreshToken(): string | null {
    return this.getWmsData()?.refreshToken || null;
  }

  setToken(value: string): void {
    const data: WmsData = this.getWmsData() || {};
    data.token = value;
    localStorage.setItem("wms", JSON.stringify(data));
  }

  setRefreshToken(value: string): void {
    const data: WmsData = this.getWmsData() || {};
    data.refreshToken = value;
    localStorage.setItem("wms", JSON.stringify(data));
  }

  refreshToken(): Promise<AxiosResponse> {
    return this.axiosInstance.post(this.jwtConfig.refreshEndpoint, {
      refresh_token: this.getRefreshToken(),
    });
  }
}

// ลบ: const jwtService = new JwtService();
// ลบ: export default jwtService;