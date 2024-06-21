import React from "react";
import Tvborder from "./components/Tvborder";
import "./thememe.css";
import IntroImg from ".//components/introImg/introImg";
import useUserInfo from "../src/Hooks/useUserInfo";
import Playbutton from "../src/components/buttons/Playbutton";
import CenterBox from "../src/components/centerBox/centerBox";
import Play from "../src/assets/images/Path.svg";

const Thememe = () => {
  const { userDetails } = useUserInfo();
  console.log(JSON.stringify(userDetails) + "lkjhgfdasdfghjk");
  return (
    <div style={{ height: "100vh", width: "100%", backgroundColor: "black" }}>
      {/* {userDetails.isHeader && ( */}
      <div className="box" style={{ height: "7%", width: "100%" }}></div>
      {/* )} */}
      <div
        style={{
          height: "77%",
          width: "100%",
          backgroundColor: "black",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <IntroImg /> */}
          {userDetails.currentComponent && <userDetails.currentComponent />}
        </div>
        <Tvborder />
      </div>
      <div
        className="box"
        style={{
          height: "16%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            width: "20%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "70%", height: "50%" }}>
            <Playbutton img={Play} />
          </div>
        </div>
        <div
          style={{
            width: "60%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // paddingTop: 5,
            // paddingBottom: 5,
            // borderWidth: 2,
            // borderColor: "red",
          }}
        >
          <div
            className="centerBox"
            style={{
              height: "70%",
              width: "100%",
              backgroundColor: "rgba(3, 72, 7, 1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
              // paddingRight: 5,
            }}
          >
            <CenterBox />
            {/* <Playbutton /> */}
          </div>
        </div>
        <div
          style={{
            width: "20%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "70%",
              height: "50%",
            }}
          >
            <Playbutton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thememe;
