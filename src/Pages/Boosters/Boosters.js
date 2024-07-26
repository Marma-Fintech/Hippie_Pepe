import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Carousel from "react-spring-3d-carousel";
import boost2 from "../../assets/images/2xboost.png";
import boost3 from "../../assets/images/3xboost.png";
import boost5 from "../../assets/images/5xboost.png";

const Boosters = () => {
  const [currentSlide, setCurrentSlide] = useState(2);
  const slides = [
    {
      key: 1,
      content: <img src={boost2} alt="1" />,
    },
    {
      key: 2,
      content: <img src={boost3} alt="2" />,
    },
    {
      key: 3,
      content: <img src={boost5} alt="3" />,
    },
  ];

  return (
    <div
      className="menupointer"
      style={{ height: "50%", width: "50%", position: "relative" }}
      onClick={() => {
        console.log("click");
      }}
    >
      <Carousel slides={slides} goToSlide={currentSlide} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
          position: "absolute",
          backgroundColor: "red",
        }}
      >
        <div
          style={{ color: "white" }}
          onClick={() => {
            setCurrentSlide(currentSlide - 1);
          }}
        >
          Left
        </div>
        <div
          style={{ color: "white" }}
          onClick={() => {
            setCurrentSlide(currentSlide + 1);
          }}
        >
          right
        </div>
      </div>
    </div>
  );
};

export default Boosters;
