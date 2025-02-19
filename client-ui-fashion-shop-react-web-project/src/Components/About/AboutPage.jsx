import React from "react";
import "./AboutPage.css";

import about1 from "../../Assets/About/about-1.jpg";
import about2 from "../../Assets/About/about-2.jpg";

import Services from "../../Components/Home/Services/Services";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import brand1 from "../../Assets/Brands/brand1.png";
import brand2 from "../../Assets/Brands/brand2.png";
import brand3 from "../../Assets/Brands/brand3.png";
import brand4 from "../../Assets/Brands/brand4.png";
import brand5 from "../../Assets/Brands/brand5.png";
import brand6 from "../../Assets/Brands/brand6.png";
import brand7 from "../../Assets/Brands/brand7.png";

const AboutPage = () => {
  return (
    <>
      <div className="aboutSection">
        <h2>Về Chúng Tôi</h2>
        <img src={about1} alt=""/>
        <div className="aboutContent">
          <h3>Câu Chuyện Của Chúng Tôi</h3>
          <h6>
            24fs Shop là sự kết hợp hoàn hảo giữa sự đam mê với thời trang và cam kết mang lại những sản phẩm chất
            lượng cao. Chúng tôi luôn mong muốn đem lại cho khách hàng những trải nghiệm mua sắm tuyệt vời nhất, với sự
            hỗ trợ tận tình từ đội ngũ của Kenny, người sáng lập và điều hành cửa hàng.
          </h6>

          <div className="content1">
            <div className="contentBox">
              <h5>Sứ Mệnh Của Chúng Tôi</h5>
              <p>
                Chúng tôi cam kết mang đến cho khách hàng những sản phẩm thời trang độc đáo, chất lượng cao, phù hợp với
                mọi xu hướng và phong cách. Mỗi sản phẩm tại 24fs Shop đều được chọn lọc kỹ càng để đảm bảo sự hài
                lòng tối đa cho khách hàng.
              </p>
            </div>
            <div className="contentBox">
              <h5>Tầm Nhìn Của Chúng Tôi</h5>
              <p>
                24fs Shop không chỉ là nơi bán hàng, mà còn là một cộng đồng kết nối những người yêu thích thời trang,
                nơi khách hàng có thể tìm thấy sự đổi mới và phong cách riêng biệt, giúp nâng tầm cá tính mỗi người.
              </p>
            </div>
          </div>
          <div className="content2">
            <div className="imgContent">
              <img src={about2} alt=""/>
            </div>
            <div className="textContent">
              <h5>Công Ty Chúng Tôi</h5>
              <p>
                Với sự lãnh đạo của Kenny, 24fs Shop luôn đi đầu trong việc tạo ra những trải nghiệm mua sắm trực
                tuyến vượt trội, kết hợp công nghệ và thời trang để mang lại sự tiện lợi và sự hài lòng tuyệt đối cho
                khách hàng. Chúng tôi cam kết sẽ không ngừng phát triển, cải tiến dịch vụ và sản phẩm để mang lại cho
                khách hàng những gì tốt nhất.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Services/>
      <div className="companyPartners">
        <h5>Đối tác công ty</h5>
        <Swiper
            slidesPerView={1}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 5,
              },

              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },

              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            spaceBetween={10}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
        >
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand1} alt=""/>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand2} alt=""/>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand3} alt=""/>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand4} alt=""/>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand5} alt=""/>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand6} alt=""/>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand7} alt=""/>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default AboutPage;
