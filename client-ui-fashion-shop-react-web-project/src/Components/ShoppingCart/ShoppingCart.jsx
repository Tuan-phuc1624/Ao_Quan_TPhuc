import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItems,
  removeFromCart,
  selectCartTotalAmount,
  updateQuantity,
} from "../../Features/Cart/cartSlice";
import "./ShoppingCart.css";

import { MdOutlineClose } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";

import success from "../../Assets/success.png";
import baseApi from "../../utils/api";

const ShoppingCart = () => {
  const [loading, setLoading] = useState(true)
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const orderStatus = useSelector((state) => state.order.status);
  const orderError = useSelector((state) => state.order.error);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("cartTab1");
  const [payments, setPayments] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postcode: "",
    phone: "",
    email: "",
    orderNotes: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleTabClick = (tab) => {
    if (tab === "cartTab1" || cartItems.length > 0) {
      setActiveTab(tab);
    }
  };
  useEffect(() => {
    const fetchCartItems = async () => {
      await dispatch(getCartItems());
      setLoading(false);
    };

    fetchCartItems();
  }, [dispatch]);

  const handleQuantityChange = (productId, variant, quantity) => {
    if (quantity >= 1 && quantity <= 100) {
      dispatch(updateQuantity({ productId, variant, quantity }));
    }
  };

  const totalPrice = useSelector(selectCartTotalAmount);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const orderData = {
        billing: {
          name: formData.firstName + " " + formData.lastName,
          address: formData.address,
          city: formData.city,
          zipCode: formData.postcode,
          contact: formData.phone,
          email: formData.email,
        },
        cart: cartItems,
        totalPrice,
        selectedPayment,
        shippingCost: 10,
      };
      const res = await baseApi.post("/order/add", orderData);
      if (res.status === 201) {
        if (selectedPayment === "cod") {
        } else {
          console.log(selectedPayment);
          const url = await baseApi.post("/order/payment-momo", {
            total: totalPrice,
            orderId: res.data.order._id,
          });
          window.open(url.data.data.payUrl, "_blank");
        }
        setPayments(true);
        handleTabClick("cartTab3");
      }
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // current Date
  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "Họ là bắt buộc";
    if (!formData.lastName) errors.lastName = "Tên là bắt buộc";
    if (!formData.address) errors.address = "Địa chỉ là bắt buộc";
    if (!formData.city) errors.city = "Thành phố là bắt buộc";
    if (!formData.postcode) errors.postcode = "Mã bưu điện là bắt buộc";
    if (!formData.phone) errors.phone = "Số điện thoại là bắt buộc";
    if (!formData.email) errors.email = "Email là bắt buộc";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const currentDate = new Date();

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Random number

  const orderNumber = Math.floor(Math.random() * 100000);

  // Radio Button Data

  const [selectedPayment, setSelectedPayment] = useState("cod");

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  if (loading) {
    return <div>Đang tải giỏ hàng...</div>;
  }

  return (
    <div>
      <div className="shoppingCartSection">
        <h2>GIỎ HÀNG</h2>

        <div className="shoppingCartTabsContainer">
          <div className={`shoppingCartTabs ${activeTab}`}>
            <button
              className={activeTab === "cartTab1" ? "active" : ""}
              onClick={() => {
                handleTabClick("cartTab1");
                setPayments(false);
              }}
            >
              <div className="shoppingCartTabsNumber">
                <h3>01</h3>
                <div className="shoppingCartTabsHeading">
                  <h3>Giỏ Hàng</h3>
                  <p>Quản lý danh sách sản phẩm của bạn</p>
                </div>
              </div>
            </button>
            <button
              className={activeTab === "cartTab2" ? "active" : ""}
              onClick={() => {
                handleTabClick("cartTab2");
                setPayments(false);
              }}
              disabled={cartItems.length === 0}
            >
              <div className="shoppingCartTabsNumber">
                <h3>02</h3>
                <div className="shoppingCartTabsHeading">
                  <h3>Vận Chuyển và Thanh Toán</h3>
                  <p>Hoàn tất đơn hàng của bạn</p>
                </div>
              </div>
            </button>
            <button
              className={activeTab === "cartTab3" ? "active" : ""}
              onClick={() => {
                handleTabClick("cartTab3");
              }}
              disabled={cartItems.length === 0 || payments === false}
            >
              <div className="shoppingCartTabsNumber">
                <h3>03</h3>
                <div className="shoppingCartTabsHeading">
                  <h3>Xác Nhận</h3>
                  <p>Xem lại và gửi đơn hàng của bạn</p>
                </div>
              </div>
            </button>
          </div>
          <div className="shoppingCartTabsContent">
            {/* tab1 */}
            {activeTab === "cartTab1" && (
              <div className="shoppingBagSection">
                <div className="shoppingBagTableSection">
                  {/* For Desktop Devices */}
                  <table className="shoppingBagTable">
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th></th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng phụ</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                          <tr key={index}>
                            <td data-label="Product">
                              <div className="shoppingBagTableImg">
                                <Link to={`/Product/${item?.product._id}`} onClick={scrollToTop}>
                                  <img src={item?.product?.image[0]} alt="" />
                                </Link>
                              </div>
                            </td>
                            <td data-label="">
                              <div className="shoppingBagTableProductDetail">
                                <Link to={`/Product/${item?.product._id}`} onClick={scrollToTop}>
                                  <h4>{item?.product?.title}</h4>
                                </Link>
                              
                              </div>
                            </td>
                            <td
                              data-label="Price"
                              style={{ textAlign: "center" }}
                            >
                              {item?.product?.prices.price
                                ? item?.product?.prices?.price
                                : item?.product?.prices.originalPrice}{" "}
                              đ
                            </td>
                            <td data-label="Quantity">
                              <div className="ShoppingBagTableQuantity">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.product._id,
                                      item.variant,
                                      item.quantity - 1
                                    )
                                  }
                                >
                                  -
                                </button>
                                <input
                                  type="text"
                                  min="1"
                                  max="20"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      item.product._id,
                                      item.variant,
                                      parseInt(e.target.value)
                                    )
                                  }
                                />
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.product._id,
                                      item.variant,
                                      item.quantity + 1
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td data-label="Subtotal">
                              <p
                                style={{
                                  textAlign: "center",
                                  fontWeight: "500",
                                }}
                              >
                                {(Number.parseInt(
                                  item?.product?.prices?.price
                                ) ||
                                  Number.parseInt(
                                    item?.product?.prices?.originalPrice
                                  )) * item.quantity}{" "}
                              </p>
                            </td>
                            <td data-label="">
                              <MdOutlineClose
                                onClick={() =>
                                  dispatch(
                                    removeFromCart({
                                      itemId: item._id,
                                    })
                                  )
                                }
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6">
                            <div className="shoppingCartEmpty">
                              <span>Giỏ hàng của bạn đang trống!</span>
                              <Link to="/shop" onClick={scrollToTop}>
                                <button>Mua ngay</button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {/* For Mobile devices */}

                  <div className="shoppingBagTableMobile">
                    {cartItems.length > 0 ? (
                      <>
                        {cartItems.map((item) => (
                          <div key={item.productID}>
                            <div className="shoppingBagTableMobileItems">
                              <div className="shoppingBagTableMobileItemsImg">
                                <Link to="/product" onClick={scrollToTop}>
                                  <img src={item.frontImg} alt="" />
                                </Link>
                              </div>
                              <div className="shoppingBagTableMobileItemsDetail">
                                <div className="shoppingBagTableMobileItemsDetailMain">
                                  <Link to="/product" onClick={scrollToTop}>
                                    <h4>{item.productName}</h4>
                                  </Link>
                                  <p>{item.productReviews}</p>
                                  <div className="shoppingBagTableMobileQuantity">
                                    <button
                                      onClick={() =>
                                        handleQuantityChange(
                                          item.productID,
                                          item.quantity - 1
                                        )
                                      }
                                    >
                                      -
                                    </button>
                                    <input
                                      type="text"
                                      min="1"
                                      max="20"
                                      value={item.quantity}
                                      onChange={(e) =>
                                        handleQuantityChange(
                                          item.productID,
                                          parseInt(e.target.value)
                                        )
                                      }
                                    />
                                    <button
                                      onClick={() =>
                                        handleQuantityChange(
                                          item.productID,
                                          item.quantity + 1
                                        )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                  <span>${item.productPrice}</span>
                                </div>
                                <div className="shoppingBagTableMobileItemsDetailTotal">
                                  <MdOutlineClose
                                    size={20}
                                    onClick={() =>
                                      dispatch(removeFromCart(item.productID))
                                    }
                                  />
                                  <p>${item.quantity * item.productPrice}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="shopCartFooter">
                          <div className="shopCartFooterContainer">
                            <form>
                              <input
                                type="text"
                                placeholder="Coupon Code"
                              ></input>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                Apply Coupon
                              </button>
                            </form>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                              className="shopCartFooterbutton"
                            >
                              Update Cart
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="shoppingCartEmpty">
                        <span>Your cart is empty!</span>
                        <Link to="/shop" onClick={scrollToTop}>
                          <button>Mua ngay</button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="shoppingBagTotal">
                  <h3>Tổng số giỏ hàng</h3>
                  <table className="shoppingBagTotalTable">
                    <tbody>
                      <tr>
                        <th>Tổng phụ</th>
                        <td>đ{totalPrice.toFixed(2)}</td>
                      </tr>


                      <tr>
                        <th>Tổng cộng</th>
                        <td>
                          đ{(totalPrice === 0 ? 0 : totalPrice).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    onClick={() => {
                      handleTabClick("cartTab2");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    disabled={cartItems.length === 0}
                  >
                    Tiến hành thanh toán
                  </button>
                </div>
              </div>
            )}

            {/* tab2 */}
            {activeTab === "cartTab2" && (
              <form onSubmit={handleSubmitOrder}>
                <div className="checkoutSection">
                  <div className="checkoutDetailsSection">
                    <h4>Chi tiết thanh toán</h4>
                    <div className="checkoutDetailsForm">
                      <div className="form">
                        <div className="checkoutDetailsFormRow">
                          <input
                            type="text"
                            name="firstName"
                            placeholder="Tên"
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                          {formErrors.firstName && (
                            <p className="error">{formErrors.firstName}</p>
                          )}
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Họ"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                          {formErrors.lastName && (
                            <p className="error">{formErrors.lastName}</p>
                          )}
                        </div>

                        <input
                          type="text"
                          name="address"
                          placeholder="Địa chỉ đường*"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                        {formErrors.address && (
                          <p className="error">{formErrors.address}</p>
                        )}
                        <input
                          type="text"
                          name="city"
                          placeholder="Thành phố / Quận *"
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                        {formErrors.city && (
                          <p className="error">{formErrors.city}</p>
                        )}
                        <input
                          type="text"
                          name="postcode"
                          placeholder="Mã bưu điện / ZIP *"
                          value={formData.postcode}
                          onChange={handleInputChange}
                        />
                        {formErrors.postcode && (
                          <p className="error">{formErrors.postcode}</p>
                        )}
                        <input
                          type="text"
                          name="phone"
                          placeholder="Số điện thoại *"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                        {formErrors.phone && (
                          <p className="error">{formErrors.phone}</p>
                        )}
                        <input
                          type="mail"
                          name="email"
                          placeholder="Email của bạn *"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        {formErrors.email && (
                          <p className="error">{formErrors.email}</p>
                        )}
                        <textarea
                          cols={30}
                          rows={8}
                          name="orderNotes"
                          placeholder="Ghi chú đơn hàng (Tùy chọn)"
                          value={formData.orderNotes}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="checkoutPaymentSection">
                    <div className="checkoutTotalContainer">
                      <h3>Đơn Hàng Của Bạn</h3>
                      <div className="checkoutItems">
                        <table>
                          <thead>
                            <tr>
                              <th>SẢN PHẨM</th>
                              <th>TỔNG CỘNG</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cartItems.map((items) => (
                              <tr>
                                <td>
                                  {items.product.title} x {items.quantity}
                                </td>
                                <td>
                                  {items.product.prices.price ||
                                    items.product.prices.originalPrice * items.quantity}{" "}
                                  đ
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="checkoutTotal">
                        <table>
                          <tbody>
                            <tr>
                              <th>Tổng Tạm Tính</th>
                              <td>
                                {new Intl.NumberFormat("vi-VN").format(totalPrice)}{" "}
                                đ
                              </td>
                            </tr>

                            <tr>
                              <th>Tổng Cộng</th>
                              <td>
                                {totalPrice === 0
                                  ? 0
                                  : new Intl.NumberFormat("vi-VN").format(totalPrice)}{" "}
                                đ
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="checkoutPaymentContainer">
                      <label>
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          defaultChecked
                          onChange={handlePaymentChange}
                        />
                        <div className="checkoutPaymentMethod">
                          <span>Thanh toán khi nhận hàng</span>
                          <p>
                            Bạn có thể thanh toán trực tiếp cho người giao hàng khi nhận sản phẩm. Đây là phương thức thanh toán tiện lợi và dễ dàng, giúp bạn kiểm tra sản phẩm trước khi thanh toán.
                          </p>
                        </div>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="payment"
                          value="momo"
                          onChange={handlePaymentChange}
                        />
                        <div className="checkoutPaymentMethod">
                          <span>Momo</span>
                          <p>
                            Thanh toán qua ví điện tử Momo là phương thức nhanh chóng và an toàn. Bạn chỉ cần sử dụng điện thoại di động để thanh toán mà không cần phải trực tiếp sử dụng tiền mặt.
                          </p>
                        </div>
                      </label>
                      <div className="policyText">
                        Dữ liệu cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, hỗ trợ trải nghiệm của bạn trên
                        website này, và cho các mục đích khác được mô tả trong{" "}
                        <Link to="/terms" onClick={scrollToTop}>
                          Chính Sách Bảo Mật
                        </Link>
                        .
                      </div>
                    </div>
                    <button type="submit">Đặt Hàng</button>
                  </div>
                </div>
              </form>
            )}

            {/* tab3 */}
            {activeTab === "cartTab3" && (
              <div className="orderCompleteSection">
                <div className="orderComplete">
                  <div className="orderCompleteMessage">
                    <div className="orderCompleteMessageImg">
                      <img src={success} alt="" />
                    </div>
                    <h3>Đơn hàng của bạn đã hoàn tất!</h3>
                    <p>Cảm ơn bạn. Đơn hàng của bạn đã được nhận.</p>
                  </div>
                  <div className="orderInfo">
                    <div className="orderInfoItem">
                      <p>ĐƠN HÀNG</p>
                      <h4>{orderNumber}</h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>NGÀY</p>
                      <h4>{formatDate(currentDate)}</h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>PHƯƠNG THỨC THANH TOÁN</p>
                      <h4>{selectedPayment}</h4>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
