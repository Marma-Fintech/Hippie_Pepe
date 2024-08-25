import React, { useEffect, useState } from "react";
import "./ScrambleaWord.css";
import { FaChevronRight } from "react-icons/fa";
import useUserInfo from "../../../Hooks/useUserInfo";
import ScrambleaWordPlay from "./ScrambleaWordPlay.js";
const ScrambleaWord = () => {
  const { userDetails, updateUserInfo } = useUserInfo();
  const [scrambleProgress, setScrambleProgress] = useState([]);
  useEffect(() => {
    const progress = Array.from({ length: 7 }, (_, i) => {
      const day = i + 1;
      const completedIndex =
        parseInt(localStorage.getItem(`scrambleIndex_day${day}`)) || 0;
      // Check if exactly 5 scrambles are completed for that day
      return completedIndex >= 5
        ? "Completed"
        : ` Play Game ${completedIndex}/5 `;
    });
    setScrambleProgress(progress);
  }, []);
  const goToThePage = (component, name, isCompleted) => {
    if (isCompleted) return; // Prevent navigation if the day is completed
    updateUserInfo((prev) => {
      return {
        ...prev,
        currentComponent: component,
        currentComponentText: name,
        lastComponent: userDetails.currentComponent,
        lastComponentText: userDetails.currentComponentText,
        isMenu: !userDetails.isMenu,
      };
    });
  };
  return (
    <div className="quiz-task menupointer">
      <h1 className="welcome-text">word scramble</h1>
      <h2 className="phase-text">Phase 1</h2>
      <div className="days-container">
        {Array.from({ length: 7 }, (_, i) => {
          const isCompleted = scrambleProgress[i] === "Completed";
          return (
            <div key={i} className="day-box">
              <div className="day-label">Day {i + 1}</div>
              <div
                onClick={() => {
                  goToThePage(
                    () => <ScrambleaWordPlay day={i + 1} />,
                    "ScrambleaWordPlay",
                    isCompleted
                  );
                }}
                className="play-status"
                style={{ cursor: isCompleted ? "default" : "pointer" }}
              >
                {scrambleProgress[i]} <FaChevronRight />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ScrambleaWord;
