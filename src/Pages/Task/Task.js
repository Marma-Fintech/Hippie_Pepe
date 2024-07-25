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
          isMenu: false,
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
        <h1>pickaword</h1>
      </div>
      <div
        onClick={() => {
          goToThePage(Quiz, "Quiz");
        }}
      >
        <h1>Quiz</h1>
      </div>
      <div
        onClick={() => {
          goToThePage(Scramble, "Scramble");
        }}
      >
        {" "}
        <h1>Scrambledword</h1>
      </div>
    </div>
  );
};

export default Task;
