import Styles from "./Card.module.css";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import Button from "./Button";
import levelupBoostImg from "../../assets/images/levelupImg.png";
import tapBoostImg from "../../assets/images/tapboostimg.png";
import twoxboost from "../../assets/images/2xboostimg.png";
import threexboost from "../../assets/images/3xturboimg.png";
import fivexboost from "../../assets/images/5xboostimg.png";

function Card() {
  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <div
        className="boostNumber"
        style={{ position: "absolute", top: -2, left: "42%", fontSize: 10 }}
      >
        5
      </div>
      <img src={levelupBoostImg} />
    </div>
  );
}

export default Card;
