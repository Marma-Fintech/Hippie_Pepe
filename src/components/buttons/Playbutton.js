import React from "react";
import "./button.css";

const Playbutton = (props) => {
  return (
    <div
      className="play-box"
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img style={{ width: "30%", objectFit: "cover" }} src={props?.img} />
    </div>
  );
};

export default Playbutton;
