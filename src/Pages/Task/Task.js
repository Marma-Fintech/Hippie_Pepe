import React from "react";
import Pickaword from "./PickaWord/PickaWord";
import Quiz from "./QuizTask/QuizTask";
import Scramble from "./ScrambleaWord/ScrambleaWord";
import useUserInfo from "../../Hooks/useUserInfo";

const Task = () => {
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
    <div className="menupointer">
      <div
        onClick={() => {
          goToThePage(Pickaword, "Pickaword");
        }}
      >
        <button>Pick A Word </button>
      </div>
      <div
        onClick={() => {
          goToThePage(Quiz, "Quiz");
        }}
      >
        {" "}
        <button>Quiz</button>>
      </div>{" "}
      <div
        onClick={() => {
          goToThePage(Scramble, "Scramble");
        }}
      >
        {" "}
        <button>Scramble a Word</button>
      </div>
    </div>
  );
};

export default Task;
