import React from "react";
import "./menu.css";
import useUserInfo from "../../Hooks/useUserInfo";
import About from "../About/about";
import Social from "../Social/Social";

const Menu = () => {
  const { userDetails, updateUserInfo } = useUserInfo();

  const gotoAbout = () => {
    updateUserInfo((prev) => {
      return {
        ...prev,
        ...{
          currentComponent: About,
          isMenu: !userDetails.isMenu,
        },
      };
    });
  };

  const gotoSocial = () => {
    updateUserInfo((prev) => {
      return {
        ...prev,
        ...{
          currentComponent: Social,
          isMenu: !userDetails.isMenu,
        },
      };
    });
  };

  return (
    <div
      className="menupointer"
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        pointerEvents: "all",
      }}
    >
      <div
        style={{
          height: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          className="menuButton"
          style={{
            padding: "6%",
          }}
          onClick={() => {
            gotoAbout();
          }}
        >
          <p className="textColor">About</p>
        </div>
        <div
          className="menuButton"
          style={{
            padding: "6%",
          }}
        >
          <p className="textColor">Road Map</p>
        </div>
        <div
          className="menuButton"
          style={{
            padding: "6%",
          }}
        >
          <p className="textColor">Token</p>
        </div>
        <div
          className="menuButton"
          style={{
            padding: "6%",
          }}
          onClick={() => {
            gotoSocial();
          }}
        >
          <p className="textColor">Social</p>
        </div>
        <div
          onClick={() => {
            console.log("hiii");
          }}
          className="menuButton"
          style={{
            paddingTop: "6%",
            paddingBottom: "6%",
          }}
        >
          <p className="textColor">Refer & Earn</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
