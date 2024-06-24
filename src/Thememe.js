import React from "react";
import Tvborder from "./components/Tvborder";
import "./thememe.css";
import IntroImg from ".//components/introImg/introImg";
import useUserInfo from "../src/Hooks/useUserInfo";
import Playbutton from "../src/components/buttons/Playbutton";
import CenterBox from "../src/components/centerBox/centerBox";
import Play from "../src/assets/images/Path.svg";
import burgerIcon from "../src/assets/images/burgerIcon.svg";
import menuClose from "../src/assets/images/menuClose.png";
import Menu from "../src/Pages/menu/menu";

const Thememe = () => {
  const { userDetails, updateUserInfo } = useUserInfo();
  console.log(JSON.stringify(userDetails) + "lkjhgfdasdfghjk");

  const toogleTv = () => {
    updateUserInfo((prev) => {
      return { ...prev, ...{ isPlay: !userDetails.isPlay } };
    });
  };

  const toogleMenu = () => {
    updateUserInfo((prev) => {
      return {
        ...prev,
        ...{
          isPlay: false,
          currentComponent: userDetails.isMenu ? IntroImg : Menu,
          isMenu: !userDetails.isMenu,
        },
      };
    });
  };

  return (
    <div style={{ height: "100vh", width: "100%", backgroundColor: "black" }}>
      {userDetails.isHeader && (
        <div className="box" style={{ height: "7%", width: "100%" }}></div>
      )}
      <div
        style={{
          height: userDetails.isHeader ? "77%" : "84%",
          width: "100%",
          backgroundColor: "black",
          position: "relative",
          pointerEvents: "none",
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
          <div style={{ width: "70%", height: "45%" }}>
            <Playbutton img={Play} clickFun={toogleTv} />
          </div>
        </div>
        <div
          style={{
            width: "60%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
            }}
          >
            <CenterBox />
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
              height: "45%",
            }}
          >
            <Playbutton
              img={userDetails.isMenu ? menuClose : burgerIcon}
              width="90%"
              clickFun={toogleMenu}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thememe;
