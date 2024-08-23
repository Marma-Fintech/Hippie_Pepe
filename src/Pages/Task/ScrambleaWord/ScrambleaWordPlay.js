import React, { useState } from "react";
import "./ScrambleaWordPlay.css";
import logo from "../../../assets/images/coinlogo.png";
const gameData = [
  {
    word: "BITCOIN",
    letters: ["I", "T", "B", "C", "I", "N", "O"],
    hint: "FIRST CRYPTOCURRENCY",
    answer: "BITCOIN",
  },
  {
    word: "ETHEREUM",
    letters: ["M", "E", "H", "R", "E", "E", "T", "U"],
    hint: "SECOND LARGEST CRYPTOCURRENCY",
    answer: "ETHEREUM",
  },
  {
    word: "LITECOIN",
    letters: ["E", "I", "L", "C", "I", "N", "O", "T"],
    hint: "SILVER TO BITCOIN'S GOLD",
    answer: "LITECOIN",
  },
  {
    word: "RIPPLE",
    letters: ["P", "L", "I", "P", "E", "R"],
    hint: "KNOWN FOR FAST TRANSACTIONS",
    answer: "RIPPLE",
  },
  {
    word: "CARDANO",
    letters: ["R", "C", "D", "O", "A", "A", "N"],
    hint: "THIRD GENERATION BLOCKCHAIN",
    answer: "CARDANO",
  },
];
const ScrambleaWordPlay = () => {
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [scrambleIndex, setScrambleIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [chancesOver, setChancesOver] = useState(false);
  const currentGameData = gameData[scrambleIndex];
  const handleLetterClick = (letter, index) => {
    if (isChecked) return; // Prevent further changes if the word has been checked
    if (disabledLetters.includes(index)) {
      const letterIndex = selectedLetters.indexOf(letter);
      if (letterIndex > -1) {
        const newSelectedLetters = [...selectedLetters];
        newSelectedLetters.splice(letterIndex, 1);
        const newInputValue =
          inputValue.slice(0, letterIndex) + inputValue.slice(letterIndex + 1);
        setSelectedLetters(newSelectedLetters);
        setDisabledLetters(disabledLetters.filter((i) => i !== index));
        setInputValue(newInputValue);
      }
    } else {
      setSelectedLetters([...selectedLetters, letter]);
      setDisabledLetters([...disabledLetters, index]);
      setInputValue(inputValue + letter);
    }
  };
  const checkWord = () => {
    setIsChecked(true); // Disable further input after checking the word
    if (inputValue === currentGameData.word) {
      setPoints(points + 1000);
      setMessage("Correct! You earned 1000 points.");
      setShowAnswer(false);
    } else {
      setPoints(points + 500);
      setMessage("Incorrect. You earned 500 points.");
      setShowAnswer(true);
    }
  };
  const nextScramble = () => {
    if (!isChecked) {
      setMessage("Please check the word first.");
      return;
    }
    console.log(`Word: ${currentGameData.word}, Points: ${points}`);
    if (scrambleIndex >= gameData.length - 1) {
      setChancesOver(true);
      return;
    }
    setSelectedLetters([]);
    setDisabledLetters([]);
    setInputValue("");
    setIsChecked(false);
    setScrambleIndex(scrambleIndex + 1);
    setMessage("");
    setShowAnswer(false);
  };
  return (
    <div className="quiz-play-task">
      {chancesOver ? (
        <div>
          <h1 className="text-headingg">WORD SCRAMBLE</h1>
          <div className="cards">
            <h1 className="title-epic">Epic Win!</h1>
            <div className="pointsContainer">
              <div className="pointsInnerContainer">
                <p className="pointsLabel">POINTS EARNED </p>
                <div className="pointsValue">
                  <img src={logo} alt="logo" />
                  <p className="pointsNumber">{points}</p>
                </div>
              </div>
            </div>
            <p className="bottom-text">
              Play daily to boost your score <br /> and rack up more points!
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="ScrambleaWordPlay">
            <h1 className="text-heading">WORD SCRAMBLE</h1>
            <h3 className="scramble-count">
              YOU HAVE {scrambleIndex + 1}/5 SCRAMBLE
            </h3>
          </div>
          <div>
            <div className="custom-search">
              <input
                type="text"
                className="custom-search-input"
                placeholder="Enter a valid word"
                value={inputValue}
                readOnly
              />
              <button
                className="custom-search-botton"
                type="button"
                onClick={checkWord}
                disabled={inputValue.length !== currentGameData.word.length}
              >
                Check Word
              </button>
            </div>
          </div>
          <div className="scramble-wordbox-container">
            {currentGameData.letters.map((letter, index) => (
              <div
                key={index}
                className={`scramble-wordbox ${
                  disabledLetters.includes(index) ? "disabled" : ""
                }`}
                onClick={() => handleLetterClick(letter, index)}
              >
                <p className="word-s">{letter}</p>
              </div>
            ))}
          </div>
          <div className="margin">
            <h2 className="hint-text">Hint</h2>
            <h2 className="first-cryptocurrency">{currentGameData.hint}</h2>
          </div>
          {message && <p className="message">{message}</p>}
          {showAnswer && (
            <p className="answer">Correct Answer: {currentGameData.answer}</p>
          )}
          <button className="quitz-btn" onClick={nextScramble}>
            Next
          </button>
        </>
      )}
    </div>
  );
};
export default ScrambleaWordPlay;
