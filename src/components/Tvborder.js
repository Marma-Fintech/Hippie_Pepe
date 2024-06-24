import React from "react";
import border from "../assets/images/Frame 21.png";

function Tvborder() {
  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      {/* <div
        style={{
          position: "absolute",
          height: "90px",
          width: "100%",
        }}
      >
      </div> */}

      <img
        src={border}
        alt="border"
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}

export default Tvborder;
