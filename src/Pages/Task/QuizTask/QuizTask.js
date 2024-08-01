import React from "react";
import "./QuizTask.css";
import { FaTimes, FaChevronRight } from "react-icons/fa";
import useUserInfo from "../../../Hooks/useUserInfo";
import Task from "../Task";
import QuizplayTask from "./QuizplayTask.js";

const QuizTask = () => {
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
      <h1 className="welcome-text">Welcome to the Quiz Game</h1>
      <h2 className="phase-text">Phase 1</h2>
      <p className="daily-text">DAILY LIMITS: 5 QUESTIONS!</p>
      <div className="days-container">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="day-box">
            <div className="day-label">Day {i + 1}</div>

            <div
              onClick={() => {
                goToThePage(QuizplayTask, "QuizplayTask");
              }}
              className="play-status"
            >
              Play Game 5/5 <FaChevronRight />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizTask;
