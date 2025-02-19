import React from "react";

import "./BlogDetails.css";

import blogdetail1 from "../../../Assets/Blog/blogDetail1.jpg";
import blogimage1 from "../../../Assets/Blog/blogDetail2.jpg";
import blogimage2 from "../../../Assets/Blog/blogDetail3.jpg";

import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";

const BlogDetails = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
      <div>
        <div className="blogDetailsSection">
          <div className="blogDetailsSectionContainer">
            <div className="blogDetailsHeading">
              <h2>5 Mẹo Để Tăng Doanh Số Bán Hàng Online</h2>
              <div className="blogDetailsMetaData">
                <span>bởi admin</span>
                <span>Ngày 19, Tháng 5, 2023</span>
                <span>Xu hướng</span>
              </div>
            </div>
            <div className="blogDetailsFeaturedImg">
              <img src={blogdetail1} alt=""/>
            </div>
            <div className="blogDetailsContent">
              <p>
                Khi bán hàng online, một trong những yếu tố quan trọng nhất là tạo ra một chiến lược tiếp cận hiệu quả.
                Việc xây dựng một thương hiệu mạnh mẽ và khả năng cung cấp sản phẩm chất lượng sẽ tạo nên sự tin tưởng
                từ khách hàng. Bạn cũng cần hiểu rõ nhu cầu của khách hàng và tối ưu hóa các chiến lược marketing để thu
                hút người mua.
              </p>
              <h5>Quá trình làm việc chăm chỉ đã giúp tôi cải thiện kỹ năng và đạt được những thành tựu đáng kể</h5>
              <p>
                Việc tối ưu hóa trang web và trải nghiệm người dùng có thể giúp tăng tỷ lệ chuyển đổi. Điều này bao gồm
                việc cải thiện tốc độ tải trang, thiết kế giao diện dễ sử dụng, và cải thiện quy trình thanh toán để
                khách hàng có thể dễ dàng hoàn tất giao dịch.
              </p>
              <div className="blogDetailsContentBullets">
                <div className="blogDetailsContentBulletscontent">
                  <h5>Tại sao chọn sản phẩm này?</h5>
                  <p>
                    <ul>
                      <li>Chất liệu vải cotton mềm mại và mượt mà</li>
                      <li>
                        Đơn giản, có thể cấu hình (ví dụ: kích thước, màu sắc, v.v.), theo bộ
                      </li>
                      <li>Sản phẩm có thể tải xuống/sản phẩm kỹ thuật số, sản phẩm ảo</li>
                    </ul>
                  </p>
                </div>
                <div className="blogDetailsContentBulletscontent">
                  <h5>Danh Sách Mẫu Số</h5>
                  <p>
                    <ol>
                      <li>Chất liệu vải cotton mềm mại và mượt mà</li>
                      <li>
                        Đơn giản, có thể cấu hình (ví dụ: kích thước, màu sắc, v.v.), theo bộ
                      </li>
                      <li>Sản phẩm có thể tải xuống/sản phẩm kỹ thuật số, sản phẩm ảo</li>
                    </ol>
                  </p>
                </div>
              </div>
              <p>
                Để tạo sự khác biệt trong thị trường bán hàng trực tuyến, các doanh nghiệp cần chú trọng đến việc cung
                cấp dịch vụ khách hàng xuất sắc. Cung cấp các kênh hỗ trợ nhanh chóng, như chat trực tuyến, và duy trì
                sự liên lạc thường xuyên với khách hàng sẽ giúp nâng cao trải nghiệm mua sắm của họ.
              </p>
            </div>
            <div className="blogDetailsContentImg">
              <img src={blogimage1} alt=""/>
              <img src={blogimage2} alt=""/>
            </div>
            <div className="blogDetailsContent">
              <p>
                Cách thức tiếp cận khách hàng trong bán hàng online không chỉ dựa vào việc sử dụng các công cụ quảng
                cáo. Việc xây dựng mối quan hệ lâu dài với khách hàng thông qua các chương trình khuyến mãi hoặc việc
                gửi các email chăm sóc khách hàng cũng là yếu tố quan trọng để giữ khách quay lại.
              </p>
              <p>
                Mỗi chiến lược bán hàng cần được điều chỉnh theo từng đối tượng khách hàng. Sự phân tích dữ liệu sẽ giúp
                bạn hiểu rõ hơn về hành vi của khách hàng, từ đó xây dựng các chiến dịch marketing chính xác hơn, mang
                lại hiệu quả cao.
              </p>
            </div>
            <div className="share-buttons">
              <button className="share-button facebook">
                <FaFacebookF/> Chia sẻ trên Facebook
              </button>
              <button className="share-button twitter">
                <FaXTwitter/>
                Chia sẻ trên Twitter
              </button>
              <button className="share-button pinterest">
                <FaPinterest/> Chia sẻ trên Pinterest
              </button>
              <button className="share-button more">
                <FaPlus size={20}/>
              </button>
            </div>
            <div className="blogDetailsNextPrev">
              <div className="blogDetailsNextPrevContainer">
                <div
                    className="blogDetailsNextPrevContainerIcon"
                    onClick={scrollToTop}
                >
                  <GoChevronLeft size={20}/>
                  <p>BÀI TRƯỚC</p>
                </div>
                <p>Phương pháp tối ưu để tăng trưởng doanh thu trong kinh doanh trực tuyến</p>
              </div>
              <div className="blogDetailsNextPrevContainer">
                <div
                    className="blogDetailsNextPrevContainerIcon2"
                    onClick={scrollToTop}
                >
                  <p>BÀI TIẾP THEO</p>
                  <GoChevronRight size={20}/>
                </div>
                <p style={{textAlign: "right"}}>
                  Hướng dẫn chi tiết để xây dựng chiến lược marketing hiệu quả
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default BlogDetails;
