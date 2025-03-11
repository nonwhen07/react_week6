import { createHashRouter } from "react-router-dom";
import FonterLayout from "../layouts/FonterLayout";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage";
import ProductDetailPage from "../pages/ProductDetailPage"
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/admin/LoginPage";
import DashboardPage from "../pages/admin/DashboardPage";

const router = createHashRouter([
  {
    path: '/',
    element: <FonterLayout />,
    children:[
      {
        path: '',
        element: <HomePage />,
      },
      { // 產品列表
        path: 'products',
        element: <ProductsPage />,
      },
      { // 產品細項，如果是多個參數寫法=> path: 'product/:product_id/:typemode'
        // 要注意參數順序重要：網址的參數順序必須與路由設定一致。
        path: 'product/:product_id',
        element: <ProductDetailPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      }
    ]
  },
  { // Login頁面
    path:'/login',
    element:<LoginPage />
  },
  { // Admin - Dashboard頁面
    path:'/dashboard',
    element:<DashboardPage />
  },
  { // 404頁面
    path:'*',
    element:<NotFoundPage />
  }
]);

export default router;