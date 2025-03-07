import { createHashRouter } from "react-router-dom";
import FonterLayout from "../layouts/FonterLayout";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage";
import ProductDetailPage from "../pages/ProductDetailPage"

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
      { // 產品細項
        path: 'product:id',
        element: <ProductDetailPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      }
    ]
  }
]);

export default router;