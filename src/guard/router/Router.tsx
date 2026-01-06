// src/guard/router/Router.tsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoutes } from './routers'; // นำเข้า Routes ที่รวมไว้ทั้งหมด
import AuthGuard from '../AuthGuard'; // นำเข้า AuthGuard

const basename = process.env.REACT_APP_BASENAME || '/';

// Component สำหรับการจัดการ Guard และ Layout
const RouteWrapper: React.FC<any> = ({ element, isProtected, layout: LayoutComponent }) => {
  // 1. จัดการ Guard
  const content = isProtected ? <AuthGuard>{element}</AuthGuard> : element;

  // 2. จัดการ Layout
  if (LayoutComponent) {
    return (
      <LayoutComponent>
        {content}
      </LayoutComponent>
    );
  }

  // ไม่มี Layout
  return content;
};


const AppRouter: React.FC = () => {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        {AppRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <RouteWrapper 
                element={route.element}
                isProtected={route.isProtected}
                layout={route.layout}
              />
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;