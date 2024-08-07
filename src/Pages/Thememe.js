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

import user, { UserDeatils } from "../apis/user";
import { addWatchSeconds } from "../apis/user";

const Thememe = () => {
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();

  const [current, Setcurrent] = useState("");

  const latestUserDetails = useRef(userDetails);
  const latestWatchScreen = useRef(watchScreen);

  useEffect(() => {
    latestUserDetails.current = userDetails;
    latestWatchScreen.current = watchScreen;
    Setcurrent(userDetails.currentComponentText);
    // console.log(JSON.stringify(userDetails.currentComponentText) + "uuuuuu");
  }, [userDetails, watchScreen]);

  // useEffect(() => {
  //   console.log(
  //     JSON.stringify(window.Telegram.WebApp.isConfirmationNeededOnClose)
  //   );
  //   console.log("Prompting user before close");

  //   // Show the confirmation prompt
  //   // window.Telegram.WebApp.closeConfirm(true);
  //   window.Telegram.WebApp.onEvent("web_app_close_confirm", (result) => {
  //     if (result) {
  //       console.log("User confirmed to close");
  //       const data = {
  //         name: userDetails.userDetails.name,
  //         telegramId: String(userDetails.userDetails?.telegramId),
  //       };
  //       console.log("Data to send on close:", data);
  //       getUserDetails(data);
  //       // Now close the web app
  //       window.Telegram.WebApp.close();
  //     } else {
  //       console.log("User cancelled the close action");
  //       window.Telegram.WebApp.closeConfirm(false); // Prevent the web app from closing
  //     }
  //   });

  //   return () => {
  //     if (window.Telegram && window.Telegram.WebApp) {
  //       console.log("Removing event listener for web_app_before_close_confirm");
  //       window.Telegram.WebApp.offEvent(
  //         "web_app_before_close_confirm",
  //         handleBeforeCloseConfirm
  //       );
  //     }
  //   };
  // }, []);

  useEffect(() => {
    window.Telegram.WebApp.ready();

    const userData = window.Telegram.WebApp.initDataUnsafe.user;

    if (userData) {
      console.log(JSON.stringify(userData) + "useruserdatadata");
      const data = {
        name: userData?.first_name,
        telegramId: String(userData?.id),
      };
      getUserDetails(data);

      updateUserInfo((prev) => ({
        ...prev,
        telegramDetails: userData,
      }));

      const urlParams = new URLSearchParams(window.location.search);
      const referredIdFromUrl = urlParams.get("start");
    }
  }, []);

  const getUserDetails = async (data) => {
    const userDetails = await UserDeatils(data);

    updateUserInfo((prev) => ({
      ...prev,
      userDetails: userDetails,
    }));

    updatewatchScreenInfo((prev) => ({
      ...prev,
      boostersList: userDetails?.boosters,
      totalReward: userDetails?.totalRewards,
    }));
  };

  const goToTheRefererPage = (component, name) => {
    updateUserInfo((prev) => ({
      ...prev,
      currentComponent: component,
      currentComponentText: name,
      lastComponent: latestUserDetails.current.currentComponent,
      lastComponentText: latestUserDetails.current.currentComponentText,
      refererCount: latestUserDetails.current.refererCount + 1,
    }));
  };

  const toogleMenu = () => {
    // console.log("kjhgf");
    // if (!latestUserDetails.current.isMenu) {
    updateUserInfo((prev) => ({
      ...prev,
      isPlay: false,
      currentComponent: Menu,
      currentComponentText: "MenuPage",
      lastComponent: latestUserDetails.current.currentComponent,
      lastComponentText: latestUserDetails.current.currentComponentText,
      isMenu: !latestUserDetails.current.isMenu,
      menuCount: latestUserDetails.current.menuCount + 1,
    }));
    // } else {
    //   updateUserInfo((prev) => ({
    //     ...prev,
    //     isPlay: false,
    //     currentComponent: latestUserDetails.current.lastComponent,
    //     currentComponentText: latestUserDetails.current.lastComponentText,
    //     isMenu: !latestUserDetails.current.isMenu,
    //     menuCount: latestUserDetails.current.menuCount + 1,
    //   }));
    // }
  };

  const goToThePage = (component, name) => {
    updateUserInfo((prev) => ({
      ...prev,
      currentComponent: component,
      currentComponentText: name,
      lastComponent: latestUserDetails.current.currentComponent,
      lastComponentText: latestUserDetails.current.currentComponentText,
      centerCount: latestUserDetails.current.centerCount + 1,
    }));
  };

  const audioRef = useRef(null);

  useEffect(() => {
    if (
      latestUserDetails.current.centerCount === 3 &&
      latestUserDetails.current.menuCount === 2 &&
      latestUserDetails.current.refererCount === 5
    ) {
      audioRef.current.play();
    }
  }, [userDetails]);

  const boostIntervalRef = useRef(null);
  const boostref = useRef(false);

  useEffect(() => {
    // console.log(JSON.stringify(latestWatchScreen.current));

    if (
      latestWatchScreen.current.booster &&
      latestWatchScreen.current.boosterSec > 0
    ) {
      boosterInterval();
    }
  }, [watchScreen]);

  const boosterInterval = () => {
    if (!boostref.current) {
      boostref.current = true;
      boostIntervalRef.current = setInterval(() => {
        // console.log(JSON.stringify(watchScreen) + "intervel");
        updatewatchScreenInfo((prev) => {
          const newBoosterSec = Math.max(prev.boosterSec - 1, 0);

          if (newBoosterSec === 0) {
            addWatchSec();
            clearInterval(boostIntervalRef.current);
            boostref.current = false;
          }

          return {
            ...prev,
            boosterSec: newBoosterSec,
          };
        });
      }, 1000);
    }
  };

  const addWatchSecapi = async (data) => {
    const res = await addWatchSeconds(data);
    // console.log(JSON.stringify(res));
    updatewatchScreenInfo((prev) => ({
      ...prev,
      tapPoints: 0,
      booster: false,
      boosterSec: 0,
      boosterPoints: 0,
      // boostersList: [],
      boosterDetails: {},
      watchSec: 0,
    }));
    const data1 = {
      name: userDetails.userDetails.name,
      telegramId: String(userDetails.userDetails?.telegramId),
    };
    getUserDetails(data1);
  };

  const addWatchSec = () => {
    if (latestUserDetails.current.currentComponentText !== "TVPage") {
      // console.log(JSON.stringify(latestWatchScreen.current));
      var data = {};
      if (watchScreen.booster) {
        data = {
          telegramId: userDetails.userDetails.telegramId,
          userWatchSeconds: latestWatchScreen.current.watchSec,
          boosterPoints: String(
            latestWatchScreen.current.boosterPoints +
              latestWatchScreen.current.tapPoints
          ),
          boosters: [latestWatchScreen.current.boosterDetails.name],
        };
      } else {
        data = {
          telegramId: userDetails.userDetails.telegramId,
          userWatchSeconds: latestWatchScreen.current.watchSec,
          boosterPoints: String(latestWatchScreen.current.tapPoints),
          // boosters: [boosterRef.current],
        };
      }

      addWatchSecapi(data);
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
      {latestUserDetails.current.isHeader && (
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
                onClick={toogleMenu}
              >
                <img
                  src={bottomLeft}
                  alt="border"
                  style={{ height: "100%", width: "100%" }}
                  className="bottomImg"
                />
              </div>
              <div
                onClick={toogleMenu}
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
              onClick={() => goToThePage(Tv, "TVPage")}
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
              onClick={() => goToTheRefererPage(ReferPage, "ReferPage")}
            >
              <div
                style={{ position: "absolute", height: "100%", width: "100%" }}
                onClick={() => goToTheRefererPage(ReferPage, "ReferPage")}
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
