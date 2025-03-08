import { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from 'react-loading';


export default function ProductDetailPage(ProductID){

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_PATH = import.meta.env.VITE_API_PATH;

  const [product, setProduct] = useState([]);
  const [qtySelect, setQtySelect] = useState(1);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false); //改用下面的loadingItems，先儲存商品ID來標定loading位置
  // const [loadingItems, setLoadingItems] = useState({}); // 用物件儲存各商品的 Loading 狀態

  useEffect(() => {
    setIsScreenLoading(true);
    const getProductDetail = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/product/${ProductID}`);
        setProduct(res.data.product);
      } catch (error) {
        console.error(error);
        alert("取得產品細項失敗");
      }finally{
        setIsScreenLoading(false);
      }
    };
    //畫面渲染後初步載入產品細項
    getProductDetail();
  }, []);


  //加入購物車
  const addCartItem = async (product_id, qty = 1) => {
    // 如果 qty 小於 1，直接返回不做任何處理
    if (qty < 1) {
      console.warn("qty 不能小於 1");
      return;
    }
    setIsLoading(true);

    try {
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
        data: {
          product_id,
          qty: Number(qty),
        },
      });
    } catch (error) {
      console.error(error);
      alert("加入購物車失敗");
    } finally {
      setIsLoading(false);
    }
  };


  return(
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-6">
            <img className="img-fluid" src={product.imageUrl} alt={product.title} />
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center gap-2">
              <h2>{product.title}</h2>
              <span className="badge text-bg-success">{product.category}</span>
            </div>
            <p className="mb-3">{product.description}</p>
            <p className="mb-3">{product.content}</p>
            <h5 className="mb-3">NT$ {product.price}</h5>
            <div className="input-group align-items-center w-75">
              <select
                value={qtySelect}
                onChange={(e) => setQtySelect(e.target.value)}
                id="qtySelect"
                className="form-select"
              >
                {Array.from({ length: 10 }).map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>

              <button type="button" 
                disabled={isLoading}
                onClick={() => addCartItem(product.id, qtySelect)} 
                className="btn btn-primary">
                加入購物車
                {
                  isLoading && ( <ReactLoading type={"spin"} color={"#000"} height={"1.5rem"} width={"1.5rem"} /> )
                }
              </button>

            </div>
          </div>
        </div>
      </div>

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