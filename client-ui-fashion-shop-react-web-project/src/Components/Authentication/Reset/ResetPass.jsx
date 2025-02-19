import React from "react";

import "./ResetPass.css";
import { Link } from "react-router-dom";

const ResetPass = () => {
  return (
    <div>
      <div className="resetPasswordSection">
        <h2>Đặt lại mật khẩu của bạn</h2>
        <div className="resetPasswordContainer">
          <p>Chúng tôi sẽ gửi cho bạn một email để đặt lại mật khẩu của bạn</p>
          <form>
            <input type="email" placeholder="Email address *" required />
            <button type="submit">XÁC NHẬN</button>
          </form>
        </div>
        <p>
          Back to{" "}
          <Link to="/loginSignUp">
            <span>ĐĂNG NHẬP</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPass;
