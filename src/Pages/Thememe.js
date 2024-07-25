import React, { useEffect, useState } from "react";
import Tvborder from "../components/Tvborder";
import "./thememe.css";
import IntroImg from "../components/introImg/introImg";
import useUserInfo from "../Hooks/useUserInfo";
import Playbutton from "../components/buttons/Playbutton";
import CenterBox from "../components/centerBox/centerBox";
import Invite from "../assets/images/invite.svg";
import burgerIcon from "../assets/images/burgerIcon.svg";
import menuClose from "../assets/images/menuClose.png";
import Menu from "./menu/menu";
import IntroPage from "./IntroPage/IntroPage";
import UsernamePage from "./Username/Username";
import ProfilePicture from "./ProfilePicture/ProfilePicture";
import ExplainPage from "./ExplainPage/ExplainPage";
import Tv from "./Tv/Tv";
import Header from "./Header/Header";
import axios from "axios";
import InvitePage from "./Invite/Invite";
import bottomShape from "../assets/images/bottomshapemain.png";
import bottomLeft from "../assets/images/RectangleLeft.png";
import bottomRight from "../assets/images/RectangleRight.png";
import bottomcenter from "../assets/images/bottomcenter.png";

const Thememe = () => {
  const { userDetails, updateUserInfo } = useUserInfo();

  const handleShare = async () => {
    console.log("sdfghjkl;");
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join me on this platform!",
          text: "Check out this awesome platform using my referral link.",
          url: "https://t.me/mytestgetDetailsbot?start=34343456724",
        });
        console.log("Shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(
        "https://t.me/mytestgetDetailsbot?start=34343456724"
      );
      alert("Referral link copied to clipboard!");
    }
  };

  // const fetchUserDetails = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://hippie-pepe-be.onrender.com/user-details"
  //       // "http://localhost:3001/user-details"
  //     );
  //     console.log(response.data);
  //     updateUserInfo((prev) => {
  //       return {
  //         ...prev,
  //         ...{
  //           telegramDetails: response.data,
  //         },
  //       };
  //     });
  //   } catch (error) {
  //     console.error("There was an error fetching the user details!", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserDetails();
  // }, []);

  const toogleTv = () => {
    updateUserInfo((prev) => {
      return { ...prev, ...{ isPlay: !userDetails.isPlay } };
    });
  };

  const toogleMenu = () => {
    if (!userDetails.isMenu) {
      updateUserInfo((prev) => {
        return {
          ...prev,
          ...{
            isPlay: false,
            currentComponent: Menu,
            currentComponentText: "MenuPage",
            lastComponent: userDetails.currentComponent,
            lastComponentText: userDetails.currentComponentText,
            isMenu: !userDetails.isMenu,
          },
        };
      });
    } else {
      updateUserInfo((prev) => {
        return {
          ...prev,
          ...{
            isPlay: false,
            currentComponent: userDetails.lastComponent,
            currentComponentText: userDetails.lastComponentText,
            isMenu: !userDetails.isMenu,
          },
        };
      });
    }
  };

  const goToThePage = (component, name) => {
    updateUserInfo((prev) => {
      return {
        ...prev,
        ...{
          currentComponent: component,
          currentComponentText: name,
          lastComponent: userDetails.currentComponent,
          lastComponentText: userDetails.currentComponentText,
        },
      };
    });
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "black",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {userDetails.isHeader && (
        <div className="box" style={{ height: "7%", width: "100%" }}>
          <Header />
        </div>
      )}
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          height: "17%",
          width: "100%",
          bottom: 0,
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", height: "100%" }}>
          <div style={{ position: "absolute", height: "100%" }}>
            <img
              src={bottomShape}
              alt="border"
              style={{ height: "100%", width: "100%" }}
              className="bottomImg"
            />
          </div>
          <div
            className="bottomtab"
            style={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
              width: "100%",
              position: "absolute",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                height: "80%",
                width: "20%",
                position: "relative",
                marginBottom: "10px",
              }}
            >
              <div
                style={{ position: "absolute", height: "100%", width: "100%" }}
                onClick={() => {
                  toogleMenu();
                }}
              >
                <img
                  src={bottomLeft}
                  alt="border"
                  style={{ height: "100%", width: "100%" }}
                  className="bottomImg"
                />
              </div>
            </div>
            <div
              style={{
                height: "100%",
                width: "60%",
                marginBottom: "10px",
              }}
              onClick={() => {
                goToThePage(Tv, "TVPage");
              }}
            >
              <div
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  left: 75,
                  display: "flex",
                  alignItems: "end",
                }}
              >
                <img
                  src={bottomcenter}
                  alt="border"
                  style={{ height: "85%", width: "63%" }}
                  className="bottomImg"
                />
              </div>
            </div>
            <div
              style={{
                height: "80%",
                width: "20%",
                position: "relative",

                marginBottom: "10px",
              }}
            >
              <div
                style={{ position: "absolute", height: "100%", width: "100%" }}
              >
                <img
                  src={bottomRight}
                  alt="border"
                  style={{ height: "100%", width: "100%" }}
                  className="bottomImg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          height: userDetails.isHeader ? "77%" : "86%",
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
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* <div style={{ position: "absolute", top: -10 }}>
          <img
            src={bottomShape}
            alt="border"
            style={{ height: "120%", width: "100%" }}
            className="bottomImg"
          />
        </div> */}
        {/* <div
          style={{
            width: "20%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "80%", height: "50%" }}>
            <Playbutton
              width="50%"
              img={Invite}
              // clickFun={goToThePage(InvitePage, "InvitePage")}
            />
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
              backgroundColor: "rgb(1, 39, 3,1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
            }}
          >
            {userDetails.id ? (
              <CenterBox />
            ) : (
              <div
                onClick={() => {
                  if (userDetails.currentComponentText === "IntroImg") {
                    goToThePage(IntroPage, "IntroPage");
                  }
                  if (userDetails.currentComponentText === "IntroPage") {
                    goToThePage(UsernamePage, "UsernamePage");
                  }
                  if (userDetails.currentComponentText === "UsernamePage") {
                    goToThePage(ProfilePicture, "ProfilePicture");
                  }
                  if (userDetails.currentComponentText === "ProfilePicture") {
                    goToThePage(ExplainPage, "ExplainPage");
                  }
                  if (userDetails.currentComponentText === "ExplainPage") {
                    goToThePage(Tv, "TVPage");
                  }
                }}
                className="homeCenterButton"
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {userDetails.currentComponentText === "IntroImg" ||
                userDetails.currentComponentText === "UsernamePage" ||
                userDetails.currentComponentText === "ProfilePicture"
                  ? "CONTINUE"
                  : ""}
                {userDetails.currentComponentText === "IntroPage"
                  ? "CREATE ACCOUNT"
                  : ""}
                {userDetails.currentComponentText === "ExplainPage"
                  ? "LET'S START"
                  : ""}
              </div>
            )}
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
              width: "80%",
              height: "50%",
            }}
          >
            <Playbutton
              img={userDetails.isMenu ? menuClose : burgerIcon}
              width="90%"
              clickFun={toogleMenu}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Thememe;
