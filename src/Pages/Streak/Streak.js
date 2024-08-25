import React, { useState } from "react";
import "./Streak.css";
import questionMarkIcon from "../../assets/Task/ReferImg.png";
import StreakBreakPoints from "../StreakBreakPoints/StreakBreakPoints";
import useUserInfo from "../../Hooks/useUserInfo";
import logo from "../../assets/images/meme-logo.svg";
import twitter from "../../assets/images/twitter.svg";
const Streak = () => {
  const [isLoginClaimed, setIsLoginClaimed] = useState(false);
  const [isWatchClaimed, setIsWatchClaimed] = useState(false);
  const [isReferClaimed, setIsReferClaimed] = useState(false);
  const [isGameClaimed, setIsGameClaimed] = useState(false);
  const [isBoostClaimed, setIsBoostClaimed] = useState(false);
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();
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
  const handleLoginClaimClick = () => {
    setIsLoginClaimed(true);
    setTimeout(() => {
      setIsLoginClaimed(false);
    }, 2000);
  };
  const handleWatchClaimClick = () => {
    setIsWatchClaimed(true);
    setTimeout(() => {
      setIsWatchClaimed(false);
    }, 2000);
  };
  const handleReferClaimClick = () => {
    setIsReferClaimed(true);
    setTimeout(() => {
      setIsReferClaimed(false);
    }, 2000);
  };
  const handleGameClaimClick = () => {
    setIsGameClaimed(true);
    setTimeout(() => {
      setIsGameClaimed(false);
    }, 2000);
  };
  const handleBoostClaimClick = () => {
    setIsBoostClaimed(true);
    setTimeout(() => {
      setIsBoostClaimed(false);
    }, 2000);
  };
  return (
    <>
      <div className="info-img scroll">
        <div
          className="menupointer stuff-body"
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            // justifyContent: "center",
            marginTop: "15%",
            flexDirection: "column",
            pointerEvents: "all",
          }}
        >
          <div className="streakContainer">
            <h1 className="streaktext">STREAK</h1>
            <img
              onMouseEnter={() => {
                goToThePage(StreakBreakPoints, "streakBreakPoints");
              }}
              src={questionMarkIcon}
              alt="Question Mark Icon"
              className="questionMarkIcon"
            />
          </div>
          <div class="container-fluid">
            <div class="scrolling-wrapper row flex-row flex-nowrap">
              <div class="col-4">
                <div class="card card-block card-1">DAY 1</div>
              </div>
              <div class="col-4">
                <div class="card card-block card-2">DAY 2</div>
              </div>
              <div class="col-4">
                <div class="card card-block card-3">DAY 3</div>
              </div>
              <div class="col-4">
                <div class="card card-block card-4">DAY 4</div>
              </div>
              <div class="col-4">
                <div class="card card-block card-5">DAY 5</div>
              </div>
              <div class="col-4">
                <div class="card card-block card-6">DAY 6</div>
              </div>
              <div class="col-4">
                <div class="card card-block card-7">DAY 7</div>
              </div>
            </div>
          </div>
          <div className="row mt10 cheap-stuff" style={{ width: "100%" }}>
            <div className="col-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a32d4767f07e35eed25cbb58c62b6e3e02828c9e572ce8ea3b6670916cbe8671?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                alt="Login streak icon"
                className="image"
              />
            </div>
            <div className="col-7 stuff-text">
              <h4>Login Streak</h4>
              <p className="stuff-p">
                <img src={logo} /> +1,000{" "}
              </p>
            </div>
            <div className="col-3">
              <button
                className={`stuff-claim ${isLoginClaimed ? "claimed" : ""}`}
                onClick={handleLoginClaimClick}
                style={{ cursor: "pointer" }}
                disabled={isLoginClaimed}
              >
                {isLoginClaimed ? "CLAIMED" : "CLAIM "}
              </button>
            </div>
          </div>
          <div className="row mt10 cheap-stuff" style={{ width: "100%" }}>
            <div className="col-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b5a03a049db265cb188f96311f2011c0d512a033e5d53ad816443dd4ad0eec1?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                alt="Watch Streak Icon"
                className="image"
              />
            </div>
            <div className="col-7 stuff-text">
              <h4>Watch Streak</h4>
              <p className="stuff-p">
                <img src={logo} /> +1,000{" "}
              </p>
            </div>
            <div className="col-3">
              <button
                className={`stuff-claim ${isWatchClaimed ? "claimed" : ""}`}
                onClick={handleWatchClaimClick}
                style={{ cursor: "pointer" }}
                disabled={isLoginClaimed}
              >
                {isWatchClaimed ? "CLAIMED" : "CLAIM"}
              </button>
            </div>
          </div>
          <div className="row mt10 cheap-stuff" style={{ width: "100%" }}>
            <div className="col-2">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0eb953a6da27d088a419ecf530736727ca1f124475b9460d890398ef1438fc31?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                className="image"
                alt=""
              />
            </div>
            <div className="col-7 stuff-text">
              <h4>Refer streak</h4>
              <p className="stuff-p">
                <img src={logo} /> +1,000{" "}
              </p>
            </div>
            <div className="col-3">
              <button
                className={`stuff-claim ${isReferClaimed ? "claimed" : ""}`}
                onClick={handleReferClaimClick}
                style={{ cursor: "pointer" }}
                disabled={isReferClaimed}
              >
                {isReferClaimed ? "CLAIMED" : "CLAIM"}
              </button>
            </div>
          </div>
          <div className="row mt10 cheap-stuff" style={{ width: "100%" }}>
            <div className="col-2">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d91855f4c21d7155a4b865bac0a53627ec417e8c7b74d7d40f533e5b8e895a3?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                points="1,000"
                altText="Game icon"
                className="image"
                alt=""
              />
            </div>
            <div className="col-7 stuff-text">
              <h4>Game Streak</h4>
              <p className="stuff-p">
                <img src={logo} /> +1,000{" "}
              </p>
            </div>
            <div className="col-3">
              <button
                className={`stuff-claim ${isGameClaimed ? "claimed" : ""}`}
                onClick={handleGameClaimClick}
                style={{ cursor: "pointer" }}
                disabled={isGameClaimed}
              >
                {isGameClaimed ? "CLAIMED" : "CLAIM"}
              </button>
            </div>
          </div>
          <div className="row mt10 cheap-stuff" style={{ width: "100%" }}>
            <div className="col-2">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0eb953a6da27d088a419ecf530736727ca1f124475b9460d890398ef1438fc31?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                className="image"
                alt=""
              />
            </div>
            <div className="col-7 stuff-text">
              <h4>Boost Streak</h4>
              <p className="stuff-p">
                <img src={logo} /> +1,000{" "}
              </p>
            </div>
            <div className="col-3">
              <button
                className={`stuff-claim ${isBoostClaimed ? "claimed" : ""}`}
                onClick={handleBoostClaimClick}
                style={{ cursor: "pointer" }}
                disabled={isBoostClaimed}
              >
                {isBoostClaimed ? "CLAIMED" : "CLAIM"}
              </button>
            </div>
          </div>
          <div class="invite-fri">
            <h2>STREAK OF STEAK</h2>
          </div>
        </div>
      </div>
    </>
  );
};
export default Streak;
