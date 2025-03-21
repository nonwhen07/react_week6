import { useState, useEffect } from "react";
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Pagination from '../../components/dashboard/Pagination';
import ProductModal from '../../components/dashboard/ProductModal';
import DeleteModal from '../../components/dashboard/DeleteModal';



export default function DashboardPage() {
  // 初始化 navigate
  const navigate = useNavigate(); 
  // 環境變數
  const baseURL = import.meta.env.VITE_BASE_URL;
  const apiPath = import.meta.env.VITE_API_PATH;

  // Modal Ref 定義
  // 狀態管理 (State)
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  // 管理Modal元件開關
  const [ isProductModalOpen, setIsProductModalOpen ] = useState(false);
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);

  // 狀態管理 (State)
  //Modal 資料狀態的預設值
  const defaultModalState = {
    imageUrl: "",
    title: "",
    category: "",
    unit: "",
    origin_price: "",
    price: "",
    description: "",
    content: "",
    is_enabled: 0,
    imagesUrl: [""]
  };
  const [tempProduct, setTempProduct] = useState(defaultModalState);
  const [modalMode, setModalMode] = useState(null);
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  // API & 認證相關函式
  const checkLogin = () => {
    setIsScreenLoading(true);
    axios.post(`${baseURL}/v2/api/user/check`)
    .then(() => {
      // setIsAuth(true);
      getProducts();
    })
    .catch((error) => {
      console.error(error);
      // setIsAuth(false);
      alert('請先登入，將導向登入頁面');
      navigate("/login"); // **確認沒有登入就跳轉到 LoginPage**
    })
    .finally(() => {
      setIsScreenLoading(false);
    });
  };
  // 取得產品列表
  const getProducts = async (page) => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(
        `${baseURL}/v2/api/${apiPath}/admin/products?page=${page}`
      );
      setProducts(res.data.products);
      setPageInfo(res.data.pagination);
    } catch (error) {
      console.error(error);
      alert("取得產品列表失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };
  // 產品列表分頁
  const handlePageChange = (page = 1) => {
    getProducts(page);
  };

  // Modal 開關控制
  // ProductModal
  const handleOpenProductModal = (mode, product = defaultModalState) => {
    setModalMode(mode);
    setTempProduct(
      Object.keys(product).length > 0 ? product : defaultModalState // 避免 api 回傳 product 為空物件時，無法正確設定tempProduct更保險
    );
    // 由於元件化了所以直接setIsProductModalOpen(true)，通知 ProductModal 打開
    setIsProductModalOpen(true)
  };
  // DeleteModal
  const handleOpenDeleteModal = (product = defaultModalState) => {
    setTempProduct(
      // 避免 api 回傳 product 為空物件時，無法正確設定tempProduct更保險
      product && Object.keys(product).length > 0 ? product : defaultModalState
    );
    // Modal.getInstance(deleteModalRef.current).show();
    setIsDeleteModalOpen(true)
  };


  // useEffect - 初始化 初始檢查登入狀態，如果沒有就轉到登入頁面
  useEffect(() =>{
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken4\s*=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    checkLogin();
  }, []);
  
  

  return (
    <>
      <div className="container py-5">
        <div className="d-flex justify-content-between">
          <h2>產品列表</h2>
          <button
            type="button"
            onClick={() => {
              handleOpenProductModal("create");
            }}
            className="btn btn-primary"
          >
            新增產品
          </button>
        </div>
        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col-3">產品名稱</th>
              <th scope="col-2">原價</th>
              <th scope="col-2">售價</th>
              <th scope="col-2">是否啟用</th>
              <th scope="col-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.title}</th>
                <td>{product.origin_price}</td>
                <td>{product.price}</td>
                <td>
                  {product.is_enabled ? (
                    <span className="text-success">啟用</span>
                  ) : (
                    <span>未啟用</span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleOpenProductModal("edit", product)}
                    className="btn btn-sm btn-outline-primary"
                    type="button"
                  >
                    編輯
                  </button>
                  <button
                    onClick={() => handleOpenDeleteModal(product)}
                    className="btn btn-sm btn-outline-danger"
                    type="button"
                  >
                    刪除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange} />
      </div>

      <ProductModal modalMode={modalMode} tempProduct={tempProduct}
        getProducts={getProducts} isOpen={isProductModalOpen} setIsOpen={setIsProductModalOpen} />

      <DeleteModal tempProduct={tempProduct} getProducts={getProducts}
        isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen} />

      {/* ScreenLoading */}
      {
        isScreenLoading && (
        <div className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.3)",
            zIndex: 999,
          }}
        >
          <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
        </div>
        )
      }
    </>
  )
}