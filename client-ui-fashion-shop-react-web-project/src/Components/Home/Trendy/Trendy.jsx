import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCartPlus, FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StoreData from "../../../Data/StoreData";
import { addToCart } from "../../../Features/Cart/cartSlice";
import { fetchProducts } from "../../../Features/Product/productSlice";
import "./Trendy.css";

const Trendy = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("tab1");
  const [wishList, setWishList] = useState({});
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const productError = useSelector((state) => state.products.error);
  const totalPages = useSelector((state) => state.products.totalPages);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleWishlistClick = (productID) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [productID]: !prevWishlist[productID],
    }));
  };

  const sortByPrice = (a, b) => a.productPrice - b.productPrice;

  const sortByReviews = (a, b) => {
    const reviewsA = parseInt(
      a.productReviews.replace("k+ reviews", "").replace(",", "")
    );
    const reviewsB = parseInt(
      b.productReviews.replace("k+ reviews", "").replace(",", "")
    );
    return reviewsB - reviewsA;
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
      <div className="trendyProducts">
        <h2>
          <span>Sản phẩm thời trang của chúng tôi</span>
        </h2>
        <div className="trendyTabs">
          <div className="tabs">
            <p
              onClick={() => handleTabClick("tab1")}
              className={activeTab === "tab1" ? "active" : ""}
            >
              TẤT CẢ
            </p>
            <p
              onClick={() => handleTabClick("tab2")}
              className={activeTab === "tab2" ? "active" : ""}
            >
              Hàng mới về
            </p>
          </div>
          <div className="trendyTabContent">
            {/* Tab 1 */}
            {activeTab === "tab1" && (
              <div className="trendyMainContainer">
                {productStatus === "succeeded" &&
                  Array.isArray(products) &&
                  products.length > 0 &&
                  products.slice(0, 8).map((product, index) => (
                    <div className="trendyProductContainer" key={index}>
                      <div className="trendyProductImages">
                        <Link
                          to={`/Product/${product._id}`}
                          onClick={scrollToTop}
                        >
                          <img
                            src={product.image[0]}
                            alt=""
                            className="trendyProduct_front"
                          />
                          {product.image[1] && (
                              <img
                                  src={product.image[1]}
                                  alt=""
                                  className="trendyProduct_back"
                              />
                          )}
                        </Link>
                      </div>

                      <div className="trendyProductInfo">
                        <div className="trendyProductCategoryWishlist">
                          <p>{product.category.name}</p>
                          <FiHeart
                            onClick={() =>
                              handleWishlistClick(product.productID)
                            }
                            style={{
                              color: wishList[product.productID]
                                ? "red"
                                : "#767676",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                        <div className="trendyProductNameInfo">
                          <Link to="product" onClick={scrollToTop}>
                            <h5>{product.title}</h5>
                          </Link>
                          <p>
                            đ
                            {product.prices.price
                              ? product.prices.price
                              : product.prices.originalPrice}
                          </p>
                          <div className="trendyProductRatingReviews">
                            <div className="trendyProductRatingStar">
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                            </div>
                            <span>{product.reviews.length} reviews</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* Tab 2 */}
            {activeTab === "tab2" && (
              <div className="trendyMainContainer">
                {productStatus === "succeeded" &&
                  Array.isArray(products) &&
                  products.length > 0 &&
                  products
                    .slice(0, 8)
                    .reverse()
                    .map((product, index) => (
                      <div className="trendyProductContainer" key={index}>
                        <div className="trendyProductImages">
                          <Link
                            to={`/Product/${product._id}`}
                            onClick={scrollToTop}
                          >
                            <img
                              src={product.image[0]}
                              alt=""
                              className="trendyProduct_front"
                            />
                            <img
                              src={product.image[1]}
                              alt=""
                              className="trendyProduct_back"
                            />
                          </Link>
                        </div>

                        <div className="trendyProductInfo">
                          <div className="trendyProductCategoryWishlist">
                            <p>{product.category.name}</p>
                            <FiHeart
                              onClick={() =>
                                handleWishlistClick(product.productID)
                              }
                              style={{
                                color: wishList[product.productID]
                                  ? "red"
                                  : "#767676",
                                cursor: "pointer",
                              }}
                            />
                          </div>
                          <div className="trendyProductNameInfo">
                            <Link to="product" onClick={scrollToTop}>
                              <h5>{product.title}</h5>
                            </Link>
                            <p>
                              $
                              {product.prices.price
                                ? product.prices.price
                                : product.prices.originalPrice}
                            </p>
                            <div className="trendyProductRatingReviews">
                              <div className="trendyProductRatingStar">
                                <FaStar color="#FEC78A" size={10} />
                                <FaStar color="#FEC78A" size={10} />
                                <FaStar color="#FEC78A" size={10} />
                                <FaStar color="#FEC78A" size={10} />
                                <FaStar color="#FEC78A" size={10} />
                              </div>
                              <span>{product.reviews.length} reviews</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            )}
          </div>
        </div>
        <div className="discoverMore">
          <Link to="/shop" onClick={scrollToTop}>
            <p>Khám phá thêm</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Trendy;
