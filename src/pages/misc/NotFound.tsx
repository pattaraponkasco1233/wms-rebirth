// src/pages/NotFoundPage.tsx

import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/login'); 
  };

  return (
    <div style={{ padding: '50px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Result
        status="404"
        title="404 - ไม่พบหน้า"
        subTitle="ขออภัย, หน้าที่คุณกำลังพยายามเข้าถึงไม่มีอยู่ในระบบ"
        extra={
          <Button type="primary" onClick={handleGoHome}>
            กลับสู่หน้าหลัก
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;