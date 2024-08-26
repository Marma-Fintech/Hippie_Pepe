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
import {
  getUserDetails,
  purchaseGameCards,
  userGameRewards,
} from "../../../apis/user";
import cancelIcon from "../../../assets/Task/cancelicon.png";

const cardContents = [
  "levelUp",
  "2x",
  "3x",
  "5x",
  "tap",
  "1000 points",
  "5000 points",
  "Better luck next time",
  "Better luck next time",
];
const cardImages = {
  levelUp: levelUpBoostImg,
  "2x": twoXBoostImg,
  "3x": threeXBoostImg,
  "5x": fiveXBoostImg,
  tap: tapBoosterImg,
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
  return results ? JSON.parse(results) : { points: 0, boosts: [] };
};
const saveResults = async (results) => {
  localStorage.setItem("gameResults", JSON.stringify(results));
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
  const handleCardClick = async (index) => {
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
      let newPoints = points;
      let newMessage = "";
      if (cardContent === "1000 points") {
        newPoints += 1000;
        newMessage = "1000 points added!";
      } else if (cardContent === "5000 points") {
        newPoints += 5000;
        newMessage = "5000 points added!";
      } else if (["2x", "3x", "5x", "levelUp"].includes(cardContent)) {
        newMessage = `${cardContent} boost added!`;
      } else if (cardContent === "Better luck next time") {
        newMessage = "Better luck next time!";
      } else {
        newMessage = `${cardContent} added!`;
      }
      setPoints(newPoints);
      setMessage(newMessage);
      // Create a new object for the current API call
      let currentResult = {
        points: cardContent.includes("points")
          ? parseInt(cardContent.split(" ")[0])
          : 0,
        boosts: [],
      };
      if (["2x", "3x", "5x", "levelUp"].includes(cardContent)) {
        currentResult.boosts.push(cardContent);
      }
      // Update the cumulative results
      let updatedResults = {
        points: results.points + currentResult.points,
        boosts: [...results?.boosts, ...currentResult.boosts],
      };
      await saveResults(updatedResults);
      setResults(updatedResults);
      setShowPopup(true);
      // API call with only the current selection
      const apiData = {
        telegramId: String(userDetails.userDetails?.telegramId),
        gamePoints: String(currentResult.points),
        boosters: currentResult.boosts,
      };
      await userGameRewards(apiData);
    }
  };
  const handleFreePick = () => {
    setCards(Array(9).fill(null));
    setSelected(false);
    setPoints(0);
    setMessage("");
    setRandomContents(generateCardContents());
    setPlaysRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    setShowPopup(false);
    setSelectedCard(null);
  };
  const handlePlayAgain = async () => {
    setCards(Array(9).fill(null));
    setSelected(false);
    setPoints(0);
    setMessage("");
    setRandomContents(generateCardContents());
    setPlaysRemaining(1);
    setShowPopup(false);
    setSelectedCard(null);
    let totalPoints = await getUserDetails(userDetails.userDetails.telegramId);
    await purchaseGameCards({
      telegramId: String(userDetails.userDetails.telegramId),
      gamePoints: String(500),
    });
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
            {playsRemaining > 1 ? (
              <>
                <h2 className="epic">Epic Win!</h2>
                <img
                  src={cancelIcon}
                  className="cancel-img"
                  onClick={handleFreePick}
                />
                <div className="row text-center">
                  <div className="col-12">
                    <div className="epic-div">
                      {selectedCard && (
                        <img
                          src={cardImages[selectedCard]}
                          alt={selectedCard}
                          className="popup-card-image"
                        />
                      )}
                      <h3 className="rw-popup">You got {selectedCard}!</h3>
                    </div>
                  </div>
                </div>
                <button className="btn-reward" onClick={handleFreePick}>
                  Free Pick
                </button>
              </>
            ) : (
              <>
                <h2 className="epic">Epic Win!</h2>
                <div className="row text-center">
                  <div className="col-12">
                    <div className="epic-div">
                      {selectedCard && (
                        <img
                          src={cardImages[selectedCard]}
                          alt={selectedCard}
                          className="popup-card-image"
                        />
                      )}
                      <h3 className="rw-popup">You got {selectedCard}!</h3>
                    </div>
                  </div>
                </div>
                <button className="btn-reward" onClick={handlePlayAgain}>
                  500 Coins
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default PickaWord;
