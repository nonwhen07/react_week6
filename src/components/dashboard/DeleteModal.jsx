import { useState, useEffect, useRef } from "react";
import ReactLoading from 'react-loading';
import { Modal } from "bootstrap";
import axios from "axios";

export default function DeleteModal({ tempProduct, getProducts, isOpen, setIsOpen }){
  // 環境變數
  const baseURL = import.meta.env.VITE_BASE_URL;
  const apiPath = import.meta.env.VITE_API_PATH;
  // //拷貝 tempProduct 資料來轉換成 modalData來顯示
  // const [modalData, setModalData] = useState(tempProduct);
  // Modal Ref 定義
  const deleteModalRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleCloseDeleteModal = () => {
    // Modal.getInstance(deleteModalRef.current).hide();
    setIsOpen(false);
  };

  // 刪除產品動點
  const handleDeleteProduct = async () => {
    setIsLoading(true);
    try {
      await deleteProduct();
      getProducts();
      handleCloseDeleteModal();
    } catch (error) {
      console.error(error);
      alert("刪除商品失敗");
    } finally{
      setIsLoading(false);
    }
  };
  // 刪除
  const deleteProduct = async () => {
    try {
      await axios.delete(
        `${baseURL}/v2/api/${apiPath}/admin/product/${tempProduct.id}`
      );
    } catch (error) {
      console.error(error);
      alert("刪除商品失敗");
    }
  };

  //初始化 Modal
  useEffect(() => {
    if (deleteModalRef.current) {
      new Modal(deleteModalRef.current, { backdrop: false });
    }
  }, []);

  // Modal 開關控制
  useEffect(() => { // 集中處理開關 由 isOpen 判斷
    if (isOpen && deleteModalRef.current) {
      new Modal(deleteModalRef.current, { backdrop: false }).show();
    } else if (!isOpen && deleteModalRef.current) {
      const modalInstance = Modal.getInstance(deleteModalRef.current);
      if (modalInstance) modalInstance.hide();
    }
  }, [isOpen]);

  return (
    <div
      id="delProductModal"
      ref={deleteModalRef}
      className="modal fade"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">刪除產品</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            你是否要刪除
            <span className="text-danger fw-bold">{tempProduct.title}</span>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={handleDeleteProduct}
              className="btn btn-danger d-flex align-items-center justify-content-center"
              style={{ lineHeight: "normal" }} // 修正 line-height 導致的錯位
            >
              {isLoading && (
                <ReactLoading type="spin" color="#fff" height="1.25rem" width="1.25rem" />
              )}
              刪除
            </button>
            <button
              type="button"
              onClick={handleCloseDeleteModal}
              className="btn btn-secondary"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}