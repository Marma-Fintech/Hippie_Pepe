import React from "react";
import introLogo from "../../assets/images/introLogo.png";
import "./introImg.css"; // Make sure this path is correct

const IntroImg = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "red",
      }}
    >
      <img
        src={introLogo}
        className="grow-img"
        style={{ width: "200px" }}
        alt="border"
      />
    </div>
  );
};

export default IntroImg;
