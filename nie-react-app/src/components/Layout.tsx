// src/layouts/RootLayout.tsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

// 根布局：所有页面都会经过这里，自动包含 Header
const RootLayout = () => {
  return (
    <div style={{ minHeight: "100vh" }}> {/* 占满整个屏幕高度 */}
      <Header />
      <div style={{ padding: "24px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
