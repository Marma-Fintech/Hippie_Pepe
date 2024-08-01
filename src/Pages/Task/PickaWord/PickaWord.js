import React, { useEffect, useState } from "react";
import "./PickaWord.css";
import useUserInfo from "../../../Hooks/useUserInfo";
import questionmark from "../../../assets/Task/Questionmark.png";
import levelUpBoostImg from "../../../assets/Task/1levelup.png";
import twoXBoostImg from "../../../assets/Task/2xboost.png";
import threeXBoostImg from "../../../assets/Task/3xboost.png";
import fiveXBoostImg from "../../../assets/Task/5xboost.png";
import tapBoosterImg from "../../../assets/Task/TapBoost.png";
import thousandPointsImg from "../../../assets/Task/1000points.png";
import fiveThousandPointsImg from "../../../assets/Task/5000points.png";
import betterLuckNextTimeImg from "../../../assets/Task/nexttime.png";
// Define the possible card contents
const cardContents = [
  "Level up boost",
  "2x",
  "3x",
  "5x",
  "Tap booster",
  "1000 points",
  "5000 points",
  "Better luck next time",
  "Better luck next time",
];
const cardImages = {
  "Level up boost": levelUpBoostImg,
  "2x": twoXBoostImg,
  "3x": threeXBoostImg,
  "5x": fiveXBoostImg,
  "Tap booster": tapBoosterImg,
  "1000 points": thousandPointsImg,
  "5000 points": fiveThousandPointsImg,
  "Better luck next time": betterLuckNextTimeImg,
};
const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};
const loadResults = () => {
  const results = localStorage.getItem("gameResults");
  return results ? JSON.parse(results) : { points: 0, boosts: {} };
};
const saveResults = (results) => {
  localStorage.setItem("gameResults", JSON.stringify(results));
  console.log("Results saved:", results);
};
const PickaWord = () => {
  const [cards, setCards] = useState(Array(9).fill(null));
  const { userDetails, updateUserInfo } = useUserInfo();
  const [selected, setSelected] = useState(false);
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState("");
  const [playsRemaining, setPlaysRemaining] = useState(5);
  const [results, setResults] = useState(loadResults());
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  // Generate and shuffle random contents for the cards
  const generateCardContents = () => shuffleArray([...cardContents]);
  const [randomContents, setRandomContents] = useState(generateCardContents());
  useEffect(() => {
    saveResults(results);
  }, [results]);
  const handleCardClick = (index) => {
    if (playsRemaining <= 0) {
      setShowPopup(true);
      return;
    }
    if (!selected && cards[index] === null) {
      const newCards = [...cards];
      const cardContent = randomContents[index];
      newCards[index] = cardContent;
      setCards(newCards);
      setSelected(true);
      setSelectedCard(cardContent);
      if (cardContent === "1000 points") {
        setPoints(1000);
        setMessage("1000 points added!");
      } else if (cardContent === "5000 points") {
        setPoints(5000);
        setMessage("5000 points added!");
      } else if (["2x", "3x", "5x"].includes(cardContent)) {
        setMessage(`${cardContent} boost added!`);
      } else if (cardContent === "Better luck next time") {
        setPoints(0);
        setMessage("Better luck next time!");
      } else {
        setMessage(`${cardContent} added!`);
      }
      let newResults = { ...results };
      if (cardContent === "1000 points" || cardContent === "5000 points") {
        newResults.points += parseInt(cardContent.split(" ")[0]);
      } else if (["2x", "3x", "5x"].includes(cardContent)) {
        newResults.boosts[cardContent] =
          (newResults.boosts[cardContent] || 0) + 1;
      }
      setResults(newResults);
      console.log("Updated results:", newResults);
      setMessage(`${cardContent} added!`);
      setShowPopup(true);
      setTimeout(() => {
        setCards(Array(9).fill(null));
        setSelected(false);
        setPoints(0);
        setMessage("");
        setRandomContents(generateCardContents());
        setPlaysRemaining((prev) => (prev > 0 ? prev - 1 : 0));
        setShowPopup(false);
        setSelectedCard(null);
      }, 2000);
    }
  };
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
    <div className="task-page">
      <div className="">
        <h2 className="welcome-text mb15">Pick a Card</h2>
      </div>
      {/* {selected && <p className="task-message">{message}</p>} */}
      <div className="cards-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${card !== null ? "flipped" : ""}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-inner">
              <div className="card-front">
                {card === null ? <img src={questionmark} alt="?" /> : null}
              </div>
              <div className="card-back">
                {card !== null ? (
                  <img src={cardImages[card]} alt={card} />
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
      <h5 className="chancesleft">
        YOU HAVE {playsRemaining}/5 CHANCES LEFT NOW
      </h5>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>You got {selectedCard}!</h3>
            {selectedCard && (
              <img
                src={cardImages[selectedCard]}
                alt={selectedCard}
                className="popup-card-image"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default PickaWord;
