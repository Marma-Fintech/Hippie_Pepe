import React, { useEffect, useState, useRef } from "react";
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
import greenLineBottom from "../assets/images/greenLinebottom.png";
import boosterText from "../assets/images/boostText.png";
import menuIcon from "../assets/images/menuIcon.png";
import referIcon from "../assets/images/referIcon.png";
import porotta from "../assets/audio/videoplayback.m4a";

import ReferPage from "./ReferPage/ReferPage";
import Boosters from "../Pages/Boosters/Boosters";
import ContinueText from "../assets/images/ContinueText.png";

import { UserDeatils } from "../apis/user";

const Thememe = () => {
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();

  useEffect(() => {
    // Initialize the Telegram WebApp
    window.Telegram.WebApp.ready();

    // Fetch user details
    const userData = window.Telegram.WebApp.initDataUnsafe.user;

    if (userData) {
      updateUserInfo((prev) => {
        return {
          ...prev,
          ...{
            telegramDetails: userData,
          },
        };
      });

      const urlParams = new URLSearchParams(window.location.search);
      const referredIdFromUrl = urlParams.get("start");

      console.log(referredIdFromUrl + " referredIdFromUrl  ");
      console.log("User data  available." + JSON.stringify(userData));
    } else {
      console.log("User data not available.");
    }
    const data = {
      name: "kathikeyan",
      // refferedById: referredIdFromUrl ? referredIdFromUrl : null,
      telegramId: "123455667",
    };
    getUserDetails(data);

    console.log(watchScreen);
  }, []);

  const getUserDetails = async (data) => {
    const userDetails = await UserDeatils(data);
    updateUserInfo((prev) => {
      return {
        ...prev,
        ...{
          userDetails: userDetails,
        },
      };
    });
  };

  const goToTheRefererPage = (component, name) => {
    updateUserInfo((prev) => {
      return {
        ...prev,
        ...{
          currentComponent: component,
          currentComponentText: name,
          lastComponent: userDetails.currentComponent,
          lastComponentText: userDetails.currentComponentText,
          refererCount: userDetails.refererCount + 1,
        },
      };
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
            menuCount: userDetails.menuCount + 1,
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
            menuCount: userDetails.menuCount + 1,
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
          centerCount: userDetails.centerCount + 1,
        },
      };
    });
  };

  const audioRef = useRef(null);

  useEffect(() => {
    console.log(JSON.stringify(userDetails));
    if (
      userDetails.centerCount === 3 &&
      userDetails.menuCount === 2 &&
      userDetails.refererCount === 5
    ) {
      console.log("JSON.stringify(userDetails)");

      audioRef.current.play();
    }
  }, [userDetails]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "black",
        position: "fixed",
        overflow: "hidden",
      }}
    >
      <audio ref={audioRef}>
        <source src={porotta} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {userDetails.isHeader && (
        <div className="box" style={{ height: "7%", width: "100%" }}>
          <Header />
        </div>
      )}
      <div
        style={{
          position: "fixed",
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
              <div
                onClick={() => {
                  toogleMenu();
                }}
                style={{
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  // top: 29,
                  // left: 18,
                }}
              >
                <img
                  src={menuIcon}
                  alt="border"
                  style={{ width: "40%" }}
                  className="bottomImg"
                />
              </div>
            </div>
            <div
              style={{
                height: "100%",
                width: "60%",
                marginBottom: "10px",
                position: "relative",
                // backgroundColor: "red",
              }}
              onClick={() => {
                goToThePage(Tv, "TVPage");
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -9,
                  height: "100%",
                  width: "175%",
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
              <div
                style={{
                  position: "absolute",
                  left: -9,
                  height: "100%",
                  width: "175%",
                  display: "flex",
                  alignItems: "end",
                }}
              >
                {userDetails.currentComponentText === "TVPage" ? (
                  <div
                    style={{
                      position: "relative",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 29,
                        height: "100%",
                        width: "45%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 11,
                          color: "rgba(0, 255, 41, 1)",
                          fontSize: "12px",
                          display: "flex",
                          alignItems: "end",
                          justifyContent: "center",
                        }}
                      >
                        BOOSTERS
                      </div>
                      <img
                        src={boosterText}
                        alt="border"
                        style={{
                          height: "32%",
                          width: "70%",
                          padding: "10px",
                        }}
                        className="bottomImg"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <img
                  src={greenLineBottom}
                  alt="border"
                  style={{
                    height: "85%",
                    width: "63%",
                    padding: "10px",
                    position: "absolute",
                  }}
                  className="bottomImg"
                />
              </div>
              {userDetails.currentComponentText === "TVPage" ? (
                <div
                  style={{
                    position: "relative",
                    left: 0,
                    top: 10,
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Boosters />
                </div>
              ) : null}

              {userDetails.currentComponentText === "IntroImg" ? (
                <div
                  style={{
                    position: "relative",
                    left: 0,
                    top: 10,
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <div style={{ color: "rgba(9, 189, 27, 1)" }}>Continue</div> */}
                  <div>
                    <img src={ContinueText} style={{ width: "100%" }} />
                  </div>
                </div>
              ) : null}
            </div>
            <div
              style={{
                height: "80%",
                width: "20%",
                position: "relative",

                marginBottom: "10px",
              }}
              onClick={() => {
                goToTheRefererPage(ReferPage, "ReferPage");
              }}
            >
              <div
                style={{ position: "absolute", height: "100%", width: "100%" }}
                onClick={() => {
                  goToTheRefererPage(ReferPage, "ReferPage");
                }}
              >
                <img
                  src={bottomRight}
                  alt="border"
                  style={{ height: "100%", width: "100%" }}
                  className="bottomImg"
                />
              </div>

              <div
                style={{
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={referIcon}
                  alt="border"
                  style={{ width: "50%", objectFit: "contain" }}
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
      {/* <div
        className="box"
        style={{
          height: "16%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
          position: "relative",
        }}
      > */}
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
      {/* </div> */}
    </div>
  );
};

export default Thememe;
