import React, { useState, useEffect } from "react";
import "./QuizplayTask.css";
import { FaTimes, FaCheck } from "react-icons/fa";
import useUserInfo from "../../../Hooks/useUserInfo";
import QuizTask from "./QuizTask.js";
import "react-datepicker/dist/react-datepicker.css";
import { format, startOfDay, differenceInCalendarDays } from "date-fns";
import ReactDatePicker from "react-datepicker";
import logo from "../../../assets/images/coinlogo.png";
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
  {
    id: 31,
    question:
      "What is Laura’s go-to plant for adding greenery to her workspace?",
    options: ["Succulent", "Bamboo", "Snake plant", "Philodendron"],
    answer: "Bamboo",
  },
  {
    id: 32,
    question: "Which jewelry style does Chloe most enjoy for casual wear?",
    options: [
      "Bangles",
      "Hoop earrings",
      "Charm bracelet",
      "Layered necklaces",
    ],
    answer: "Hoop earrings",
  },
  {
    id: 33,
    question: "What is Emily’s favorite type of houseplant?",
    options: ["Snake plant", "Spider plant", "Peace lily", "Pothos"],
    answer: "Pothos",
  },
  {
    id: 34,
    question: "Where does Tom keep his collection of spices in the kitchen?",
    options: [
      "Spice rack",
      "Pantry shelf",
      "Kitchen drawer",
      "Cabinet door organizer",
    ],
    answer: "Spice rack",
  },
  {
    id: 35,
    question: "I’m tall when I’m young, and I’m short when I’m old. What am I?",
    options: ["Pencil", "Candle", "Tree", "Rope"],
    answer: "Candle",
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
  const [startDate, setStartDate] = useState(new Date());
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    const baseDate = new Date("2024-01-01"); // Set this to a fixed starting point or the launch date of the quiz.
    const dayIndex = differenceInCalendarDays(
      startOfDay(new Date()),
      startOfDay(baseDate)
    ); // Calculate the number of days since the base date.
    const questionsPerDay = 5; // Number of questions to show each day.
    const startIndex = dayIndex * questionsPerDay; // Calculate the start index based on the day index.
    const endIndex = startIndex + questionsPerDay; // Calculate the end index.
    const selectedQuestions = questions.slice(startIndex, endIndex); // Slice the questions array to get the questions for the day.

    setCurrentQuestions(selectedQuestions);
    setCurrentQuestionIndex(0); // Reset to the first question of the day.
    setAnswered(false); // Allow answers for new questions.
  }, []);

  //   const handleAnswerOptionClick = (option) => {
  //     if (!answered) {
  //       // Only allow selection if no answer has been submitted
  //       setSelectedOption(option);
  //       const isCorrect =
  //         option === currentQuestions[currentQuestionIndex].answer;
  //       if (isCorrect) {
  //         setScore(score + 1000);
  //       } else {
  //         setScore(score + 500);
  //       }
  //       setAnswered(true); // Prevent further selections
  //     }
  //   };

  const handleAnswerOptionClick = (option) => {
    if (!answered) {
      // Only allow selection if no answer has been submitted
      setSelectedOption(option);
      const isCorrect =
        option === currentQuestions[currentQuestionIndex].answer;

      // Update the score based on whether the answer is correct
      const pointsAwarded = isCorrect ? 1000 : 500;
      setScore((prevScore) => prevScore + pointsAwarded);

      // Console log the results
      // console.log(
      //   `Answer is ${
      //     isCorrect ? "correct" : "incorrect"
      //   }. Points awarded: ${pointsAwarded}`
      // );
      // console.log(`Total points: ${score + pointsAwarded}`);

      setAnswered(true); // Prevent further selections

      // Check if it's the last question
      if (currentQuestionIndex + 1 === currentQuestions.length) {
        const formattedDate = format(new Date(), "yyyy-MM-dd"); // Use today's date
        const result = {
          date: formattedDate,
          score: score + pointsAwarded,
          completed: true,
        };

        // Store the result in local storage
        localStorage.setItem(
          `quizResult_${formattedDate}`,
          JSON.stringify(result)
        );

        // console.log("Quiz completed. Final score:", score + pointsAwarded);
      }
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

  // useEffect(() => {
  //   console.log(answered);
  // }, [answered]);

  // useEffect(() => {
  //   const baseDate = new Date("2024-01-01");
  //   const formattedDate = format(startDate, "yyyy-MM-dd");
  //   const storedResults = localStorage.getItem(formattedDate);
  //   if (storedResults) {
  //     setQuizComplete(true);
  //     setCurrentQuestions([]);
  //   } else {
  //     const dayIndex = differenceInCalendarDays(
  //       startOfDay(startDate),
  //       startOfDay(baseDate)
  //     );
  //     const startIndex = (dayIndex % (questions.length / 5)) * 5;
  //     setCurrentQuestions(questions.slice(startIndex, startIndex + 5));
  //     setQuizComplete(false);
  //   }
  // }, [startDate]);
  useEffect(() => {
    const baseDate = new Date("2024-01-01");
    const dayIndex = differenceInCalendarDays(
      startOfDay(startDate),
      startOfDay(baseDate)
    );
    const startIndex = (dayIndex * 5) % questions.length; // Modulo to wrap around if day index exceeds length of questions array
    setCurrentQuestions(questions.slice(startIndex, startIndex + 5));
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setAnswered(false);
    setScore(0);
  }, [startDate]);

  const handleQuizCompletion = () => {
    const formattedDate = format(startDate, "yyyy-MM-dd");
    localStorage.setItem(formattedDate, JSON.stringify({ completed: true }));
    setQuizComplete(true);
  };

  return (
    <div className="quiz-play-task">
      {/* <ReactDatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="yyyy-MM-dd"
      /> */}

      <FaTimes
        onClick={() => {
          goToThePage(QuizTask, "QuizTask");
        }}
        className="cancel-icon"
      />
      <h1 className="quizgame-datetext">
        Quiz Game {format(startDate, "PPP")}
      </h1>

      {showScore ? (
        <div className="cards">
          <h1 className="title-epic">Epic Win!</h1>
          <div className="pointsContainer">
            <div className="pointsInnerContainer">
              <p className="pointsLabel">POINTS EARNED </p>
              <div className="pointsValue">
                <img src={logo} />
                <p className="pointsNumber">{score}</p>
              </div>
            </div>
          </div>
          <p className="bottom-text">
            Play daily to boost your score <br /> and rack up more points!
          </p>
        </div>
      ) : (
        <>
          <div className="question-count">
            <span> YOU HAVE {currentQuestionIndex + 1}</span>/
            {currentQuestions.length} Question
          </div>
          <div className="question-section">
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
                          ? "green"
                          : "initial",
                      color: "white",
                    }}
                  >
                    {option}

                    {answered ? (
                      selectedOption !== option &&
                      option ===
                        currentQuestions[currentQuestionIndex].answer ? (
                        <FaCheck
                          style={{ marginLeft: "10px", color: "white" }}
                        />
                      ) : null
                    ) : null}

                    {answered ? (
                      selectedOption === option ? (
                        option ===
                        currentQuestions[currentQuestionIndex].answer ? (
                          <FaCheck
                            style={{ marginLeft: "10px", color: "white" }}
                          />
                        ) : (
                          <FaTimes
                            style={{ marginLeft: "10px", color: "white" }}
                          />
                        )
                      ) : null
                    ) : null}
                  </button>
                )
              )}
            </div>
          </div>
          <button
            onClick={handleNextQuestion}
            disabled={!selectedOption}
            className="quitz-btn"
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default QuizPlayTask;
