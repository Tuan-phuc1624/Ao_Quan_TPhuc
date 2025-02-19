import React from "react";
import "./Footer.css";
import logo from "../../Assets/24fs-logo.png";
import paymentIcon from "../../Assets/paymentIcon.png";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscribed Successfully");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer className="footer">
        <div className="footer__container">
          <div className="footer_left">
            <div className="footer_logo_container">
              <img style={{height: '50px'}} src={logo} alt=""/>
            </div>
            <div className="social_links">
              <FaFacebookF/>
              <FaXTwitter/>
              <FaInstagram/>
              <FaYoutube/>
              <FaPinterest/>
            </div>
          </div>

          <div className="footer_content">
            <h5>Công ty</h5>
            <div className="links_container">
              <ul onClick={scrollToTop}>
                <li>
                  <Link to="/about">Về chúng tôi</Link>
                </li>
                <li>
                  <Link to="/about">Sự nghiệp</Link>
                </li>
                <li>
                  <Link to="*">Liên kết</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/contact">Liên hệ</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer_content">
            <h5>Cửa hàng</h5>
            <div className="links_container">
              <ul onClick={scrollToTop}>
                <li>
                  <Link to="/shop">Sản phẩm mới</Link>
                </li>
                <li>
                  <Link to="/shop">Phụ kiện</Link>
                </li>
                <li>
                  <Link to="/shop">Nam</Link>
                </li>
                <li>
                  <Link to="/shop">Nữ</Link>
                </li>
                <li>
                  <Link to="/shop">Tất cả sản phẩm</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer_content">
            <h5>Hỗ trợ</h5>
            <div className="links_container">
              <ul onClick={scrollToTop}>
                <li>
                  <Link to="/contact">Dịch vụ khách hàng</Link>
                </li>
                <li>
                  <Link to="/loginSignUp">Tài khoản của tôi</Link>
                </li>
                <li>
                  <Link to="/contact">Tìm cửa hàng</Link>
                </li>
                <li>
                  <Link to="/terms">Pháp lý & Quyền riêng tư</Link>
                </li>
                <li>
                  <Link to="/contact">Liên hệ</Link>
                </li>
                <li>
                  <Link to="/">Thẻ quà tặng</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer_right">
            <h5>Đăng ký nhận tin</h5>
            <p>
              Hãy là người đầu tiên nhận những tin tức mới nhất về xu hướng, khuyến mãi và nhiều hơn nữa!
            </p>

            <form onSubmit={handleSubscribe}>
              <input type="email" placeholder="Địa chỉ email của bạn" required/>
              <button type="submit">Tham gia</button>
            </form>

            <h6>Thanh toán bảo mật</h6>
            <div className="paymentIconContainer">
              <img src={paymentIcon} alt=""/>
            </div>
          </div>
        </div>
        <div className="footer_bottom">
          <p>
        
          </p>
          <div className="footerLangCurrency">
            <div className="footerLang">
              <p>Ngôn ngữ</p>
              <select name="language" id="language">
                <option value="english">United States | English</option>
                <option value="Germany">Đức</option>
                <option value="Vietnam">Việt Nam</option>
              </select>
            </div>
            <div className="footerCurrency">
              <p>Tiền tệ</p>
              <select name="currency" id="currency">
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
                <option value="VND">£ VND</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
