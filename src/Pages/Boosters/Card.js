import Styles from "./Card.module.css";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import Button from "./Button";
import levelupBoostImg from "../../assets/images/levelupImg.png";
import tapBoostImg from "../../assets/images/tapboostimg.png";
import twoxboost from "../../assets/images/2xboostimg.png";
import threexboost from "../../assets/images/3xturboimg.png";
import fivexboost from "../../assets/images/5xboostimg.png";
import useUserInfo from "../../Hooks/useUserInfo";

function Card(props) {
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();

  const { value, key } = props.item;

  const images = {
    levelUp: levelupBoostImg,
    tap: tapBoostImg,
    "2x": twoxboost,
    "3x": threexboost,
    "5x": fivexboost,
  };

  const boosterSelected = () => {
    updatewatchScreenInfo((prev) => {
      return {
        ...prev,
        ...{
          booster: true,
          boosterDetails: {
            name: key,
          },
        },
      };
    });
  };

  return (
    <div
      style={{ height: "100%", width: "100%", position: "relative" }}
      onClick={() => {
        if (value !== 0) {
          boosterSelected();
          console.log(value);
        }
      }}
    >
      <div
        className="boostNumber"
        style={{ position: "absolute", top: -2, left: "42%", fontSize: 9 }}
      >
        {value}
      </div>
      <img src={images[key]} />
    </div>
  );
}

export default Card;
