// src/components/Header.tsx
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Space } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  FileTextOutlined,
  PictureOutlined,
} from "@ant-design/icons";

// 导航项配置
const navItems = [
  { path: "/dashboard", title: "Dashboard" },
  { path: "/usermanagement", title: "UserManagement" },
  { path: "/pdftopic", title: "PdfToPic" },
  {
    path: "/documentmanagement",
    title: "DocumentManagement",

  }, {
    path: "/checklist",
    title: "CheckList",
  }
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <div style={{ padding: "16px", borderBottom: "1px solid #e8e8e8" }}>
      <Space size="middle">
        {navItems.map((item) => (
            <span
            style = {{
              cursor: "pointer",
              color: location.pathname === item.path ? "#1890ff" : "inherit",
            }}
            key={item.path}
            onClick={() => handleNavClick(item.path)}
          >
            {item.title}
          </span>
        ))}
      </Space>
    </div>
  );
};

export default Header;
