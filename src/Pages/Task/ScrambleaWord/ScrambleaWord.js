import React from "react";
import "./ScrambleaWord.css";
import { FaTimes, FaChevronRight } from "react-icons/fa";
import useUserInfo from "../../../Hooks/useUserInfo";
import Task from "../Task";
import ScrambleaWordPlay from "./ScrambleaWordPlay.js";
import wordscramble from "../../../assets/Task/wordscramble.png";

const ScrambleaWord = () => {
  const { userDetails, updateUserInfo } = useUserInfo();

  const goToThePage = (component, name) => {
    updateUserInfo((prev) => {
      return {
        ...prev,
        ...{
          currentComponent: component,
          currentComponentText: name,
          lastComponent: userDetails.currentComponent,
          lastComponentText: userDetails.currentComponentText,
          isMenu: !userDetails.isMenu,
        },
      };
    });
  };
  return (
    <div className="quiz-task menupointer">
      <div className="cancel-container">
        <FaTimes
          onClick={() => {
            goToThePage(Task, "Task");
          }}
          className="cancel-icon"
        />
      </div>
      {/* <h1 className="welcome-text">WORD SCRAMBLE</h1> */}
      <img className="welcome-text" src={wordscramble} />
      <h2 className="phase-text">Phase 1</h2>

      <div className="days-container">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="day-box">
            <div className="day-label">Day {i + 1}</div>
            <div
              onClick={() => {
                goToThePage(ScrambleaWordPlay, "ScrambleaWordPlay");
              }}
              className="play-status"
            >
              Play Game <FaChevronRight />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrambleaWord;
