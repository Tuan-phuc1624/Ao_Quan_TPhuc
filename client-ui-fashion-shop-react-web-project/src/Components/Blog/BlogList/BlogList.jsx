import React from "react";

import "./BlogList.css";

import BlogData from "../../../Data/BlogData";
import { Link } from "react-router-dom";

const BlogList = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="blogListSection">
        <div className="blogListHeaderContainer">
          <div className="blogListHeader">
            <h2>Blog</h2>
            <div className="blogListHeaderCategories">
              <p>TẤT CẢ</p>
              <p>CÔNG TY</p>
              <p className="activeCategory">THỜI TRANG</p>
              <p>PHONG CÁCH</p>
              <p>XU HƯỚNG</p>
              <p>LÀM ĐẸP</p>
            </div>
          </div>
        </div>
        <div className="blogPostListContainer">
          {BlogData.map((blogPost) => (
              <div className="blogPost">
                <div className="blogPostThumb">
                  <img src={blogPost.blogThumbnail} alt="blogPost"/>
                </div>
                <div className="blogPostContent">
                  <div className="blogPostContentDate">
                    <p>bởi Kenny</p>
                    <p>{blogPost.blogDate}</p>
                  </div>
                  <div className="blogPostContentHeading">
                    <Link to="/BlogDetails" onClick={scrollToTop}>
                      {blogPost.blogHeading}
                    </Link>
                  </div>
                  <div className="blogPostContentDescription">
                    <p>
                      Giữa buổi sáng, một điều vĩ đại đã đến, và những gì xanh tươi đã nói là tốt. Những vì sao mở ra,
                      ngày lại đến, mọi thứ đã tụ tập lại, cỏ xanh mặt đất dưới ánh sáng.
                    </p>
                  </div>
                  <div className="blogPostContentReadMore">
                    <Link to="/BlogDetails" onClick={scrollToTop}>
                      Tiếp tục đọc
                    </Link>
                  </div>
                </div>
              </div>
          ))}
        </div>
        <p className="blogListShowMore" onClick={scrollToTop}>
          Xem thêm
        </p>
      </div>
    </>
  );
};

export default BlogList;
