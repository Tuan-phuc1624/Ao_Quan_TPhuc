import React from "react";
import "./CollectionBox.css";

import { Link } from "react-router-dom";

const CollectionBox = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="collection">
        <div className="collectionLeft">
          <p className="col-p">Danh Sách Nổi Bật</p>
          <h3 className="col-h3">
            <span>Bộ Sưu Tập Phụ Nữ</span>
          </h3>
          <div className="col-link">
            <Link to="/shop" onClick={scrollToTop}>
              <h5>Mua Ngay</h5>
            </Link>
          </div>
        </div>
        <div className="collectionRight">
          <div className="collectionTop">
            <p className="col-p">Danh Sách Nổi Bật</p>
            <h3 className="col-h3">
              <span>Bộ Sưu Tập Nam</span>
            </h3>
            <div className="col-link">
              <Link to="/shop" onClick={scrollToTop}>
                <h5>Mua Ngay</h5>
              </Link>
            </div>
          </div>
          <div className="collectionBottom">
            <div className="box1">
              <p className="col-p">Danh Sách Nổi Bật</p>
              <h3 className="col-h3">
                <span>Bộ Sưu Tập Trẻ Em</span>
              </h3>
              <div className="col-link">
                <Link to="/shop" onClick={scrollToTop}>
                  <h5>Mua Ngay</h5>
                </Link>
              </div>
            </div>
            <div className="box2">
              <h3 className="col-h3">
                <span>Thẻ E-gift</span>
              </h3>
              <p className="col-p">
                Tặng cho ai đó món quà mà họ thực sự muốn.
              </p>
              <div className="col-link">
                <Link to="/shop" onClick={scrollToTop}>
                  <h5>Mua Ngay</h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionBox;
