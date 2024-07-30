// import React, { useState, useEffect } from "react";
// import "./QuizplayTask.css";
// import { FaTimes } from "react-icons/fa";
// import useUserInfo from "../../../Hooks/useUserInfo";
// import QuizTask from "./QuizTask.js";

// const questions = [
//   {
//     id: 1,
//     question: "Which flower does Sarah prefer to keep in her balcony garden?",
//     options: ["Roses", "Lilies", "Orchids", "Geraniums"],
//     answer: "Orchids",
//   },
//   {
//     id: 2,
//     question:
//       "What time does Olivia aim to arrive at the airport before her flight?",
//     options: [
//       "2 hours before",
//       "3 hours before",
//       "1 hour before",
//       "4 hours before",
//     ],
//     answer: "2 hours before",
//   },
//   {
//     id: 3,
//     question: "What color is Emily's favorite chair in the living room?",
//     options: ["Brown", "Gray", "Beige", "Blue"],
//     answer: "Blue",
//   },
//   {
//     id: 4,
//     question:
//       "Which document is crucial for Alex to carry during international travel?",
//     options: [
//       "Passport",
//       "Driver's license",
//       "Health insurance card",
//       "Credit card",
//     ],
//     answer: "Passport",
//   },
//   {
//     id: 5,
//     question: "What has cities but no houses?",
//     options: ["Map", "Globe", "Telephone", "Calendar"],
//     answer: "Map",
//   },
//   {
//     id: 6,
//     question: "What type of phone charger does Sarah always keep in her bag?",
//     options: [
//       "Lightning cable",
//       "USB-C cable",
//       "Micro-USB cable",
//       "Wireless charger",
//     ],
//     answer: "USB-C cable",
//   },
//   {
//     id: 7,
//     question: "What type of sofa does Tom have in his living room?",
//     options: ["Loveseat", "Sectional sofa", "Recliner sofa", "Sleeper sofa"],
//     answer: "Sectional sofa",
//   },
//   {
//     id: 8,
//     question:
//       "Which brand of laptop charger does Jack use for his work laptop?",
//     options: ["Dell", "HP", "Lenovo", "Apple"],
//     answer: "Lenovo",
//   },
//   {
//     id: 9,
//     question: "Where does Emma keep her favorite flower pot in the garden?",
//     options: [
//       "Hanging on the railing",
//       "On the ground",
//       "On a shelf",
//       "On a pedestal",
//     ],
//     answer: "On a shelf",
//   },
//   {
//     id: 10,
//     question: "What can travel around the world while staying in a corner?",
//     options: ["Letter", "Airplane", "Globe", "Stamp"],
//     answer: "Stamp",
//   },
//   {
//     id: 11,
//     question:
//       "How long does Emily's phone battery typically last on a full charge?",
//     options: ["8 hours", "12 hours", "16 hours", "24 hours"],
//     answer: "16 hours",
//   },
//   {
//     id: 12,
//     question: "Where does Emma prefer to charge her devices at home?",
//     options: [
//       "Office desk",
//       "Bedside table",
//       "Kitchen counter",
//       "Living room sofa",
//     ],
//     answer: "Bedside table",
//   },
//   {
//     id: 13,
//     question: "How does Alex troubleshoot a laptop charger that isn't working?",
//     options: [
//       "Check the power outlet",
//       "Inspect the cable for damage",
//       "Restart the laptop",
//       "Use a different charger",
//     ],
//     answer: "Inspect the cable for damage",
//   },
//   {
//     id: 14,
//     question:
//       "Which farming technique is Farmer Mia experimenting with to improve crop yield?",
//     options: [
//       "Hydroponics",
//       "Vertical farming",
//       "Precision agriculture",
//       "Organic farming",
//     ],
//     answer: "Vertical farming",
//   },
//   {
//     id: 15,
//     question: "What goes up but never comes down?",
//     options: ["Age", "Temperature", "Airplane", "Sun"],
//     answer: "Age",
//   },
//   {
//     id: 16,
//     question:
//       "Which type of necklace does Laura like to layer with her outfits?",
//     options: ["Gold chains", "Choker", "Pendant", "Beaded"],
//     answer: "Gold chains",
//   },
//   {
//     id: 17,
//     question: "Who is John's neighbor?",
//     options: ["Peter", "Sam", "Jenny", "Sara"],
//     answer: "Sam",
//   },
//   {
//     id: 18,
//     question: "What is Sam's Beagle dog's favorite food?",
//     options: ["Chicken", "Beef", "Lamb", "Pork"],
//     answer: "Chicken",
//   },
//   {
//     id: 19,
//     question:
//       "What type of kitchen appliance does Emily use most often for cooking?",
//     options: ["Microwave", "Blender", "Toaster", "Slow cooker"],
//     answer: "Slow cooker",
//   },
//   {
//     id: 20,
//     question:
//       "I'm light as a feather, yet the strongest person can’t hold me for much longer than a minute. What am I?",
//     options: ["Breath", "Thought", "Feather", "Whisper"],
//     answer: "Breath",
//   },
//   {
//     id: 21,
//     question: "What breed is Peter's dog?",
//     options: ["Golden Retriever", "Poodle", "Beagle", "German Shepherd"],
//     answer: "German Shepherd",
//   },
//   {
//     id: 22,
//     question: "Which TV channel does Tom watch for his favorite songs?",
//     options: ["MusicMix", "SongQuest", "Melody Channel", "TuneIn TV"],
//     answer: "Melody Channel",
//   },
//   {
//     id: 23,
//     question: "What type of fan does Tom use to stay cool during summer?",
//     options: ["Ceiling fan", "Tower fan", "Pedestal fan", "Box fan"],
//     answer: "Tower fan",
//   },
//   {
//     id: 24,
//     question:
//       "Where does Jack keep his collection of board games in his living room?",
//     options: [
//       "On a shelf",
//       "In a storage ottoman",
//       "Stacked in a corner",
//       "In a cabinet",
//     ],
//     answer: "In a cabinet",
//   },
//   {
//     id: 25,
//     question: "What can you catch but not throw?",
//     options: ["Airplane", "Ball", "Cold", "Fish"],
//     answer: "Cold",
//   },
//   {
//     id: 26,
//     question: "How does Laura typically handle laundry?",
//     options: [
//       "Sorting by color and fabric",
//       "Using a pre-wash cycle",
//       "Hand washing delicate items",
//       "Dry cleaning only",
//     ],
//     answer: "Sorting by color and fabric",
//   },
//   {
//     id: 27,
//     question: "Which plant does Jessica prefer for her outdoor garden?",
//     options: ["Tomato plant", "Lavender", "Zinnias", "Ferns"],
//     answer: "Lavender",
//   },
//   {
//     id: 28,
//     question:
//       "What type of plant does Sarah choose for low-light areas in her home?",
//     options: ["ZZ plant", "Boston fern", "Aloe vera", "Cactus"],
//     answer: "ZZ plant",
//   },
//   {
//     id: 29,
//     question: "What pet does Peter have?",
//     options: ["Dog", "Parrot", "Cat", "Horse"],
//     answer: "Cat",
//   },
//   {
//     id: 30,
//     question: "The more you take, the more you leave behind. What am I?",
//     options: ["Time", "Breath", "Memories", "Footsteps"],
//     answer: "Footsteps",
//   },
// ];

// const QuizPlayTask = () => {
//   const { userDetails, updateUserInfo } = useUserInfo();
//   const [currentQuestions, setCurrentQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [score, setScore] = useState(0);
//   const [showScore, setShowScore] = useState(false);

//   useEffect(() => {
//     // Randomly select 5 unique questions
//     const selectedQuestions = [];
//     const indices = new Set();
//     while (indices.size < 5) {
//       const randomIndex = Math.floor(Math.random() * questions.length);
//       if (!indices.has(randomIndex)) {
//         indices.add(randomIndex);
//         selectedQuestions.push(questions[randomIndex]);
//       }
//     }
//     setCurrentQuestions(selectedQuestions);
//   }, []);

//   const handleAnswerOptionClick = (option) => {
//     setSelectedOption(option);
//     const isCorrect = option === currentQuestions[currentQuestionIndex].answer;
//     if (isCorrect) {
//       setScore(score + 1000);
//     } else {
//       setScore(score + 500);
//     }
//   };

//   const handleNextQuestion = () => {
//     const nextQuestionIndex = currentQuestionIndex + 1;
//     if (nextQuestionIndex < currentQuestions.length) {
//       setCurrentQuestionIndex(nextQuestionIndex);
//       setSelectedOption(null); // Reset selection for the next question
//     } else {
//       setShowScore(true);
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
//     <div className="quiz-play-task">
//       <FaTimes
//         onClick={() => {
//           goToThePage(QuizTask, "QuizTask");
//         }}
//         className="cancel-icon"
//       />
//       <h1>Quiz Game</h1>
//       {showScore ? (
//         <div className="section score-section">You scored {score} points</div>
//       ) : (
//         <>
//           <div className="question-section">
//             <div className="question-count">
//               <span> YOU HAVE {currentQuestionIndex + 1}</span>/
//               {currentQuestions.length} Question
//             </div>
//             <div className="question-text">
//               {currentQuestions[currentQuestionIndex]?.question}
//             </div>
//             <div className="answer-section">
//               {currentQuestions[currentQuestionIndex]?.options.map(
//                 (option, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleAnswerOptionClick(option)}
//                     className={selectedOption === option ? "selected" : ""}
//                   >
//                     {option}
//                   </button>
//                 )
//               )}
//             </div>
//           </div>
//           <button
//             onClick={handleNextQuestion}
//             disabled={!selectedOption}
//             className="next-button"
//           >
//             Next
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default QuizPlayTask;

import React, { useState, useEffect } from "react";
import "./QuizplayTask.css";
import { FaTimes } from "react-icons/fa";
import useUserInfo from "../../../Hooks/useUserInfo";
import QuizTask from "./QuizTask.js";

const questions = [
  {
    id: 1,
    question: "Which flower does Sarah prefer to keep in her balcony garden?",
    options: ["Roses", "Lilies", "Orchids", "Geraniums"],
    answer: "Orchids",
  },
  {
    id: 2,
    question:
      "What time does Olivia aim to arrive at the airport before her flight?",
    options: [
      "2 hours before",
      "3 hours before",
      "1 hour before",
      "4 hours before",
    ],
    answer: "2 hours before",
  },
  {
    id: 3,
    question: "What color is Emily's favorite chair in the living room?",
    options: ["Brown", "Gray", "Beige", "Blue"],
    answer: "Blue",
  },
  {
    id: 4,
    question:
      "Which document is crucial for Alex to carry during international travel?",
    options: [
      "Passport",
      "Driver's license",
      "Health insurance card",
      "Credit card",
    ],
    answer: "Passport",
  },
  {
    id: 5,
    question: "What has cities but no houses?",
    options: ["Map", "Globe", "Telephone", "Calendar"],
    answer: "Map",
  },
  {
    id: 6,
    question: "What type of phone charger does Sarah always keep in her bag?",
    options: [
      "Lightning cable",
      "USB-C cable",
      "Micro-USB cable",
      "Wireless charger",
    ],
    answer: "USB-C cable",
  },
  {
    id: 7,
    question: "What type of sofa does Tom have in his living room?",
    options: ["Loveseat", "Sectional sofa", "Recliner sofa", "Sleeper sofa"],
    answer: "Sectional sofa",
  },
  {
    id: 8,
    question:
      "Which brand of laptop charger does Jack use for his work laptop?",
    options: ["Dell", "HP", "Lenovo", "Apple"],
    answer: "Lenovo",
  },
  {
    id: 9,
    question: "Where does Emma keep her favorite flower pot in the garden?",
    options: [
      "Hanging on the railing",
      "On the ground",
      "On a shelf",
      "On a pedestal",
    ],
    answer: "On a shelf",
  },
  {
    id: 10,
    question: "What can travel around the world while staying in a corner?",
    options: ["Letter", "Airplane", "Globe", "Stamp"],
    answer: "Stamp",
  },
  {
    id: 11,
    question:
      "How long does Emily's phone battery typically last on a full charge?",
    options: ["8 hours", "12 hours", "16 hours", "24 hours"],
    answer: "16 hours",
  },
  {
    id: 12,
    question: "Where does Emma prefer to charge her devices at home?",
    options: [
      "Office desk",
      "Bedside table",
      "Kitchen counter",
      "Living room sofa",
    ],
    answer: "Bedside table",
  },
  {
    id: 13,
    question: "How does Alex troubleshoot a laptop charger that isn't working?",
    options: [
      "Check the power outlet",
      "Inspect the cable for damage",
      "Restart the laptop",
      "Use a different charger",
    ],
    answer: "Inspect the cable for damage",
  },
  {
    id: 14,
    question:
      "Which farming technique is Farmer Mia experimenting with to improve crop yield?",
    options: [
      "Hydroponics",
      "Vertical farming",
      "Precision agriculture",
      "Organic farming",
    ],
    answer: "Vertical farming",
  },
  {
    id: 15,
    question: "What goes up but never comes down?",
    options: ["Age", "Temperature", "Airplane", "Sun"],
    answer: "Age",
  },
  {
    id: 16,
    question:
      "Which type of necklace does Laura like to layer with her outfits?",
    options: ["Gold chains", "Choker", "Pendant", "Beaded"],
    answer: "Gold chains",
  },
  {
    id: 17,
    question: "Who is John's neighbor?",
    options: ["Peter", "Sam", "Jenny", "Sara"],
    answer: "Sam",
  },
  {
    id: 18,
    question: "What is Sam's Beagle dog's favorite food?",
    options: ["Chicken", "Beef", "Lamb", "Pork"],
    answer: "Chicken",
  },
  {
    id: 19,
    question:
      "What type of kitchen appliance does Emily use most often for cooking?",
    options: ["Microwave", "Blender", "Toaster", "Slow cooker"],
    answer: "Slow cooker",
  },
  {
    id: 20,
    question:
      "I'm light as a feather, yet the strongest person can’t hold me for much longer than a minute. What am I?",
    options: ["Breath", "Thought", "Feather", "Whisper"],
    answer: "Breath",
  },
  {
    id: 21,
    question: "What breed is Peter's dog?",
    options: ["Golden Retriever", "Poodle", "Beagle", "German Shepherd"],
    answer: "German Shepherd",
  },
  {
    id: 22,
    question: "Which TV channel does Tom watch for his favorite songs?",
    options: ["MusicMix", "SongQuest", "Melody Channel", "TuneIn TV"],
    answer: "Melody Channel",
  },
  {
    id: 23,
    question: "What type of fan does Tom use to stay cool during summer?",
    options: ["Ceiling fan", "Tower fan", "Pedestal fan", "Box fan"],
    answer: "Tower fan",
  },
  {
    id: 24,
    question:
      "Where does Jack keep his collection of board games in his living room?",
    options: [
      "On a shelf",
      "In a storage ottoman",
      "Stacked in a corner",
      "In a cabinet",
    ],
    answer: "In a cabinet",
  },
  {
    id: 25,
    question: "What can you catch but not throw?",
    options: ["Airplane", "Ball", "Cold", "Fish"],
    answer: "Cold",
  },
  {
    id: 26,
    question: "How does Laura typically handle laundry?",
    options: [
      "Sorting by color and fabric",
      "Using a pre-wash cycle",
      "Hand washing delicate items",
      "Dry cleaning only",
    ],
    answer: "Sorting by color and fabric",
  },
  {
    id: 27,
    question: "Which plant does Jessica prefer for her outdoor garden?",
    options: ["Tomato plant", "Lavender", "Zinnias", "Ferns"],
    answer: "Lavender",
  },
  {
    id: 28,
    question:
      "What type of plant does Sarah choose for low-light areas in her home?",
    options: ["ZZ plant", "Boston fern", "Aloe vera", "Cactus"],
    answer: "ZZ plant",
  },
  {
    id: 29,
    question: "What pet does Peter have?",
    options: ["Dog", "Parrot", "Cat", "Horse"],
    answer: "Cat",
  },
  {
    id: 30,
    question: "The more you take, the more you leave behind. What am I?",
    options: ["Time", "Breath", "Memories", "Footsteps"],
    answer: "Footsteps",
  },
];

const QuizPlayTask = () => {
  const { userDetails, updateUserInfo } = useUserInfo();
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    // Randomly select 5 unique questions
    const selectedQuestions = [];
    const indices = new Set();
    while (indices.size < 5) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      if (!indices.has(randomIndex)) {
        indices.add(randomIndex);
        selectedQuestions.push(questions[randomIndex]);
      }
    }
    setCurrentQuestions(selectedQuestions);
  }, []);

  const handleAnswerOptionClick = (option) => {
    if (!answered) {
      // Only allow selection if no answer has been submitted
      setSelectedOption(option);
      const isCorrect =
        option === currentQuestions[currentQuestionIndex].answer;
      if (isCorrect) {
        setScore(score + 1000);
      } else {
        setScore(score + 500);
      }
      setAnswered(true); // Prevent further selections
    }
  };

  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < currentQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedOption(null);
      setAnswered(false); // Allow answers for the next question
    } else {
      setShowScore(true);
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
    <div className="quiz-play-task">
      {/* <FaTimes
        onClick={() => {
          goToThePage(QuizTask, "QuizTask");
        }}
        className="cancel-icon"
      /> */}
      <h1 className="welcome-text txt-color1">Quiz Game!</h1>
      {showScore ? (
        <div className="section score-section"><h2 className="phase-text1">You scored {score} points</h2></div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count "><h2 className="phase-text1"> 
              <span className=""> YOU HAVE {currentQuestionIndex + 1}</span>/
              {currentQuestions.length} Question </h2>
            </div>
            <div className="question-text">
              {currentQuestions[currentQuestionIndex]?.question}
            </div>
            <div className="answer-section">
              {currentQuestions[currentQuestionIndex]?.options.map(
                (option, index) => (
                  <button
                    key={option}
                    onClick={() => handleAnswerOptionClick(option)}
                    style={{
                      backgroundColor:
                        selectedOption === option
                          ? option ===
                            currentQuestions[currentQuestionIndex].answer
                            ? "green"
                            : "red"
                          : answered &&
                            option ===
                              currentQuestions[currentQuestionIndex].answer
                          ? "lightgreen"
                          : "initial",
                      color: "white",
                    }}
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          </div>
          <button
            onClick={handleNextQuestion}
            disabled={!selectedOption}
            className="next-button"
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default QuizPlayTask;
