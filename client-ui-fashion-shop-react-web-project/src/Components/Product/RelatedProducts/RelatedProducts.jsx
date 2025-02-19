import React, {useEffect, useState} from "react";
import "./RelatedProducts.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import StoreData from "../../../Data/StoreData";

import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../Features/Product/productSlice";
import {Link} from "react-router-dom";

const RelatedProducts = () => {
  const dispatch = useDispatch();
  const [wishList, setWishList] = useState({});
  const products = useSelector((state) => state.products.items);

  const handleWishlistClick = (productID) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [productID]: !prevWishlist[productID],
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    dispatch(
        fetchProducts({
          page: 1,
          limit: 100,
          title: "",
          category: "",
          price: null,
        })
    );
  }, [dispatch]);

  return (
    <>
      <div className="relatedProductSection">
        <div className="relatedProducts">
          <h2>
            <span>SẢN PHẨM LIÊN QUAN</span>
          </h2>
        </div>
        <div className="relatedProductSlider">
          <div className="swiper-button image-swiper-button-next">
            <IoIosArrowForward />
          </div>
          <div className="swiper-button image-swiper-button-prev">
            <IoIosArrowBack />
          </div>
          <Swiper
            slidesPerView={4}
            slidesPerGroup={4}
            spaceBetween={30}
            loop={true}
            navigation={{
              nextEl: ".image-swiper-button-next",
              prevEl: ".image-swiper-button-prev",
            }}
            modules={[Navigation]}
            breakpoints={{
              320: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 30,
              },
            }}
          >
            {products.slice(0, 8).map((product) => {
              return (
                <SwiperSlide key={product._id}>
                  <div className="rpContainer">
                    <div className="lpImageContainer">
                      <Link to={`/Product/${product._id}`} className="rpImages" onClick={scrollToTop}>
                        <img
                            src={product.image[0]}
                            alt={product.title}
                            className="lpImage"
                        />
                        {product.image[1] && (
                            <img
                                src={product.image[1]}
                                alt={product.title}
                                className="rpBackImg"
                            />
                        )}
                      </Link>

                    </div>

                    <div className="relatedProductInfo">
                      <div className="rpCategoryWishlist">
                        <p>{product.category.name}</p>
                        <FiHeart
                            onClick={() => handleWishlistClick(product._id)}
                            style={{
                              color: wishList[product._id]
                                  ? "red"
                                  : "#767676",
                              cursor: "pointer",
                            }}
                        />
                      </div>
                      <div className="productNameInfo">
                        <h5 onClick={scrollToTop}>{product.title}</h5>
                        <p>đ{product.prices.price
                            ? product.prices.price
                            : product.prices.originalPrice}</p>
                        <div className="productRatingReviews">
                          <div className="productRatingStar">
                            <FaStar color="#FEC78A" size={10}/>
                            <FaStar color="#FEC78A" size={10}/>
                            <FaStar color="#FEC78A" size={10}/>
                            <FaStar color="#FEC78A" size={10}/>
                            <FaStar color="#FEC78A" size={10}/>
                          </div>

                          <span>{product.reviews.length} đánh giá</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default RelatedProducts;
