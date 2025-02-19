import React, { useState } from "react";
import "./AdditionalInfo.css";

import user1 from "../../../Assets/Users/user1.jpeg";

import Rating from "@mui/material/Rating";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import baseApi from "../../../utils/api";

const AdditionalInfo = ({ product }) => {
  const [activeTab, setActiveTab] = useState("aiTab1");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      productId: product._id,
      rating,
      comment,
    };
    try {
      const { data } = await baseApi.post("/reviews/add", reviewData);
      toast.success("Review sản phẩm thành công", {
        duration: 2000,
        style: {
          backgroundColor: "#07bc0c",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#07bc0c",
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message, {
        duration: 2000,
        style: {
          backgroundColor: "#ff0000",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#ff0000",
        },
      });
    }
  };
  return (
    <>
      <div className="productAdditionalInfo">
        <div className="productAdditonalInfoContainer">
          <div className="productAdditionalInfoTabs">
            <div className="aiTabs">
              <p
                onClick={() => handleTabClick("aiTab1")}
                className={activeTab === "aiTab1" ? "aiActive" : ""}
              >
                Sự miêu tả
              </p>
              <p
                onClick={() => handleTabClick("aiTab2")}
                className={activeTab === "aiTab2" ? "aiActive" : ""}
              >
                Thông tin bổ sung
              </p>
              <p
                onClick={() => handleTabClick("aiTab3")}
                className={activeTab === "aiTab3" ? "aiActive" : ""}
              >
                Đánh giá ({product?.reviews?.length || 0})
              </p>
            </div>
          </div>
          <div className="productAdditionalInfoContent">
            {/* Tab1 */}

            {activeTab === "aiTab1" && (
                <div className="aiTabDescription">
                  <div className="descriptionPara">
                    <h3>Thời trang hiện đại, tiện lợi và thoải mái</h3>
                    <p>
                      Sản phẩm được làm từ chất liệu vải cao cấp, mang lại cảm giác thoải mái khi mặc. Được thiết kế với
                      kiểu dáng hiện đại, phù hợp với nhiều phong cách khác nhau. Chất liệu vải mềm mại, co giãn tốt,
                      giúp bạn cảm thấy tự tin và thoải mái suốt cả ngày dài. Ngoài ra, sản phẩm còn dễ dàng phối hợp
                      với nhiều trang phục khác nhau, tạo điểm nhấn cho set đồ của bạn.
                    </p>
                  </div>
                  <div className="descriptionParaGrid">
                    <div className="descriptionPara">
                      <h3>Tại sao nên chọn sản phẩm này?</h3>
                      <p>
                        <ul>
                          <li>Chất liệu cotton mềm mại, thoáng mát và dễ chịu khi mặc</li>
                          <li>Thiết kế đơn giản, dễ phối đồ (chẳng hạn như kích thước, màu sắc)</li>
                          <li>Sản phẩm phù hợp với nhiều phong cách và nhu cầu sử dụng khác nhau</li>
                        </ul>
                      </p>
                    </div>
                    <div className="descriptionPara">
                      <h3>Danh sách mẫu sản phẩm</h3>
                      <p>
                        <ol>
                          <li>Chất liệu cotton mềm mại, thoải mái và bền bỉ</li>
                          <li>Được thiết kế đơn giản, dễ dàng phối hợp với nhiều trang phục</li>
                          <li>Sản phẩm thích hợp cho cả trang phục hàng ngày và trang phục đi làm</li>
                        </ol>
                      </p>
                    </div>
                  </div>
                  <div className="descriptionPara">
                    <h3>Chất liệu lót</h3>
                    <p style={{marginTop: "-10px"}}>
                      100% Polyester, Chất liệu chính: 100% Polyester.
                    </p>
                  </div>
                </div>
            )}

            {/* Tab2 */}
            {activeTab === "aiTab2" && (
                <div className="aiTabAdditionalInfo">
                  <div className="additionalInfoContainer">
                    <h6>Cân nặng</h6>
                    <p> 1.25 kg</p>
                  </div>
                  <div className="additionalInfoContainer">
                    <h6>Kích thước</h6>
                    <p> 90 x 60 x 90 cm</p>
                  </div>
                  <div className="additionalInfoContainer">
                    <h6>Kích cỡ</h6>
                    <p> XS, S, M, L, XL</p>
                  </div>
                  <div className="additionalInfoContainer">
                    <h6>Màu sắc</h6>
                    <p> Đen, Cam, Trắng</p>
                  </div>
                  <div className="additionalInfoContainer">
                    <h6>Chất liệu</h6>
                    <p> Áo đầm kiểu sơ mi với thiết kế thoải mái, phong cách mạnh mẽ</p>
                  </div>
                </div>
            )}

            {/* Tab3 */}

            {activeTab === "aiTab3" && (
                <div className="aiTabReview">
                  <div className="aiTabReviewContainer">
                    <h3>Đánh giá</h3>
                    <div className="userReviews">
                      {product?.reviews.map((review, index) => (
                          <div
                              key={index}
                              className="userReview"
                              style={{borderBottom: "1px solid #e4e4e4"}}
                          >
                            <div className="userReviewImg">
                          <img src={user1} alt="" />
                        </div>
                        <div className="userReviewContent w-full">
                          <div className="userReviewTopContent">
                            <div className="userNameRating">
                              <h6>{review.user.name}</h6>
                              <div className="userRating">
                                <Rating
                                  name="simple-controlled"
                                  size="small"
                                  value={review.rating}
                                />
                              </div>
                            </div>
                            <div className="userDate">
                              <p>
                                {new Date(review.createdAt).toLocaleDateString(
                                  "vi-VN",
                                  {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="userReviewBottomContent">
                            <p className="w-full">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="userNewReview">
                    <div className="userNewReviewMessage">
                      <h5>
                        Hãy là người đầu tiên đánh giá “Áo khoác phao nhẹ có mũ trùm đầu”
                      </h5>
                      <p>
                        Địa chỉ email của bạn sẽ không được công bố. Các trường bắt buộc được đánh dấu *
                      </p>
                    </div>
                    <div className="userNewReviewRating">
                      <label>Đánh giá của bạn *</label>
                      <Rating
                        name="simple-controlled"
                        size="small"
                        value={rating}
                        onChange={(event, newValue) => {
                          setRating(newValue);
                        }}
                      />
                    </div>
                    <div className="userNewReviewForm">
                      <form onSubmit={handleSubmit}>
                        <textarea
                          cols={30}
                          rows={8}
                          placeholder="Đánh giá của bạn"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          required
                        />

                        <button type="submit">Xác Nhận</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalInfo;
