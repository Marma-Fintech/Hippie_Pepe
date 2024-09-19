import React, { useState } from "react";
import "./StreakBreakPoints.css";
import dayIcon from "../../assets/Task/dayicon.png";
import cancelIcon from "../../assets/Task/cancelicon.png";
import useUserInfo from "../../Hooks/useUserInfo";
import Streak from "../Streak/Streak";
import coinImg from "../../assets/images/coinlogo.png";

const streakData = [
  { type: "LOGIN STREAK", coins: [100, 200, 300, 400, 500, 600, 700] },
  { type: "WATCH STREAK", coins: [100, 200, 300, 400, 500, 600, 700] },
  {
    type: "REFER STREAK",
    coins: [1000, 2000, 3000, 5000, 10000, 15000, 25000],
  },
  { type: "TASK STREAK", coins: [100, 200, 300, 400, 500, 600, 700] },
  {
    type: "MULTI STREAK",
    coins: [1300, 2100, 4200, 8400, 16800, 33600, 67200],
  },
  {
    type: "STREAK OF STREAK",
    coins: [0, 2100, 6300, 14700, 31500, 65100, 132300],
  },
];

const StreakBreakPoints = () => {
  const { userDetails, updateUserInfo } = useUserInfo();
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
            LOG IN DAILY WITHOUT FAIL TO COMPLETE
          </h3>
          <h3 className="additionalText1">
            ALL TASKS AND EARN "STREAK OF STREAKS"
          </h3>
          <h3 className="additionalText2">POINTS AS A BONUS.</h3>
          <h1 className="check-text">check out the point system</h1>
          {Array.from({ length: 7 }).map((_, dayIndex) => (
            <div className="containerbox-main" key={dayIndex}>
              <div
                className={`containerbox ${
                  openDropdowns.includes(dayIndex + 1) ? "active" : ""
                }`}
              >
                <button>DAY {dayIndex + 1}</button>
                <img
                  src={dayIcon}
                  alt={`Day ${dayIndex + 1} Icon`}
                  className="icon"
                  onClick={() => toggleDropdown(dayIndex + 1)}
                />
              </div>
              {openDropdowns.includes(dayIndex + 1) && (
                <div className="dropdown">
                  {streakData.map((streak, streakIndex) => (
                    <div key={streakIndex} className="dropdownItem">
                      <span className="streakDropdownText">{streak.type}</span>
                      <img src={coinImg} alt="Coin Icon" className="coinIcon" />
                      {/* Display coins for the specific day */}
                      <span className="coinsText">
                        {streak.coins[dayIndex]} Coins
                      </span>
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
