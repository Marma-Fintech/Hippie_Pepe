import React, { useState, useEffect, useRef } from "react";
import "./Streak.css";
import questionMarkIcon from "../../assets/Task/ReferImg.png";
import StreakBreakPoints from "../StreakBreakPoints/StreakBreakPoints";
import useUserInfo from "../../Hooks/useUserInfo";
import logo from "../../assets/images/meme-logo.svg";
import twitter from "../../assets/images/twitter.svg";
import {
  getUserStreaks,
  calculateStreak,
  calculateStreakOfStreak,
  loginStreakRewardClaim,
  watchStreakRewardClaim,
  referStreakRewardClaim,
  taskStreakRewardClaim,
  multiStreakRewardClaim,
  streakOfStreakRewardClaim,
} from "../../apis/user";
import { differenceInDays } from "date-fns";

const Streak = () => {
  const [day, setDay] = useState(1);
  const [normalDay, setNormalDay] = useState(1);
  var dayRef = useRef(1);

  const [claimedLoginDays, setClaimedLoginDays] = useState([]);
  const [claimedWatchDays, setClaimedWatchDays] = useState([]);
  const [claimedReferDays, setClaimedReferDays] = useState([]);
  const [claimedTaskDays, setClaimedTaskDays] = useState([]);
  const [claimedMultiDays, setClaimedMultiDays] = useState([]);
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();
  const [streakData, setStreakData] = useState(
    userDetails.userDetails.streakData
  );
  const [streakOfStreakData, setStreakOfStreakData] = useState(
    userDetails.userDetails.streakOfStreakData
  );
  const [loginStreakReward, setLoginStreakReward] = useState(0);
  const [watchStreakReward, setWatchStreakReward] = useState(0);
  const [referStreakReward, setReferStreakReward] = useState(0);
  const [taskStreakReward, setTaskStreakReward] = useState(0);
  const [multiStreakReward, setMultiStreakReward] = useState(0);
  const [streakOfStreakReward, setStreakOfStreakReward] = useState(0);

  const goToThePage = (component, name) => {
    updateUserInfo((prev) => {
      return {
        ...prev,
        ...{
          currentComponent: component,
          currentComponentText: name,
          lastComponent: userDetails.currentComponent,
          lastComponentText: userDetails.currentComponentText,
          centerCount: userDetails.centerCount + 1,
        },
      };
    });
  };

  const [startDay, setStartDay] = useState(0);

  const referStreakRewardArray = [1000, 2000, 3000, 5000, 10000, 15000, 25000];
  const login_watch_taskStreakRewardArray = [
    100, 200, 400, 800, 1600, 3200, 6400,
  ];

  const multiStreakRewardArray = [1300, 2100, 4200, 8400, 16800, 33600, 67200];

  //function to check day cnd change the day, if they start in a middle day
  const dayCheck = async (n) => {
    setNormalDay(n);
    const dayCount = n - startDay;
    if (dayCount == 0) {
      setDay(1);
      dayRef.current = 1;
    } else if (dayCount == 1) {
      setDay(2);
      dayRef.current = 2;
    } else if (dayCount == 2) {
      setDay(3);
      dayRef.current = 3;
    } else if (dayCount == 3) {
      setDay(4);
      dayRef.current = 4;
    } else if (dayCount == 4) {
      setDay(5);
      dayRef.current = 5;
    } else if (dayCount == 5) {
      setDay(6);
      dayRef.current = 6;
    }
  };

  //function to calculate day reward
  const calculateReward = async () => {
    const data = {
      telegramId: userDetails.userDetails.telegramId,
      userWatchSeconds: 0,
    };
    // Calculate streak data and update the state
    const calculatedStreakData = await calculateStreak(data);
    setStreakData(calculatedStreakData);
    //Fetch streak data using get api
    const getStreakData = await getUserStreaks(data.telegramId);
    if (getStreakData) {
      setClaimedLoginDays(getStreakData.claimedLoginDays);
      setClaimedWatchDays(getStreakData.claimedWatchDays);
      setClaimedReferDays(getStreakData.claimedReferDays);
      setClaimedTaskDays(getStreakData.claimedTaskDays);
      setClaimedMultiDays(getStreakData.claimedMultiDays);
    }

    if (
      calculatedStreakData.login &&
      calculatedStreakData.watch &&
      calculatedStreakData.refer &&
      calculatedStreakData.task
    ) {
      // Calculate and update streak of streak data if needed
      const calculatedStreakOfStreakData = await calculateStreakOfStreak(
        data.telegramId
      );
      // Check if there is no error message in the response
      if (
        calculatedStreakOfStreakData &&
        calculatedStreakOfStreakData.message !==
          "User has not completed all streaks"
      ) {
        // Update state only if there is no error
        setStreakOfStreakData(calculatedStreakOfStreakData);
        setMultiStreakReward(
          calculatedStreakOfStreakData.streakOfStreak.multiStreakReward[
            dayRef.current - 1
          ]
        );
        let rewardAmount = 0;
        for (
          let i =
            calculatedStreakOfStreakData.streakOfStreak.streakOfStreakRewards
              .length - 1;
          i >= 0;
          i--
        ) {
          rewardAmount +=
            calculatedStreakOfStreakData.streakOfStreak.streakOfStreakRewards[
              i
            ];
        }
        setStreakOfStreakReward(rewardAmount);
      } else {
        console.log("Error: " + calculatedStreakOfStreakData.message);
      }
    }
    setLoginStreakReward(
      calculatedStreakData.loginStreak.loginStreakReward[dayRef.current - 1]
    );
    setWatchStreakReward(
      calculatedStreakData.watchStreak.watchStreakReward[dayRef.current - 1]
    );
    setReferStreakReward(
      calculatedStreakData.referStreak.referStreakReward[dayRef.current - 1]
    );
    setTaskStreakReward(
      calculatedStreakData.taskStreak.taskStreakReward[dayRef.current - 1]
    );
  };

  useEffect(() => {
    calculateReward();
  }, [day]);

  const handleLoginClaimClick = async () => {
    setLoginStreakReward(
      streakData.loginStreak.loginStreakReward[dayRef.current - 1]
    );
    const data = {
      telegramId: userDetails.userDetails.telegramId,
      index: day - 1,
    };
    if (
      streakData.loginStreak.loginStreakReward[dayRef.current - 1] != undefined
    ) {
      const response = await loginStreakRewardClaim(data);
      console.log(response);
      setLoginStreakReward(0);
      calculateReward();
    }
  };

  const handleWatchClaimClick = async () => {
    setWatchStreakReward(
      streakData.watchStreak.watchStreakReward[dayRef.current - 1]
    );
    const data = {
      telegramId: userDetails.userDetails.telegramId,
      index: day - 1,
    };
    if (streakData.watchStreak.watchStreakReward[day - 1] != undefined) {
      const response = await watchStreakRewardClaim(data);
      console.log(response);
      setWatchStreakReward(0);
      calculateReward();
    }
  };

  const handleReferClaimClick = async () => {
    setReferStreakReward(
      streakData.referStreak.referStreakReward[dayRef.current - 1]
    );
    const data = {
      telegramId: userDetails.userDetails.telegramId,
      index: day - 1,
    };
    if (streakData.referStreak.referStreakReward[day - 1] != undefined) {
      const response = await referStreakRewardClaim(data);
      console.log(response);
      setReferStreakReward(0);
      calculateReward();
    }
  };

  const handleGameClaimClick = async () => {
    setTaskStreakReward(
      streakData.taskStreak.taskStreakReward[dayRef.current - 1]
    );
    const data = {
      telegramId: userDetails.userDetails.telegramId,
      index: day - 1,
    };
    if (
      streakData.taskStreak.taskStreakReward[dayRef.current - 1] != undefined
    ) {
      const response = await taskStreakRewardClaim(data);
      console.log(response);
      setTaskStreakReward(0);
      calculateReward();
    }
  };

  const handleMultiClaimClick = async () => {
    if (
      streakData.login &&
      streakData.watch &&
      streakData.refer &&
      streakData.task
    ) {
      setMultiStreakReward(
        streakOfStreakData.streakOfStreak.multiStreakReward[dayRef.current - 1]
      );
      const data = {
        telegramId: userDetails.userDetails.telegramId,
        index: day - 1,
      };
      if (
        streakOfStreakData.streakOfStreak.multiStreakReward[
          dayRef.current - 1
        ] != undefined
      ) {
        const response = await multiStreakRewardClaim(data);
        console.log(response);
        setMultiStreakReward(0);
        calculateReward();
      }
    }
  };

  const handleSOSClaimClick = async () => {
    if (
      streakData.login &&
      streakData.watch &&
      streakData.refer &&
      streakData.task
    ) {
      let rewardAmount = 0;
      for (
        let i =
          streakOfStreakData.streakOfStreak.streakOfStreakRewards.length - 1;
        i >= 0;
        i--
      ) {
        rewardAmount +=
          streakOfStreakData.streakOfStreak.streakOfStreakRewards[i];
      }
      setStreakOfStreakReward(rewardAmount);
      const data = {
        telegramId: userDetails.userDetails.telegramId,
      };
      if (
        streakOfStreakData.streakOfStreak.streakOfStreakRewards[
          streakOfStreakData.streakOfStreak.streakOfStreakRewards.length - 1
        ] != undefined
      ) {
        const response = await streakOfStreakRewardClaim(data);
        console.log(response);
        setMultiStreakReward(0);
        calculateReward();
      }
    }
  };

  useEffect(() => {
    const fetchStreakData = async () => {
      try {
        const data = {
          telegramId: userDetails.userDetails.telegramId,
          userWatchSeconds: 0,
        };
        // Fetch streak data using get api
        const getStreakData = await getUserStreaks(data.telegramId);
        if (getStreakData) {
          setClaimedLoginDays(getStreakData.claimedLoginDays);
          setClaimedWatchDays(getStreakData.claimedWatchDays);
          setClaimedReferDays(getStreakData.claimedReferDays);
          setClaimedTaskDays(getStreakData.claimedTaskDays);
          setClaimedMultiDays(getStreakData.claimedMultiDays);
        }
        //updating startDay (use state)
        setStartDay(getStreakData.startDay);

        // Calculate streak data and update the state
        const calculatedStreakData = await calculateStreak(data);
        setStreakData(calculatedStreakData);
        if (
          calculatedStreakData.login &&
          calculatedStreakData.watch &&
          calculatedStreakData.refer &&
          calculatedStreakData.task
        ) {
          // Calculate and update streak of streak data if needed
          const calculatedStreakOfStreakData = await calculateStreakOfStreak(
            data.telegramId
          );
          // Check if there is no error message in the response
          if (
            calculatedStreakOfStreakData &&
            calculatedStreakOfStreakData.message !==
              "User has not completed all streaks"
          ) {
            // Update state only if there is no error
            setStreakOfStreakData(calculatedStreakOfStreakData);
          } else {
            console.log("Error: " + calculatedStreakOfStreakData.message);
          }
        }
        await calculateReward();
      } catch (error) {
        console.error("Error fetching or calculating streak data:", error);
      }
    };
    fetchStreakData();
  }, [userDetails.userDetails.telegramId]); // Dependency array to run the effect when telegramId changes

  return (
    <>
      <div className="info-img scroll">
        <div
          className="menupointer stuff-body"
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            // justifyContent: "center",
            marginTop: "15%",
            flexDirection: "column",
            pointerEvents: "all",
          }}
        >
          <div className="streakContainer">
            <h1 className="streaktext">STREAK</h1>
            <img
              onMouseEnter={() => {
                goToThePage(StreakBreakPoints, "streakBreakPoints");
              }}
              src={questionMarkIcon}
              alt="Question Mark Icon"
              className="questionMarkIcon"
            />
          </div>
          <div class="container-fluid">
            <div class="scrolling-wrapper row flex-row flex-nowrap">
              <div class="col-4">
                <div
                  class={
                    startDay > 1
                      ? "card-block1 card card-1 com-days"
                      : "card card-block card-1"
                  }
                >
                  <button
                    className="btn-none"
                    onClick={() => {
                      dayCheck(1);
                    }}
                    disabled={startDay > 1 ? true : false}
                  >
                    {" "}
                    DAY 1{" "}
                  </button>
                </div>
              </div>
              <div class="col-4">
                <div
                  class={
                    startDay > 2
                      ? "card-block1 card card-1 com-days"
                      : "card card-block card-1"
                  }
                >
                  <button
                    className="btn-none"
                    onClick={() => {
                      dayCheck(2);
                    }}
                    disabled={startDay > 2 ? true : false}
                  >
                    {" "}
                    DAY 2{" "}
                  </button>
                </div>
              </div>
              <div class="col-4">
                <div
                  class={
                    startDay > 3
                      ? "card-block1 card card-1 com-days"
                      : "card card-block card-1"
                  }
                >
                  {" "}
                  <button
                    className="btn-none"
                    onClick={() => {
                      dayCheck(3);
                    }}
                    disabled={startDay > 3 ? true : false}
                  >
                    {" "}
                    DAY 3{" "}
                  </button>
                </div>
              </div>
              <div class="col-4">
                <div
                  class={
                    startDay > 4
                      ? "card-block1 card card-1 com-days"
                      : "card card-block card-1"
                  }
                >
                  {" "}
                  <button
                    className="btn-none"
                    onClick={() => {
                      dayCheck(4);
                    }}
                    disabled={startDay > 4 ? true : false}
                  >
                    {" "}
                    DAY 4{" "}
                  </button>
                </div>
              </div>
              <div class="col-4">
                <div
                  class={
                    startDay > 5
                      ? "card-block1 card card-1 com-days"
                      : "card card-block card-1"
                  }
                >
                  {" "}
                  <button
                    className="btn-none"
                    onClick={() => {
                      dayCheck(5);
                    }}
                    disabled={startDay > 5 ? true : false}
                  >
                    {" "}
                    DAY 5{" "}
                  </button>
                </div>
              </div>
              <div class="col-4">
                <div
                  class={
                    startDay > 6
                      ? "card-block1 card card-1 com-days"
                      : "card card-block card-1"
                  }
                >
                  <button
                    className="btn-none"
                    onClick={() => {
                      dayCheck(6);
                    }}
                    disabled={startDay > 6 ? true : false}
                  >
                    {" "}
                    DAY 6{" "}
                  </button>
                </div>
              </div>
              <div class="col-4">
                <div
                  class={
                    startDay > 7
                      ? "card-block1 card card-1 com-days"
                      : "card card-block card-1"
                  }
                >
                  <button
                    className="btn-none"
                    onClick={() => {
                      dayCheck(7);
                    }}
                    disabled={startDay > 7 ? true : false}
                  >
                    {" "}
                    DAY 7{" "}
                  </button>{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="row mt10 cheap-stuff" style={{ width: "100%" }}>
            <div className="col-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a32d4767f07e35eed25cbb58c62b6e3e02828c9e572ce8ea3b6670916cbe8671?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                alt="Login streak icon"
                className="image"
              />
            </div>
            <div className="col-7 stuff-text">
              <h4>Login Streak</h4>
              <p className="stuff-p">
                <img src={logo} />{" "}
                {loginStreakReward === undefined
                  ? "0"
                  : claimedLoginDays[normalDay - 1]
                  ? `+${login_watch_taskStreakRewardArray[day - 1]}`
                  : `+${loginStreakReward}`}{" "}
              </p>
            </div>
            <div className="col-3">
              <button
                className={`stuff-claim ${
                  claimedLoginDays[normalDay - 1] ? "claimed" : ""
                }`}
                onClick={handleLoginClaimClick}
                style={{ cursor: "pointer" }}
                disabled={claimedLoginDays[normalDay - 1]}
              >
                {claimedLoginDays[normalDay - 1]
                  ? "CLAIMED"
                  : loginStreakReward > 0
                  ? "CLAIM"
                  : "GO"}
              </button>
            </div>
          </div>
          <div className="row mt10 cheap-stuff" style={{ width: "100%" }}>
            <div className="col-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b5a03a049db265cb188f96311f2011c0d512a033e5d53ad816443dd4ad0eec1?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                alt="Watch Streak Icon"
                className="image"
              />
            </div>
            <div className="col-7 stuff-text">
              <h4>Watch Streak</h4>
              <p className="stuff-p">
                <img src={logo} />{" "}
                {watchStreakReward === undefined
                  ? "0"
                  : claimedWatchDays[normalDay - 1]
                  ? `+${login_watch_taskStreakRewardArray[day - 1]}`
                  : `+${watchStreakReward}`}{" "}
              </p>
            </div>
            <div className="col-3">
              <button
                className={`stuff-claim ${
                  claimedWatchDays[normalDay - 1] ? "claimed" : ""
                }`}
                onClick={handleWatchClaimClick}
                style={{ cursor: "pointer" }}
                disabled={claimedWatchDays[normalDay - 1]}
              >
                {claimedWatchDays[normalDay - 1]
                  ? "CLAIMED"
                  : watchStreakReward > 0
                  ? "CLAIM"
                  : "GO"}
              </button>
            </div>
          </div>
          <div className="row mt10 cheap-stuff" style={{ width: "100%" }}>
            <div className="col-2">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0eb953a6da27d088a419ecf530736727ca1f124475b9460d890398ef1438fc31?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                className="image"
                alt=""
              />
            </div>
            <div className="col-7 stuff-text">
              <h4>Refer streak</h4>
              <p className="stuff-p">
                <img src={logo} />{" "}
                {referStreakReward === undefined
                  ? "0"
                  : claimedReferDays[normalDay - 1]
                  ? `+${referStreakRewardArray[day - 1]}`
                  : `+${referStreakReward}`}{" "}
              </p>
            </div>
            <div className="col-3">
              <button
                className={`stuff-claim ${
                  claimedReferDays[normalDay - 1] ? "claimed" : ""
                }`}
                onClick={handleReferClaimClick}
                style={{ cursor: "pointer" }}
                disabled={claimedReferDays[normalDay - 1]}
              >
                {claimedReferDays[normalDay - 1]
                  ? "CLAIMED"
                  : referStreakReward > 0
                  ? "CLAIM"
                  : "GO"}
              </button>
            </div>
          </div>
          <div className="row mt10 cheap-stuff" style={{ width: "100%" }}>
            <div className="col-2">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d91855f4c21d7155a4b865bac0a53627ec417e8c7b74d7d40f533e5b8e895a3?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                points="1,000"
                altText="Game icon"
                className="image"
                alt=""
              />
            </div>
            <div className="col-7 stuff-text">
              <h4>Game Streak</h4>
              <p className="stuff-p">
                <img src={logo} />{" "}
                {taskStreakReward === undefined
                  ? "0"
                  : claimedTaskDays[normalDay - 1]
                  ? `+${login_watch_taskStreakRewardArray[day - 1]}`
                  : `+${taskStreakReward}`}{" "}
              </p>
            </div>
            <div className="col-3">
              <button
                className={`stuff-claim ${
                  claimedTaskDays[normalDay - 1] ? "claimed" : ""
                }`}
                onClick={handleGameClaimClick}
                style={{ cursor: "pointer" }}
                disabled={claimedTaskDays[normalDay - 1]}
              >
                {claimedTaskDays[normalDay - 1]
                  ? "CLAIMED"
                  : taskStreakReward > 0
                  ? "CLAIM"
                  : "GO"}
              </button>
            </div>
          </div>
          <div className="row mt10 cheap-stuff" style={{ width: "100%" }}>
            <div className="col-2">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0eb953a6da27d088a419ecf530736727ca1f124475b9460d890398ef1438fc31?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                className="image"
                alt=""
              />
            </div>
            <div className="col-7 stuff-text">
              <h4>Multi Streak</h4>
              <p className="stuff-p">
                <img src={logo} />{" "}
                {multiStreakReward === undefined
                  ? "0"
                  : claimedMultiDays[normalDay - 1]
                  ? `+${multiStreakRewardArray[day - 1]}`
                  : multiStreakReward === 0
                  ? `${multiStreakReward}`
                  : `+${multiStreakReward}`}{" "}
              </p>
            </div>
            <div className="col-3">
              <button
                className={`stuff-claim ${
                  claimedMultiDays[normalDay - 1] ? "claimed" : ""
                }`}
                onClick={handleMultiClaimClick}
                style={{ cursor: "pointer" }}
                disabled={claimedMultiDays[normalDay - 1]}
              >
                {claimedMultiDays[normalDay - 1]
                  ? "CLAIMED"
                  : multiStreakReward > 0
                  ? "CLAIM"
                  : "GO"}
              </button>
            </div>
          </div>
          <div
            class={
              streakOfStreakReward === 0 || streakOfStreakReward === undefined
                ? "invite-fri-sos"
                : "invite-fri"
            }
          >
            <button
              className={
                streakOfStreakReward === 0 || streakOfStreakReward === undefined
                  ? "btn-none sos-none"
                  : "btn-none sos"
              }
              onClick={handleSOSClaimClick}
              style={{ cursor: "pointer" }}
              disabled={
                streakOfStreakReward === 0 || streakOfStreakReward === undefined
                  ? true
                  : false
              }
            >
              STREAK OF STREAK
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Streak;
