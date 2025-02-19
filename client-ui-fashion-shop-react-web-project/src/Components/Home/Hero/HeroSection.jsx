import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import "./HeroSection.css";
import { Model } from "../../Model/Model";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [tshirtColor, setTshirtColor] = useState("red");

  const changeColor = (color) => {
    setTshirtColor(color);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="heroMain">
        <div className="sectionleft">
          <p>Xu hướng mới</p>
          <h1>Chương Trình Giảm Giá Mùa ĐÔNG</h1>
          <span>Ưu đãi có hạn - Giảm đến 60% và miễn phí vận chuyển</span>
          <div className="heroLink">
            <Link to="/shop" onClick={scrollToTop}>
              <h5>Khám Phá Thêm</h5>
            </Link>
          </div>
        </div>
        <div className="sectionright">
          <Canvas
              className="canvasModel"
              camera={{position: [0, 5, 15], fov: 50}}
          >
            <ambientLight intensity={0.5}/>
            <directionalLight
              position={[10, 10, 5]}
              intensity={2.5}
              color={"white"}
            />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minAzimuthAngle={-Infinity}
              maxAzimuthAngle={Infinity}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />

            <Model color={tshirtColor} />
          </Canvas>
          <div className="heroColorBtn">
            <button
              onClick={() => changeColor("#353933")}
              style={{ backgroundColor: "#353933" }}
            ></button>
            <button
              onClick={() => changeColor("#EFBD4E")}
              style={{ backgroundColor: "#EFBD4E" }}
            ></button>
            <button
              onClick={() => changeColor("#726DE7")}
              style={{ backgroundColor: "#726DE7" }}
            ></button>
            <button
              onClick={() => changeColor("red")}
              style={{ backgroundColor: "red" }}
            ></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
