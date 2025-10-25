import { StrictMode } from "react"; // React 严格模式，帮助发现代码问题
import { createRoot } from "react-dom/client"; // 创建 React 应用的根节点
import { Provider } from "react-redux"; // Redux 的提供者，让所有组件都能访问 store
import { PersistGate } from "redux-persist/integration/react"; // 持久化网关，确保数据从存储加载后再渲染
import { store, persistor } from "./store"; // 导入配置好的 store 和持久化对象
import "./index.css"; // 全局样式文件
import App from "./App.tsx"; // 主应用组件

// 创建 React 应用根节点并渲染
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* 开启严格模式，开发时检测潜在问题 */}
    <Provider store={store}>
      {/* 提供 Redux store 给所有子组件 */}
      <PersistGate loading={null} persistor={persistor}>
        {/* 等待数据从存储加载完成 */}
        <App /> {/* 你的主应用组件 */}
      </PersistGate>
    </Provider>
  </StrictMode>
);
