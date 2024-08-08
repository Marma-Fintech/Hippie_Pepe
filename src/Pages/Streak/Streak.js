import React, { useState } from "react";
import "./Streak.css";
import questionMarkIcon from "../../assets/Task/ReferImg.png";
import StreakBreakPoints from "../StreakBreakPoints/StreakBreakPoints";
import useUserInfo from "../../Hooks/useUserInfo";
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
    <div className="tv-body1">
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
      <div>
        <div className="margintop">
          <div>
            <div className="cardContainer">
              <div className="cardContent">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a32d4767f07e35eed25cbb58c62b6e3e02828c9e572ce8ea3b6670916cbe8671?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                  alt="Login streak icon"
                  className="image"
                />
                <div className="referInfo">
                  <div className="referStreak">Login Streak</div>
                  <div className="pointContainer">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/7bfc2fcc8b4a2e2509a3c56efb1482b9e2ea80aa01b73c44ed19df4126a87c5e?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                      className="pointImage"
                      alt=""
                    />
                    <div className="pointValue">1,000</div>
                  </div>
                </div>
              </div>
              <button
                className={`claimedLabel ${isLoginClaimed ? "claimed" : ""}`}
                onClick={handleLoginClaimClick}
                style={{ cursor: "pointer" }}
                disabled={isLoginClaimed}
              >
                {isLoginClaimed ? "CLAIMED" : "CLAIM"}
              </button>
            </div>
          </div>
        </div>
        <div className="margintop">
          <div>
            <div className="cardContainer">
              <div className="cardContent">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b5a03a049db265cb188f96311f2011c0d512a033e5d53ad816443dd4ad0eec1?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                  alt="Watch Streak Icon"
                  className="image"
                />
                <div className="referInfo">
                  <div className="referStreak">Watch Streak</div>
                  <div className="pointContainer">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/7bfc2fcc8b4a2e2509a3c56efb1482b9e2ea80aa01b73c44ed19df4126a87c5e?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                      className="pointImage"
                      alt=""
                    />
                    <div className="pointValue">1,000</div>
                  </div>
                </div>
              </div>
              <button
                className={`claimedLabel ${isWatchClaimed ? "claimed" : ""}`}
                onClick={handleWatchClaimClick}
                style={{ cursor: "pointer" }}
                disabled={isLoginClaimed}
              >
                {isWatchClaimed ? "CLAIMED" : "CLAIM"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="margintop">
        <div>
          <div className="cardContainer">
            <div className="cardContent">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0eb953a6da27d088a419ecf530736727ca1f124475b9460d890398ef1438fc31?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                className="image"
                alt=""
              />
              <div className="referInfo">
                <div className="referStreak">refer streak</div>
                <div className="pointContainer">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7bfc2fcc8b4a2e2509a3c56efb1482b9e2ea80aa01b73c44ed19df4126a87c5e?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                    className="pointImage"
                    alt=""
                  />
                  <div className="pointValue">1,000</div>
                </div>
              </div>
            </div>
            <button
              className={`claimedLabel ${isReferClaimed ? "claimed" : ""}`}
              onClick={handleReferClaimClick}
              style={{ cursor: "pointer" }}
              disabled={isReferClaimed}
            >
              {isReferClaimed ? "CLAIMED" : "CLAIM"}
            </button>
          </div>
        </div>
        <div className="margintop">
          <div className="cardContainer">
            <div className="cardContent">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d91855f4c21d7155a4b865bac0a53627ec417e8c7b74d7d40f533e5b8e895a3?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                points="1,000"
                altText="Game icon"
                className="image"
                alt=""
              />
              <div className="referInfo">
                <div className="referStreak">Game Streak</div>
                <div className="pointContainer">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7bfc2fcc8b4a2e2509a3c56efb1482b9e2ea80aa01b73c44ed19df4126a87c5e?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                    className="pointImage"
                    alt=""
                  />
                  <div className="pointValue">1,000</div>
                </div>
              </div>
            </div>
            <button
              className={`claimedLabel ${isGameClaimed ? "claimed" : ""}`}
              onClick={handleGameClaimClick}
              style={{ cursor: "pointer" }}
              disabled={isGameClaimed}
            >
              {isGameClaimed ? "CLAIMED" : "CLAIM"}
            </button>
          </div>
        </div>
        <div className="margintop">
          <div className="cardContainer">
            <div className="cardContent">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0eb953a6da27d088a419ecf530736727ca1f124475b9460d890398ef1438fc31?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                className="image"
                alt=""
              />
              <div className="referInfo">
                <div className="referStreak">Boost Streak</div>
                <div className="pointContainer">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7bfc2fcc8b4a2e2509a3c56efb1482b9e2ea80aa01b73c44ed19df4126a87c5e?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                    className="pointImage"
                    alt=""
                  />
                  <div className="pointValue">1,000</div>
                </div>
              </div>
            </div>
            <button
              className={`claimedLabel ${isBoostClaimed ? "claimed" : ""}`}
              onClick={handleBoostClaimClick}
              style={{ cursor: "pointer" }}
              disabled={isBoostClaimed}
            >
              {isBoostClaimed ? "CLAIMED" : "CLAIM"}
            </button>
          </div>
        </div>
      </div>
      <button className="streak-btn">Streak of Streak</button>
    </div>
  );
};
export default Streak;
