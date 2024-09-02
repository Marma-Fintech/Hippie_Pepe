import React, { useEffect, useState } from "react";
import Carousel from "react-spring-3d-carousel";
import rightArrow from "../../assets/images/right-arrow.svg";
import leftArrow from "../../assets/images/left-arrow.svg";
import useUserInfo from "../../Hooks/useUserInfo";
import Card from "./Card";

const Boosters = () => {
  const [currentSlide, setCurrentSlide] = useState(2);
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();

  const [boosters, setBooster] = useState({
    levelUp: 0,
    tap: 10,
    "2x": 2,
    "3x": 30,
    "5x": 50,
  });

  const [boosterSlides, setBoosterSlides] = useState([]);

  var bossters = { levelUp: 0, tap: 0, "2x": 0, "3x": 0, "5x": 0 };

  useEffect(() => {
    setBooster(bossters);
  }, [watchScreen]);

  useEffect(() => {
    const slides = Object.entries(boosters).map(([key, value], index) => ({
      key: index,
      content: <Card key={index} item={{ key, value }} />,
    }));
    setBoosterSlides(slides);
  }, [boosters]);

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
          style={{ width: "100%", opacity: "1" }}
          slides={boosterSlides}
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
