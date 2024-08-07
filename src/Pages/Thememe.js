import React, { useEffect, useState, useRef } from "react";
import Tvborder from "../components/Tvborder";
import "./thememe.css";
import useUserInfo from "../Hooks/useUserInfo";
import Menu from "./menu/menu";
import Tv from "./Tv/Tv";
import Header from "./Header/Header";
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
import switchOnTv from "../assets/images/switchOnTv.png";

import { UserDeatils } from "../apis/user";

const Thememe = () => {
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();

  useEffect(() => {
    const handleUnload = () => {
      const data = {
        name: "userData.first_name",
        telegramId: "1234567",
      };
      getUserDetails(data);
    };

    // window.addEventListener("beforeunload", handleUnload);
    window.Telegram.WebApp.onEvent("web_app_close", handleUnload);

    return () => {
      // window.removeEventListener("beforeunload", handleUnload);
      window.Telegram.WebApp.offEvent("web_app_close", handleUnload);
    };
  }, []);

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
    } else {
    }

    const data = {
      name: "userData.first_nam",

      telegramId: "Strigkkj",
    };
    getUserDetails(data);
  }, []);

  const getUserDetails = async (data) => {
    const userDetails = await UserDeatils(data);
    // console.log(JSON.stringify(userDetails) + " referredIdFromUrl  ");
    // console.log(JSON.stringify(watchScreen) + " referredIdFromUrl  ");

    updateUserInfo((prev) => {
      return {
        ...prev,
        ...{
          userDetails: userDetails,
        },
      };
    });

    updatewatchScreenInfo((prev) => {
      return {
        ...prev,
        ...{
          boostersList: userDetails?.boosters,
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
    if (
      userDetails.centerCount === 3 &&
      userDetails.menuCount === 2 &&
      userDetails.refererCount === 5
    ) {
      audioRef.current.play();
    }
  }, [userDetails]);

  const isInterval = useRef(false);
  const boostIntervalRef = useRef(null);
  const boostref = useRef(false);
  const [boosterSec, setBoosterSec] = useState(0);

  useEffect(() => {
    console.log(JSON.stringify(watchScreen) + "kjhgfddfghjklkjhg");
    if (watchScreen.booster && watchScreen.boosterSec > 0) {
      console.log("rrrrrr");
      boosterInterval();
    }
  }, [watchScreen]);

  const boosterInterval = () => {
    if (!boostref.current) {
      boostref.current = true;
      boostIntervalRef.current = setInterval(() => {
        updatewatchScreenInfo((prev) => {
          // Ensure `boosterSec` does not go below 0
          const newBoosterSec = Math.max(prev.boosterSec - 1, 0);

          if (newBoosterSec === 0) {
            clearInterval(boostIntervalRef.current);
            boostref.current = false;
            updatewatchScreenInfo((prev) => {
              return {
                ...prev,
                ...{
                  booster: false,
                  boosterDetails: {},
                },
              };
            });
          }

          return {
            ...prev,
            boosterSec: newBoosterSec,
          };
        });
      }, 1000);
    }
  };

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
                  width: "100%",
                  position: "absolute",
                  top: 35,
                  left: 14,
                }}
              >
                <img
                  src={menuIcon}
                  alt="border"
                  style={{ width: "50%" }}
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

              {userDetails.currentComponentText !== "TVPage" &&
              userDetails.currentComponentText !== "IntroImg" ? (
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={switchOnTv} style={{ width: "80%" }} />
                  </div>
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
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
    </div>
  );
};

export default Thememe;
