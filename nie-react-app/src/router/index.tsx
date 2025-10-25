
import React, { Suspense, type ReactNode } from 'react';
import {createBrowserRouter } from 'react-router-dom';
const HomePage = React.lazy(() => import('../pages/Wellcome'));
const UserManagement = React.lazy(() => import('../pages/UserManagement'));
const PdfToPic = React.lazy(() => import("../pages/PdfToPic"));
const DocumentManagement = React.lazy(() => import('../pages/DocumentManagement'));
const Layout = React.lazy(() => import('../components/Layout'));
interface NieRouteMap {
    path: string;
    auth: number; //是否需要登录访问
    title: string;
    key: string; //和path一直
    element: any;
    hidden?: boolean; //是否在菜单中隐藏
    children?: NieChildRouteMap[]; //子路由
}
interface NieChildRouteMap extends NieRouteMap {
    parentpath: string; //父级路径。如果是三级菜单，parentpath为/一级路径/二级路径
}
const loadElement = (element: ReactNode):ReactNode => (<Suspense fallback={<div>Loading...</div>}>{element}</Suspense>)
const RouterMap: NieRouteMap[] = [
  {
    path: "/",
    auth: 0,
    title: "Roothome",
    key: "roothome",
    element: loadElement(<Layout />),
    children: [
      {
        path: "/homepage",
        auth: 0,
        title: "Homepage",
        key: "homepage",
        parentpath: "/",
        element: loadElement(<HomePage />),
      },
      {
        path: "/usermanagement",
        auth: 0,
        title: "UserManagement",
        key: "usermanagement",
        parentpath: "/",
        element: loadElement(<UserManagement />),
      },
      {
        path: "/pdftopic",
        auth: 0,
        title: "PdfToPic",
        key: "pdftopic",
        parentpath: "/",
        element: loadElement(<PdfToPic />),
      },
      {
        path: "/documentmanagement",
        auth: 0,
        title: "DocumentManagement",
        key: "documentmanagement",
        parentpath: "/",
        element: loadElement(<DocumentManagement />),
      },
    ],
  },
];

export const router = createBrowserRouter(RouterMap);