import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import ReactLoading from 'react-loading';

export default function LoginPage() {
  // 初始化 navigate
  const navigate = useNavigate();
  // 環境變數
  const baseURL = import.meta.env.VITE_BASE_URL;
  // const apiPath = import.meta.env.VITE_API_PATH;
  const [account, setAccount] = useState({ username: "example@test.com", password: "example"});

  
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  // 登入表單 - 登入submit事件
  const handleLogin = (e) =>{
    setIsScreenLoading(true);
    e.preventDefault();
    axios.post(`${baseURL}/v2/admin/signin`, account)  
    .then((res) => {
      const { token, expired } = res.data;
      document.cookie = `hexToken4=${token}; userLanguage=en; userPreference=darkMode; expires=${new Date(expired)}`; // 設定 cookie
      axios.defaults.headers.common['Authorization'] = token;
      // getProducts(); // 查詢商品資料列表
      // setIsAuth(true); // 設定登入狀態
      navigate("/dashboard"); // **登入成功後跳轉到 Dashboard**
    })
    .catch((error) => {
      console.error(error);
      alert('登入失敗');
    }).finally(()=>{
      setIsScreenLoading(false);
    });
  };
  // 登入表單 - Input變動
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  return (
    <>
      <div className="container">
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <h1 className="mb-5">請先登入</h1>
          <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
            <div className="form-floating mb-3">
              <input
                name="username"
                type="email"
                value={account.username || ""}
                onChange={handleInputChange}
                className="form-control"
                id="username"
                placeholder="example@test.com"
              />
              <label htmlFor="username">Email address</label>
            </div>
            <div className="form-floating">
              <input
                name="password"
                type="password"
                value={account.password || ""}
                onChange={handleInputChange}
                className="form-control"
                id="password"
                placeholder="example"
              />
              <label htmlFor="password">Password</label>
            </div>
            <button type="submit" className="btn btn-primary">
              登入
            </button>
          </form>
        </div>
      </div>
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