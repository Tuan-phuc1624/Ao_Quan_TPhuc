import React from "react";
import "./Banner.css";

import { Link } from "react-router-dom";

const Banner = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="banner">
        <div className="bannerLeft">
          <h6 className="bannerh6">Bắt đầu với 100k</h6>
          <h3 className="bannerh3">Áo phông nữ</h3>
          <h5 className="bannerh5">
            <Link to="/shop" onClick={scrollToTop} style={{ color: "white" }}>
              Mua ngay
            </Link>
          </h5>
        </div>
        <div className="bannerRight">
          <h6 className="bannerh6" style={{ color: "black" }}>
            Bắt đầu với 100k
          </h6>
          <h3 className="bannerh3" style={{ color: "black" }}>
            Đồ thể thao nam
          </h3>
          <h5 className="bannerh5">
            <Link to="/shop" onClick={scrollToTop} style={{ color: "black" }}>
              Mua ngay
            </Link>
          </h5>
        </div>
      </div>
    </>
  );
};

export default Banner;
