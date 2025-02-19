import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, signup } from "../../../Features/Auth/authSlice";
import "./LoginSignUp.css";

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("tabButton1");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(credentials)
      await dispatch(login(credentials)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to login: ", error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signup(userData)).unwrap();
      navigate(0);
    } catch (error) {
      console.error("Failed to signup: ", error);
    }
  };

  return (
    <div className="loginSignUpSection">
      <div className="loginSignUpContainer">
        <div className="loginSignUpTabs">
          <p
            onClick={() => handleTab("tabButton1")}
            className={activeTab === "tabButton1" ? "active" : ""}
          >
            ĐĂNG NHẬP
          </p>
          <p
            onClick={() => handleTab("tabButton2")}
            className={activeTab === "tabButton2" ? "active" : ""}
          >
            ĐĂNG KÝ
          </p>
        </div>
        <div className="loginSignUpTabsContent">
          {authError && <p style={{ color: "red" }}>{authError}</p>}
          {authStatus === "succeeded" && (
            <p style={{ color: "green" }}>Success! Redirecting...</p>
          )}
          {activeTab === "tabButton1" && (
            <div className="loginSignUpTabsContentLogin">
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Địa chỉ email *"
                  required
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Mật khẩu *"
                  required
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      password: e.target.value,
                    })
                  }
                />
                <div className="loginSignUpForgetPass">
                  <label>
                    <input type="checkbox" className="brandRadio" />
                    <p>Nhớ tui</p>
                  </label>
                  <p>
                    <Link to="/resetPassword">Quên mật khẩu?</Link>
                  </p>
                </div>
                {authStatus === "loading" ? (
                  <CircularProgress />
                ) : (
                  <button type="submit">ĐĂNG NHẬP</button>
                )}
              </form>
              <div className="loginSignUpTabsContentLoginText">
                <p>
                  Chưa có tài khoản?{" "}
                  <span onClick={() => handleTab("tabButton2")}>
                    TẠO TÀI KHOẢN
                  </span>
                </p>
              </div>
            </div>
          )}
          {activeTab === "tabButton2" && (
            <div className="loginSignUpTabsContentRegister">
              <form onSubmit={handleSignup}>
                <input
                  type="text"
                  placeholder="Username *"
                  required
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email address *"
                  required
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password *"
                  required
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  pattern="^(?=.*[A-Z]).{6,20}$"
                  title="Mật khẩu phải dài từ 6 đến 20 ký tự và chứa ít nhất một chữ cái viết hoa."
                />
                <p>
                  Dữ liệu cá nhân của bạn sẽ được sử dụng để hỗ trợ trải nghiệm của bạn
                  trên toàn bộ trang web này, để quản lý quyền truy cập vào tài khoản của bạn,
                  và cho các mục đích khác được mô tả trong
                  <Link
                    to="/terms"
                    style={{ textDecoration: "none", color: "#c32929" }}
                  >
                    {" "}
                    chính sách bảo mật
                  </Link>
                  .
                </p>
                {authStatus === "loading" ? (
                  <CircularProgress />
                ) : (
                  <button type="submit">Đăng kí</button>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;