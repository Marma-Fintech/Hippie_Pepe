import React, { useState, useEffect } from "react";
import "./QuizTask.css";
import { FaChevronRight } from "react-icons/fa";
import useUserInfo from "../../../Hooks/useUserInfo";
import QuizplayTask from "./QuizplayTask.js";
import { differenceInCalendarDays, startOfDay } from "date-fns";

const QuizTask = () => {
  const { userDetails, updateUserInfo } = useUserInfo();
  const [completedDays, setCompletedDays] = useState([]);
  const [currentCycle, setCurrentCycle] = useState(1); // To track which set of questions the user is on

  useEffect(() => {
    const storedCompletedDays =
      JSON.parse(localStorage.getItem("completedDays")) || [];
    const storedCurrentCycle =
      parseInt(localStorage.getItem("currentCycle"), 10) || 1;
    setCompletedDays(storedCompletedDays);
    setCurrentCycle(storedCurrentCycle);
  }, []);

  useEffect(() => {
    if (completedDays.length === 7) {
      // Move to the next cycle of questions if all 7 days are completed
      setCompletedDays([]);
      setCurrentCycle((prevCycle) => prevCycle + 1);
      localStorage.setItem("completedDays", JSON.stringify([]));
      localStorage.setItem("currentCycle", currentCycle + 1);
    }
  }, [completedDays, currentCycle]);

  const goToThePage = (component, name, day) => {
    updateUserInfo((prev) => ({
      ...prev,
      currentComponent: component,
      currentComponentText: name,
      lastComponent: userDetails.currentComponent,
      lastComponentText: userDetails.currentComponentText,
      selectedDay: day, // Pass the selected day to the child component
      currentCycle: currentCycle, // Pass the current cycle to the child component
      isMenu: !userDetails.isMenu,
    }));
  };

  const today = startOfDay(new Date());
  const baseDate = startOfDay(new Date("2024-08-29")); // Set base date to 10-08-2024
  const dayIndex = differenceInCalendarDays(today, baseDate);

  return (
    <div className="quiz-task menupointer">
      <h1 className="welcome-text">Quiz Game</h1>
      <h2 className="phase-text">Phase {currentCycle}</h2>{" "}
      {/* Display the current cycle */}
      <div className="days-container">
        {Array.from({ length: 7 }, (_, i) => {
          const storedCompletedDays = JSON.parse(
            localStorage.getItem(
              `quizResult_Day_${i + 1}_Cycle_${userDetails.currentCycle}`
            )
          );

          return (
            <div key={i} className="day-box">
              <div className="day-label">Day {i + 1}</div>
              <div
                onClick={() => {
                  if (i <= dayIndex && !storedCompletedDays?.completed) {
                    goToThePage(QuizplayTask, "QuizplayTask", i + 1);
                  }
                }}
                className={`play-status ${
                  i > dayIndex
                    ? "disabled"
                    : completedDays.includes(i + 1)
                    ? "completed"
                    : ""
                }`}
                style={{
                  color:
                    i > dayIndex || storedCompletedDays?.completed
                      ? "grey"
                      : "#ccc",
                }}
              >
                {i > dayIndex
                  ? "Locked"
                  : storedCompletedDays?.completed
                  ? "Completed"
                  : storedCompletedDays?.remain
                  ? `Play Game ${storedCompletedDays?.remain}/5`
                  : `Play Game 5/5`}{" "}
                <FaChevronRight />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizTask;
