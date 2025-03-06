import { createHashRouter } from "react-router-dom";
import FonterLayout from "../layouts/FonterLayout";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPAge";

const router = createHashRouter([
  {
    path: '/',
    element: <FonterLayout />,
    children:[
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      }
    ]
  }
]);

export default router;