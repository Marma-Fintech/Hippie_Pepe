import React from "react";
import "./StreakBreakPoints.css";
import dayIcon from "../../assets/Task/dayicon.png";
import cancelIcon from "../../assets/Task/cancelicon.png";
import useUserInfo from "../../Hooks/useUserInfo";
import Streak from "../Streak/Streak";
const StreakBreakPoints = () => {
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
  return (
    <div className="tv-body1">
      <div className="streakBreakPointsContainer">
        <div className="streakBreakRow">
          <span className="streakBreakText">STREAK POINTS</span>
          <img
            onClick={() => {
              goToThePage(Streak, "Streak");
            }}
            src={cancelIcon}
            alt="Cancel Icon"
            className="cancelIcon"
          />
        </div>
        <span className="pointsText">BREAKDOWN</span>
        <h3 className="additionalText">
          LOG IN DAILY WITHOUT FAIL TO COMPLETE
        </h3>
        <h3 className="additionalText1">
          ALL TASKS AND EARN "STREAK OF STREAKS"
        </h3>
        <h3 className="additionalText2">POINTS AS A BONUS.</h3>
        <h1 className="check-text">check out the point system</h1>
        <div className="containerbox">
          <button>DAY 1</button>
          <img src={dayIcon} alt="Day Icon" className="icon" />
        </div>
        <div className="containerbox">
          <button>DAY 2</button>
          <img src={dayIcon} alt="Day Icon" className="icon" />
        </div>
        <div className="containerbox">
          <button>DAY 3</button>
          <img src={dayIcon} alt="Day Icon" className="icon" />
        </div>
        <div className="containerbox">
          <button>DAY 4</button>
          <img src={dayIcon} alt="Day Icon" className="icon" />
        </div>
        <div className="containerbox">
          <button>DAY 5</button>
          <img src={dayIcon} alt="Day Icon" className="icon" />
        </div>
        <div className="containerbox">
          <button>DAY 6</button>
          <img src={dayIcon} alt="Day Icon" className="icon" />
        </div>
        <div className="containerbox">
          <button>DAY 7</button>
          <img src={dayIcon} alt="Day Icon" className="icon" />
        </div>
      </div>
    </div>
  );
};
export default StreakBreakPoints;
