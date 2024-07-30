// import React, { useState } from "react";
// import { FaTimes } from "react-icons/fa";

// import "./PickaWord.css";
// import useUserInfo from "../../../Hooks/useUserInfo";
// import Task from "../Task";
// // Define the possible card contents
// const cardContents = [
//   "Level up boost",
//   "2x",
//   "3x",
//   "5x",
//   "Tap booster",
//   "1000 points",
//   "5000 points",
//   "Better luck next time",
//   "Better luck next time",
// ];

// const shuffleArray = (array) => {
//   let currentIndex = array.length,
//     randomIndex;

//   while (currentIndex !== 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex],
//       array[currentIndex],
//     ];
//   }

//   return array;
// };

// const PickaWord = () => {
//   const [cards, setCards] = useState(Array(9).fill(null));
//   const { userDetails, updateUserInfo } = useUserInfo();

//   const [selected, setSelected] = useState(false);
//   const [points, setPoints] = useState(0);
//   const [message, setMessage] = useState("");
//   const [playsRemaining, setPlaysRemaining] = useState(5);
//   const [cardPicked, setCardPicked] = useState(false);

//   // Generate and shuffle random contents for the cards
//   const generateCardContents = () => shuffleArray([...cardContents]);

//   const [randomContents, setRandomContents] = useState(generateCardContents());

//   const handleCardClick = (index) => {
//     if (!selected && cards[index] === null) {
//       const newCards = [...cards];
//       const cardContent = randomContents[index];
//       newCards[index] = cardContent;
//       setCards(newCards);
//       setSelected(true);
//       setCardPicked(true);

//       if (cardContent === "1000 points") {
//         setPoints(1000);
//         setMessage("1000 points added!");
//       } else if (cardContent === "5000 points") {
//         setPoints(5000);
//         setMessage("5000 points added!");
//       } else if (["2x", "3x", "5x"].includes(cardContent)) {
//         setMessage(`${cardContent} boost added!`);
//       } else if (cardContent === "Better luck next time") {
//         setPoints(0);
//         setMessage("Better luck next time!");
//       } else {
//         setMessage(`${cardContent} added!`);
//       }
//     }
//   };

//   const handlePlayAgainClick = () => {
//     if (cardPicked && playsRemaining > 0) {
//       setCards(Array(9).fill(null));
//       setSelected(false);
//       setPoints(0);
//       setMessage("");
//       setRandomContents(generateCardContents());
//       setPlaysRemaining(playsRemaining - 1);
//       setCardPicked(false); // Reset the cardPicked state
//     }
//   };

//   const goToThePage = (component, name) => {
//     updateUserInfo((prev) => {
//       return {
//         ...prev,
//         ...{
//           currentComponent: component,
//           currentComponentText: name,
//           lastComponent: userDetails.currentComponent,
//           lastComponentText: userDetails.currentComponentText,
//           isMenu: !userDetails.isMenu,
//         },
//       };
//     });
//   };

//   return (
//     <div className="task-page">
//       <div className="cancel-container">
//         <FaTimes
//           onClick={() => {
//             goToThePage(Task, "Task");
//           }}
//           className="cancel-icon"
//         />
//       </div>
//       <h1>Task Page</h1>
//       <div className="cards-container">
//         {cards.map((card, index) => (
//           <div
//             key={index}
//             className={`card ${card !== null ? "flipped" : ""}`}
//             onClick={() => handleCardClick(index)}
//           >
//             <div className="card-inner">
//               <div className="card-front"></div>
//               <div className="card-back">{card !== null ? card : ""}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <h5>Play Again {playsRemaining}/5</h5>
//       <button
//         onClick={handlePlayAgainClick}
//         disabled={!cardPicked || playsRemaining === 0} // Disable button if no card is picked or no plays remaining
//         className={playsRemaining === 0 ? "disabled-button" : ""}
//       >
//         {playsRemaining > 0
//           ? `Play Again ${playsRemaining}/5`
//           : "Purchase Game"}
//       </button>
//       {selected && <p className="task-message">{message}</p>}
//     </div>
//   );
// };

// export default PickaWord;

// import React, { useState } from "react";
// import { FaTimes } from "react-icons/fa";
// import "./PickaWord.css";
// import useUserInfo from "../../../Hooks/useUserInfo";
// import Task from "../Task";
// import questionmark from "../../../assets/Task/Questionmark.png";
// import levelUpBoostImg from "../../../assets/Task/1levelup.png";
// import twoXBoostImg from "../../../assets/Task/2xboost.png";
// import threeXBoostImg from "../../../assets/Task/3xboost.png";
// import fiveXBoostImg from "../../../assets/Task/5xboost.png";
// import tapBoosterImg from "../../../assets/Task/TapBoost.png";
// import thousandPointsImg from "../../../assets/Task/1000points.png";
// import fiveThousandPointsImg from "../../../assets/Task/5000points.png";
// import betterLuckNextTimeImg from "../../../assets/Task/nexttime.png";

// // Define the possible card contents
// const cardContents = [
//   "Level up boost",
//   "2x",
//   "3x",
//   "5x",
//   "Tap booster",
//   "1000 points",
//   "5000 points",
//   "Better luck next time",
//   "Better luck next time",
// ];

// const cardImages = {
//   "Level up boost": levelUpBoostImg,
//   "2x": twoXBoostImg,
//   "3x": threeXBoostImg,
//   "5x": fiveXBoostImg,
//   "Tap booster": tapBoosterImg,
//   "1000 points": thousandPointsImg,
//   "5000 points": fiveThousandPointsImg,
//   "Better luck next time": betterLuckNextTimeImg,
// };

// const shuffleArray = (array) => {
//   let currentIndex = array.length,
//     randomIndex;

//   while (currentIndex !== 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex],
//       array[currentIndex],
//     ];
//   }

//   return array;
// };

// const PickaWord = () => {
//   const [cards, setCards] = useState(Array(9).fill(null));
//   const { userDetails, updateUserInfo } = useUserInfo();
//   const [freePicks, setFreePicks] = useState(0);
//   const [selected, setSelected] = useState(false);
//   const [points, setPoints] = useState(0);
//   const [message, setMessage] = useState("");
//   const [playsRemaining, setPlaysRemaining] = useState(5);
//   const [cardPicked, setCardPicked] = useState(false);

//   // Generate and shuffle random contents for the cards
//   const generateCardContents = () => shuffleArray([...cardContents]);

//   const [randomContents, setRandomContents] = useState(generateCardContents());

//   const handleCardClick = (index) => {
//     if (!selected && cards[index] === null) {
//       const newCards = [...cards];
//       const cardContent = randomContents[index];
//       newCards[index] = cardContent;
//       setCards(newCards);
//       setSelected(true);
//       setCardPicked(true);

//       if (cardContent === "1000 points") {
//         setPoints(1000);
//         setMessage("1000 points added!");
//       } else if (cardContent === "5000 points") {
//         setPoints(5000);
//         setMessage("5000 points added!");
//       } else if (["2x", "3x", "5x"].includes(cardContent)) {
//         setMessage(`${cardContent} boost added!`);
//       } else if (cardContent === "Better luck next time") {
//         setPoints(0);
//         setMessage("Better luck next time!");
//       } else {
//         setMessage(`${cardContent} added!`);
//       }
//     }
//   };

//   const handlePlayAgainClick = () => {
//     if ((cardPicked && playsRemaining > 0) || freePicks > 0) {
//       setCards(Array(9).fill(null));
//       setSelected(false);
//       setPoints(0);
//       setMessage("");
//       setRandomContents(generateCardContents());
//       if (freePicks > 0) {
//         setFreePicks(freePicks - 1);
//       } else {
//         setPlaysRemaining(playsRemaining - 1);
//       }
//       setCardPicked(false);
//     }
//   };

//   const buttonText =
//     freePicks > 0
//       ? "Free Pick"
//       : playsRemaining > 0
//       ? "Free Pick"
//       : "500 Coins";

//   const goToThePage = (component, name) => {
//     updateUserInfo((prev) => {
//       return {
//         ...prev,
//         ...{
//           currentComponent: component,
//           currentComponentText: name,
//           lastComponent: userDetails.currentComponent,
//           lastComponentText: userDetails.currentComponentText,
//           isMenu: !userDetails.isMenu,
//         },
//       };
//     });
//   };

//   return (
//     <div className="task-page">
//       {selected && <p className="task-message">{message}</p>}
//       <div className="cancel-container">
//         <FaTimes
//           onClick={() => {
//             goToThePage(Task, "Task");
//           }}
//           className="cancel-icon"
//         />
//       </div>

//       <div className="cards-container">
//         {cards.map((card, index) => (
//           <div
//             key={index}
//             className={`card ${card !== null ? "flipped" : ""}`}
//             onClick={() => handleCardClick(index)}
//           >
//             <div className="card-inner">
//               <div className="card-front">
//                 {card === null ? <img src={questionmark} alt="?" /> : null}
//               </div>
//               <div className="card-back">
//                 {card !== null ? (
//                   <img src={cardImages[card]} alt={card} />
//                 ) : null}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <h5 className="chancesleft">
//         YOU HAVE {playsRemaining}/5 CHANCES LEFT NOW
//       </h5>

//       <button
//         onClick={handlePlayAgainClick}
//         disabled={!cardPicked && freePicks === 0}
//         className={
//           playsRemaining === 0 && freePicks === 0 ? "disabled-button" : ""
//         }
//       >
//         {buttonText}
//       </button>
//     </div>
//   );
// };

// export default PickaWord;

// import React, { useState } from "react";
// import { FaTimes } from "react-icons/fa";
// import "./PickaWord.css";
// import useUserInfo from "../../../Hooks/useUserInfo";
// import Task from "../Task";
// import questionmark from "../../../assets/Task/Questionmark.png";
// import levelUpBoostImg from "../../../assets/Task/1levelup.png";
// import twoXBoostImg from "../../../assets/Task/2xboost.png";
// import threeXBoostImg from "../../../assets/Task/3xboost.png";
// import fiveXBoostImg from "../../../assets/Task/5xboost.png";
// import tapBoosterImg from "../../../assets/Task/TapBoost.png";
// import thousandPointsImg from "../../../assets/Task/1000points.png";
// import fiveThousandPointsImg from "../../../assets/Task/5000points.png";
// import betterLuckNextTimeImg from "../../../assets/Task/nexttime.png";

// // Define the possible card contents
// const cardContents = [
//   "Level up boost",
//   "2x",
//   "3x",
//   "5x",
//   "Tap booster",
//   "1000 points",
//   "5000 points",
//   "Better luck next time",
//   "Better luck next time",
// ];

// const cardImages = {
//   "Level up boost": levelUpBoostImg,
//   "2x": twoXBoostImg,
//   "3x": threeXBoostImg,
//   "5x": fiveXBoostImg,
//   "Tap booster": tapBoosterImg,
//   "1000 points": thousandPointsImg,
//   "5000 points": fiveThousandPointsImg,
//   "Better luck next time": betterLuckNextTimeImg,
// };

// const shuffleArray = (array) => {
//   let currentIndex = array.length,
//     randomIndex;

//   while (currentIndex !== 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex],
//       array[currentIndex],
//     ];
//   }

//   return array;
// };

// const PickaWord = () => {
//   const [cards, setCards] = useState(Array(9).fill(null));
//   const { userDetails, updateUserInfo } = useUserInfo();
//   const [freePicks, setFreePicks] = useState(0);
//   const [selected, setSelected] = useState(false);
//   const [points, setPoints] = useState(0);
//   const [message, setMessage] = useState("");
//   const [playsRemaining, setPlaysRemaining] = useState(5);
//   const [cardPicked, setCardPicked] = useState(false);

//   // Generate and shuffle random contents for the cards
//   const generateCardContents = () => shuffleArray([...cardContents]);

//   const [randomContents, setRandomContents] = useState(generateCardContents());

//   const handleCardClick = (index) => {
//     if (!selected && cards[index] === null) {
//       const newCards = [...cards];
//       const cardContent = randomContents[index];
//       newCards[index] = cardContent;
//       setCards(newCards);
//       setSelected(true);
//       setCardPicked(true);

//       if (cardContent === "1000 points") {
//         setPoints(1000);
//         setMessage("1000 points added!");
//       } else if (cardContent === "5000 points") {
//         setPoints(5000);
//         setMessage("5000 points added!");
//       } else if (["2x", "3x", "5x"].includes(cardContent)) {
//         setMessage(`${cardContent} boost added!`);
//       } else if (cardContent === "Better luck next time") {
//         setPoints(0);
//         setMessage("Better luck next time!");
//       } else {
//         setMessage(`${cardContent} added!`);
//       }
//     }
//   };

//   const handlePlayAgainClick = () => {
//     if ((cardPicked && playsRemaining > 0) || freePicks > 0) {
//       setCards(Array(9).fill(null));
//       setSelected(false);
//       setPoints(0);
//       setMessage("");
//       setRandomContents(generateCardContents());
//       if (freePicks > 0) {
//         setFreePicks(freePicks - 1);
//       } else {
//         setPlaysRemaining(playsRemaining - 1);
//       }
//       setCardPicked(false);
//     }
//   };

//   const buttonText =
//     freePicks > 0
//       ? "Free Pick"
//       : playsRemaining > 0
//       ? "Free Pick"
//       : "500 Coins";

//   const goToThePage = (component, name) => {
//     updateUserInfo((prev) => {
//       return {
//         ...prev,
//         ...{
//           currentComponent: component,
//           currentComponentText: name,
//           lastComponent: userDetails.currentComponent,
//           lastComponentText: userDetails.currentComponentText,
//           isMenu: !userDetails.isMenu,
//         },
//       };
//     });
//   };

//   return (
//     <div className="task-page">
//       <div className="cancel-container">
//         <FaTimes
//           onClick={() => {
//             goToThePage(Task, "Task");
//           }}
//           className="cancel-icon"
//         />
//       </div>
//       {selected && <p className="task-message">{message}</p>}

//       <div className="cards-container">
//         {cards.map((card, index) => (
//           <div
//             key={index}
//             className={`card ${card !== null ? "flipped" : ""}`}
//             onClick={() => handleCardClick(index)}
//           >
//             <div className="card-inner">
//               <div className="card-front">
//                 {card === null ? <img src={questionmark} alt="?" /> : null}
//               </div>
//               <div className="card-back">
//                 {card !== null ? (
//                   <img src={cardImages[card]} alt={card} />
//                 ) : null}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <h5 className="chancesleft">
//         YOU HAVE {playsRemaining}/5 CHANCES LEFT NOW
//       </h5>

//       <button
//         onClick={handlePlayAgainClick}
//         disabled={!cardPicked && freePicks === 0}
//         className={
//           playsRemaining === 0 && freePicks === 0 ? "disabled-button" : ""
//         }
//       >
//         {buttonText}
//       </button>
//     </div>
//   );
// };

// export default PickaWord;

import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./PickaWord.css";
import useUserInfo from "../../../Hooks/useUserInfo";
import Task from "../Task";
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
  const [freePicks, setFreePicks] = useState(0);
  const [selected, setSelected] = useState(false);
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState("");
  const [playsRemaining, setPlaysRemaining] = useState(5);
  const [cardPicked, setCardPicked] = useState(false);
  const [results, setResults] = useState(loadResults());

  // Generate and shuffle random contents for the cards
  const generateCardContents = () => shuffleArray([...cardContents]);

  const [randomContents, setRandomContents] = useState(generateCardContents());

  useEffect(() => {
    saveResults(results);
  }, [results]);

  const handleCardClick = (index) => {
    if (!selected && cards[index] === null) {
      const newCards = [...cards];
      const cardContent = randomContents[index];
      newCards[index] = cardContent;
      setCards(newCards);
      setSelected(true);
      setCardPicked(true);

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
    }
  };

  const handlePlayAgainClick = () => {
    if ((cardPicked && playsRemaining > 0) || freePicks > 0) {
      setCards(Array(9).fill(null));
      setSelected(false);
      setPoints(0);
      setMessage("");
      setRandomContents(generateCardContents());
      if (freePicks > 0) {
        setFreePicks(freePicks - 1);
      } else {
        setPlaysRemaining(playsRemaining - 1);
      }
      setCardPicked(false);
    }
  };

  const buttonText =
    freePicks > 0
      ? "Free Pick"
      : playsRemaining > 0
      ? "Free Pick"
      : "500 Coins";

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
      <div className=""><h2 className="txt-color1">Pick a Card</h2></div>
      {/* <div className="cancel-container">
        <FaTimes
          onClick={() => {
            goToThePage(Task, "Task");
          }}
          className="cancel-icon"
        />
      </div> */}
      {selected && <p className="task-message">{message}</p>}
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
    
      <button 
        onClick={handlePlayAgainClick}
        disabled={!cardPicked && freePicks === 0}
        className={
          playsRemaining === 0 && freePicks === 0 ? "disabled-button" : "invite-pick"
        }
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PickaWord;
