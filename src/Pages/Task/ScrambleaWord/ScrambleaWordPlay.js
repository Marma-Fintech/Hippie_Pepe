import React, { useEffect, useState } from "react";
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
  {
    word: "BITCOINS",
    letters: ["I", "T", "B", "C", "I", "N", "O", "S"],
    hint: "FIRST CRYPTOCURRENCY",
    answer: "BITCOINS",
  },
  {
    word: "ETHEREUm",
    letters: ["M", "E", "H", "R", "E", "E", "T", "U"],
    hint: "SECOND LARGEST CRYPTOCURRENCY",
    answer: "ETHEREUM",
  },
  {
    word: "LITECOIn",
    letters: ["E", "I", "L", "C", "I", "N", "O", "T"],
    hint: "SILVER TO BITCOIN'S GOLD",
    answer: "LITECOIN",
  },
  {
    word: "RIPPLe",
    letters: ["P", "L", "I", "P", "E", "R"],
    hint: "KNOWN FOR FAST TRANSACTIONS",
    answer: "RIPPLE",
  },
  {
    word: "CARDAtO",
    letters: ["R", "C", "D", "O", "A", "A", "N"],
    hint: "THIRD GENERATION BLOCKCHAIN",
    answer: "CARDANO",
  },
  {
    word: "BITocIN",
    letters: ["I", "T", "B", "C", "I", "N", "O"],
    hint: "FIRST CRYPTOCURRENCY",
    answer: "BITCOIN",
  },
  {
    word: "ETHEruUM",
    letters: ["M", "E", "H", "R", "E", "E", "T", "U"],
    hint: "SECOND LARGEST CRYPTOCURRENCY",
    answer: "ETHEREUM",
  },
  {
    word: "LITyuN",
    letters: ["E", "I", "L", "C", "I", "N", "O", "T"],
    hint: "SILVER TO BITCOIN'S GOLD",
    answer: "LITECOIN",
  },
  {
    word: "RIPleE",
    letters: ["P", "L", "I", "P", "E", "R"],
    hint: "KNOWN FOR FAST TRANSACTIONS",
    answer: "RIPPLE",
  },
  {
    word: "CAReeO",
    letters: ["R", "C", "D", "O", "A", "A", "N"],
    hint: "THIRD GENERATION BLOCKCHAIN",
    answer: "CARDANO",
  },
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
const ScrambleaWordPlay = ({ day }) => {
  const startIndex = (day - 1) * 5;
  const endIndex = startIndex + 5;
  const dayGameData = gameData.slice(startIndex, endIndex);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [scrambleIndex, setScrambleIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [chancesOver, setChancesOver] = useState(false);

  useEffect(() => {
    const savedScrambleIndex =
      parseInt(localStorage.getItem(`scrambleIndex_day${day}`)) || 0;
    setScrambleIndex(savedScrambleIndex);
    const savedPoints = parseInt(localStorage.getItem(`points_day${day}`)) || 0;
    setPoints(savedPoints);
  }, [day]);

  useEffect(() => {
    if (scrambleIndex >= 5) {
      setChancesOver(true);
      // localStorage.setItem(`scrambleIndex_day${day}`, 5);
    } else {
      // localStorage.setItem(`scrambleIndex_day${day}`, scrambleIndex);
    }
    // Store points in local storage
    localStorage.setItem(`points_day${day}`, points);
  }, [scrambleIndex, points, day]);
  const handleLetterClick = (letter, index) => {
    if (isChecked || chancesOver) return;
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
    if (chancesOver || isChecked) return;
    localStorage.setItem(`scrambleIndex_day${day}`, scrambleIndex + 1);
    setIsChecked(true);
    if (inputValue === dayGameData[scrambleIndex].word) {
      setPoints(points + 1000);
      setMessage("Correct! You earned 1000 points.");
      setShowAnswer(false);
      localStorage.setItem(`points_day${day}`, points);
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
    if (scrambleIndex >= 4) {
      setChancesOver(true);
      localStorage.setItem(`scrambleIndex_day${day}`, 5);
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
                disabled={
                  inputValue.length !== dayGameData[scrambleIndex].word.length
                }
              >
                Check Word
              </button>
            </div>
          </div>
          <div className="scramble-wordbox-container">
            {dayGameData[scrambleIndex].letters.map((letter, index) => (
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
            <h2 className="first-cryptocurrency">
              {dayGameData[scrambleIndex].hint}
            </h2>
          </div>
          {message && <p className="message">{message}</p>}
          {showAnswer && (
            <p className="answer">
              Correct Answer: {dayGameData[scrambleIndex].answer}
            </p>
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
