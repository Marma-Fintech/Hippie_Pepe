import React, { useState } from "react";
import "./StreakBreakPoints.css";
import dayIcon from "../../assets/Task/dayicon.png";
import cancelIcon from "../../assets/Task/cancelicon.png";
import useUserInfo from "../../Hooks/useUserInfo";
import Streak from "../Streak/Streak";
import coinImg from "../../assets/images/coinlogo.png";
const streakData = [
  { type: "LOGIN STREAK", coins: 100 },
  { type: "WATCH STREAK", coins: 100 },
  { type: "REFER STREAK", coins: 300 },
  { type: "TASK STREAK", coins: 500 },
  { type: "BOOST STREAK", coins: 500 },
  { type: "STREAK OF STREAK", coins: 500 },
];
const StreakBreakPoints = () => {
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();
  const [openDropdowns, setOpenDropdowns] = useState([]);
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
  const toggleDropdown = (day) => {
    if (openDropdowns.includes(day)) {
      setOpenDropdowns(openDropdowns.filter((d) => d !== day));
    } else {
      setOpenDropdowns([...openDropdowns, day]);
    }
  };
  return (
    <div className="tv-body">
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
        <div className="scrollableContainer">
          <h3 className="additionalText">
        Login daily to unlock the Streak of Streaks bonus and keep your SOS alive throughout the entire reward cycle!
          Accomplish your daily tasks and see your streaks reset with each new phase!
          </h3>
          {/* <h3 className="additionalText2">POINTS AS A BONUS.</h3> */}
          <h1 className="check-text">check out the point system</h1>
          {Array.from({ length: 7 }).map((_, index) => (
            <div className="containerbox-main">
              <div
                key={index}
                className={`containerbox ${
                  openDropdowns.includes(index + 1) ? "active" : ""
                }`}
              >
                <button>DAY {index + 1}</button>
                <img
                  src={dayIcon}
                  alt={`Day ${index + 1} Icon`}
                  className="icon"
                  onClick={() => toggleDropdown(index + 1)}
                />
              </div>
              {openDropdowns.includes(index + 1) && (
                <div className="dropdown">
                  {streakData.map((streak, i) => (
                    <div key={i} className="dropdownItem">
                      <span className="streakDropdownText">{streak.type}</span>
                      <img src={coinImg} alt="Coin Icon" className="coinIcon" />
                      <span className="coinsText">{streak.coins} </span>
                      {/* <span className="coinText">3X Booster</span> */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default StreakBreakPoints;
