import React from "react";
import "./menu.css";
import useUserInfo from "../../Hooks/useUserInfo";
import AboutPage from "../About/about";
import Social from "../Social/Social";
import Token from "../Token/Token";
import Roadmap from "../Roadmap/Roadmap";

const Menu = () => {
  const { userDetails, updateUserInfo } = useUserInfo();

  const goToThePage = (component, name) => {
    updateUserInfo((prev) => {
      return {
        ...prev,
        ...{
          currentComponent: component,
          currentComponentText: name,
          lastComponent: userDetails.currentComponent,
          lastComponentText: userDetails.currentComponentText,
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
            goToThePage(AboutPage, "AboutPage");
          }}
        >
          <p className="textColor">About</p>
        </div>
        <div
          className="menuButton"
          style={{
            padding: "6%",
          }}
          onClick={() => {
            goToThePage(Roadmap, "RoadmapPage");
          }}
        >
          <p className="textColor">Road Map</p>
        </div>
        <div
          className="menuButton"
          style={{
            padding: "6%",
          }}
          onClick={() => {
            goToThePage(Token, "TokenPage");
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
            goToThePage(Social, "SocialPage");
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
