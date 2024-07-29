import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Carousel from "react-spring-3d-carousel";
import boost2 from "../../assets/images/2xboost.png";
import boost3 from "../../assets/images/3xboost.png";
import boost5 from "../../assets/images/5xboost.png";
import rightArrow from "../../assets/images/rightarrow.png";
import leftArrow from "../../assets/images/leftArrow.png";
const Boosters = () => {
  const [currentSlide, setCurrentSlide] = useState(2);
  const slides = [
    {
      key: 1,
      content: <img src={boost2} alt="1" style={{ opacity: 1 }} />,
    },
    {
      key: 2,
      content: <img src={boost3} alt="2" style={{ opacity: 1 }} />,
    },
    {
      key: 3,
      content: <img src={boost5} alt="3" style={{ opacity: 1 }} />,
    },
  ];

  return (
    <div
      className="menupointer"
      style={{
        height: "50%",
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "row",
      }}
      onClick={() => {
        console.log("click");
      }}
    >
      <div
        style={{
          width: "25%",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => {
          setCurrentSlide(currentSlide - 1);
        }}
      >
        <img src={leftArrow} style={{ width: "25%" }} />
      </div>
      <div
        style={{
          width: "50%",
          color: "white",
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <Carousel
          style={{ width: "100%" }}
          slides={slides}
          // offset={500}
          opacity={1}
          goToSlide={currentSlide}
        />
      </div>

      <div
        style={{
          width: "25%",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => {
          setCurrentSlide(currentSlide + 1);
        }}
      >
        <img src={rightArrow} style={{ width: "25%" }} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
          position: "absolute",
        }}
      ></div>
    </div>
  );
};

export default Boosters;
