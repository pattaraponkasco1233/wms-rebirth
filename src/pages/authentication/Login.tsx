// src/pages/LoginPage.tsx

import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Typography,
  message,
  Select,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useAuth from "../../shares/hooks/useAuth";
// ต้องมั่นใจว่า updateWmsStorage และ WmsData ถูก Import อย่างถูกต้อง
import { WmsData, updateWmsStorage } from "../../utils/setServerHelper";
import { wmsStorage } from "../../utils/wmsStorage";
import VersionDisplay from "../../components/common/VersionDisplay";

const { Title, Text } = Typography;
const { Option } = Select;

// 1. กำหนด Interface สำหรับ Plant Option เพื่อความชัดเจนของ Type
interface PlantOption {
  label: string;
  name: string;
  value: string;
}

const plantOptions: PlantOption[] = [
  { label: "NKIE", name: "6514", value: "NKIE" },
  { label: "NK12", name: "6515", value: "NK12" },
  { label: "HK", name: "6511", value: "HK" },
  { label: "KRW", name: "6524", value: "KR" },
];

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [selectedPlant, setSelectedPlant] = useState<string | undefined>(() => {
    // 2. กำหนด Type ให้กับ oneWms ที่ดึงมาจาก secure storage
    const oneWms = wmsStorage.getWMSData();
    return oneWms.server;
  });

  debugger
  // หากผู้ใช้ล็อกอินอยู่แล้ว ให้ redirect ไปหน้า proactive-monito ทันที
  if (isAuthenticated) {
    navigate("/proactive-monitor", { replace: true });
    return null;
  }

  // 3. กำหนด Type ให้กับ values ของ Form
  interface LoginFormValues {
    username?: string;
    password?: string;
    plant?: string; // เพิ่ม plant field
    // ... อื่นๆ
  }

  const onFinish = async (values: LoginFormValues) => {
    // updateWmsStorage({
    //   token:
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluZGV2IiwibGV2ZWxfdXNlciI6IjEiLCJpcCI6IjQ5LjIyOC45OS40NCIsImV4cCI6MTc2ODk2NzczMywiaXNzIjoiS2FzY29fQXV0aGVudGljYXRpb25fQVBJIiwiYXVkIjoiVE1TIn0.eYZp0HD-nleujqqsc2SYD1vyQB079NDnwrN_bLJuAFU",
    //   refreshToken: "dummyRefreshToken",
    // });
    // navigate("/proactive-monitor", { replace: true });
    if (selectedPlant) {
      values.plant = selectedPlant;
    }

    // ตรวจสอบความถูกต้องของ values ก่อนเรียก login
    if (values.username && values.password) {
      // โชว์ Loading หรือ Disable Button ระหว่างรอ
      const success = await login(
        values.username,
        values.password,
        values.plant
      );
      debugger
      if (success) {
        message.success("เข้าสู่ระบบสำเร็จ! กำลังนำทางไป proactive-monitor");
        navigate("/proactive-monitor", { replace: true });
      } else {
        message.error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
    } else {
      message.error("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", background: "#f0f2f5" }}
    >
      <Col xs={24} sm={18} md={12} lg={8} xl={6}>
        <Card>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <Title level={2}>เข้าสู่ระบบ</Title>
          </div>
          <Form
            name="login_form"
            initialValues={{ remember: true, plant: selectedPlant }} // ตั้งค่า initial value สำหรับ plant
            onFinish={onFinish}
          >
            <Form.Item
              label="Plant"
              name="plant"
              className="form-label"
              rules={[
                {
                  required: true,
                  message: "Please select your plant!",
                },
              ]}
            >
              <Select
                data-testid="plant-select"
                value={selectedPlant}
                placeholder="Select your plant"
                onChange={(value: string) => {
                  // กำหนด Type เป็น string
                  const selected = plantOptions.find(
                    (option) => option.value === value
                  );

                  // 4. แก้ไข TS18048: ตรวจสอบว่า selected ไม่ใช่ undefined ก่อนใช้งาน
                  if (selected) {
                    updateWmsStorage({ server: selected.value }); // อัปเดตใน wms
                    setSelectedPlant(value);

                    // แนะนำให้ใช้ useEffect ในการ reload ถ้าจำเป็นต้องทำ
                    window.location.reload();
                  } else {
                    console.error("Selected plant option not found:", value);
                  }
                }}
              >
                {plantOptions.map((option) => (
                  <Option key={option.name} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {/* ... Form.Item อื่นๆ ... */}
            <Form.Item
              name="username"
              rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="ชื่อผู้ใช้ (test)"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน!" }]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="รหัสผ่าน (1234)"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                เข้าสู่ระบบ
              </Button>
            </Form.Item>
          </Form>

          {/* Version Display */}
          <div
            style={{
              marginTop: 24,
              paddingTop: 16,
              borderTop: "1px solid #f0f0f0",
            }}
          >
            <VersionDisplay
              showEnvironment={true}
              showBuildDate={false}
              size="default"
              align="center"
              showTooltip={true}
            />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
