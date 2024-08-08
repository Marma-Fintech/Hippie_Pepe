import React, { useEffect, useState, useRef } from "react";
import "./Tv.css";
import settings from "../../assets/images/settings.png";
import help from "../../assets/images/help.png";
import memetv from "../../assets/images/meme-logo.svg";
import useUserInfo from "../../Hooks/useUserInfo";
import ProgressBar from "react-bootstrap/ProgressBar";
import marketPlack from "../../assets/images/marketPlace.svg";
import leaderBoarder from "../../assets/images/leaderBoard.svg";
import { addWatchSeconds } from "../../apis/user";
import { UserDeatils } from "../../apis/user";
import marketPlace from "../MarketPlace/marketPlace";
// import cheapStuff from "../CheapStuff/cheapStuff";
import TotalPoints from "../TotalPoints/TotalPoints";
import Phase from "../PhasePage/PhasePage";
import DoandEarn from "../DoEarn/DoEarn";
import Info from "../PhaseDetails/PhaseDetails";

const Tv = () => {
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();
  const [secs, setSecs] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(
    userDetails.userDetails?.level
  );

  const secsRef = useRef(secs);
  const [tapPoints, setTapPoints] = useState(0);
  const tapPointsRef = useRef(secs);
  const [boosterSec, setBoosterSec] = useState();
  const energy = useRef(5000);
  const boosterRef = useRef(false);
  const [boosterPoints, setBoosterPoints] = useState(0);
  const boosterPointsRef = useRef(0);

  const level = {
    1: 1000,
    2: 10000,
    3: 50000,
    4: 100000,
    5: 250000,
    6: 500000,
    7: 1000000,
    8: 5000000,
    9: 10000000,
  };

  const intervalRef = useRef(null);
  const boostIntervalRef = useRef(null);
  const boostSecref = useRef(0);
  const isInterval = useRef(false);

  const [showTapPoints, setShowTapPoints] = useState(false);
  const [tapAnimations, setTapAnimations] = useState([]);

  useEffect(() => {
    // console.log(JSON.stringify(watchScreen) + "wawawawawawawawawawawawawawaw");
    // if (watchScreen.booster && !watchScreen.isBoosterStarted) {
    //   const boosterDuration = {
    //     levelUp: 60,
    //     tap: 60,
    //     "2x": 60,
    //     "3x": 120,
    //     "5x": 180,
    //   };
    //   // if (watchScreen.boosterDetails.name) {
    //   boosterRef.current = watchScreen.boosterDetails.name;
    //   // }
    //   setBoosterSec(
    //     boosterSec + boosterDuration[watchScreen.boosterDetails.name]
    //   );
    //   // if (!isInterval.current) {
    //   // boosterInterval();
    //   // }
    //   boostSecref.current =
    //     boostSecref.current + boosterDuration[watchScreen.boosterDetails.name];
    //   // console.log(JSON.stringify(boostIntervalRef) + ";lkjhsdfghjlkjhgdfgh");
    //   updatewatchScreenInfo((prev) => {
    //     return {
    //       ...prev,
    //       boosterSec:
    //         watchScreen.boosterSec +
    //         boosterDuration[watchScreen.boosterDetails.name],
    //     };
    //   });
    // }
    // if(watchScreen.booster && !watchScreen.isBoosterStarted && boosterSec > 0){
    // }
  }, [watchScreen]);

  // const boosterInterval = () => {
  //   console.log("ghjjgvgvk");
  //   boostIntervalRef.current = setInterval(() => {
  //     // console.log("kjhgkjhg");
  //     if (boostSecref.current !== 0) {
  //       isInterval.current = true;
  //       boostSecref.current = boostSecref.current - 1;
  //       setBoosterSec((prev) => prev - 1);
  //     }
  //     if (boostSecref.current === 0) {
  //       isInterval.current = false;
  //       clearInterval(boostIntervalRef.current);
  //       addWatchSec();
  //     }
  //   }, 1000);
  // };

  useEffect(() => {
    // setBoosterSec(watchScreen.boosterSec);
    intervalRef.current = setInterval(() => {
      // var count = 0;

      const values = {
        levelUp: 1,
        "2x": currentLevel * 2,
        "3x": currentLevel * 3,
        "5x": currentLevel * 5,
      };
      if (
        boosterRef.current === "levelUp" ||
        boosterRef.current === "2x" ||
        boosterRef.current === "3x" ||
        boosterRef.current === "5x"
      ) {
        setBoosterPoints(boosterPoints + values[boosterRef.current]);
        boosterPointsRef.current =
          boosterPointsRef.current + values[boosterRef.current];
      }

      setSecs((prevSecs) => prevSecs + currentLevel);
      secsRef.current = secsRef.current + 1;
    }, 1000);

    updatewatchScreenInfo((prev) => {
      return {
        ...prev,
        totalReward: userDetails.userDetails?.totalRewards,
      };
    });

    // Cleanup interval on component unmount
    return () => {
      clearInterval(intervalRef.current);
      // addWatchSec();
      updatewatchScreenInfo((prev) => {
        return {
          ...prev,
          ...{
            boosterSec: boosterSec,
          },
        };
      });
    };
  }, []);

  const getUserDetails = async (data) => {
    const userDetails = await UserDeatils(data);
    // console.log(JSON.stringify(userDetails) + " referredIdFromUrl  ");
    // console.log(JSON.stringify(watchScreen) + " referredIdFromUrl  ");

    updateUserInfo((prev) => {
      return {
        ...prev,
        ...{
          userDetails: userDetails,
        },
      };
    });

    updatewatchScreenInfo((prev) => {
      return {
        ...prev,
        ...{
          boostersList: userDetails?.boosters,
        },
      };
    });
  };

  const addWatchSec = async () => {
    var data;
    if (boosterRef.current) {
      data = {
        telegramId: userDetails.userDetails.telegramId,
        userWatchSeconds: secsRef.current,
        boosterPoints: String(tapPointsRef.current + boosterPointsRef.current),
        boosters: [boosterRef.current],
      };
    } else {
      data = {
        telegramId: userDetails.userDetails.telegramId,
        userWatchSeconds: secsRef.current,
        boosterPoints: String(tapPointsRef.current),
        // boosters: [boosterRef.current],
      };
    }

    const res = await addWatchSeconds(data);
    // console.log(JSON.stringify(res));

    updatewatchScreenInfo((prev) => {
      return {
        ...prev,
        ...{
          booster: false,
          boosterDetails: {},
        },
      };
    });

    boosterRef.current = false;

    const userData = {
      name: userDetails.userDetails.name,
      telegramId: userDetails.userDetails.telegramId,
    };
    getUserDetails(userData);
  };

  useEffect(() => {
    // Update the current level based on total points
    Object.keys(level).forEach((lvl) => {
      if (
        Number(watchScreen.totalReward + secs + tapPointsRef.current) >=
        Number(level[lvl])
      ) {
        setCurrentLevel(Number(lvl) + 1);
      }
    });
  }, [watchScreen, secs]);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "k";
    return num;
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
          centerCount: userDetails.centerCount + 1,
        },
      };
    });
  };

  const handleTap = (e) => {
    var num = 5;
    if (watchScreen?.boosterDetails?.name === "tap" && watchScreen?.booster) {
      num = 25;
    }

    setTapPoints((prev) => prev + num);
    tapPointsRef.current = tapPoints + num;

    const newAnimation = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setTapAnimations((prev) => [...prev, newAnimation]);
    setTimeout(() => {
      setTapAnimations((prev) =>
        prev.filter((animation) => animation.id !== newAnimation.id)
      );
    }, 1000);
  };

  return (
    <div
      className="tvContainer menupointer"
      style={{ height: "100%", width: "100%" }}
    >
      <div className="row level-div text-center">
        <div className="col-6">
          <div className="level-h2">
            <h2 className="level">
              Level {currentLevel} &nbsp;
              {formatNumber(
                Number(watchScreen.totalReward) +
                  Number(secs) +
                  Number(tapPoints) +
                  Number(boosterPointsRef.current)
              )}
              /{formatNumber(level[currentLevel])}
            </h2>

            <div style={{ height: "10px", marginBottom: "10px" }}>
              <ProgressBar style={{ height: "10px" }}>
                <ProgressBar
                  variant="warning"
                  now={Number(
                    ((watchScreen.totalReward +
                      secs +
                      tapPoints +
                      Number(boosterPointsRef.current)) /
                      level[currentLevel]) *
                      100
                  ).toFixed()}
                  key={1}
                />
              </ProgressBar>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="level-h2">
            <h2 className="energy">Energy {energy.current}/5000</h2>
            <div style={{ height: "10px", marginBottom: "10px" }}>
              <ProgressBar style={{ height: "10px" }}>
                <ProgressBar now={(energy.current / 5000) * 100} key={1} />
              </ProgressBar>
            </div>
          </div>
        </div>
        <div className="row streak-center">
          <div className="col-2 text-center">
            <img src={settings} alt="Settings" />
          </div>
          <div className="col-8 streak-border">
            <div className="row text-center phase1">
              <div className="col-5">
                <h2 className="streak"> STREAK > </h2>
              </div>
              <div className="col-2 phase-p">P1</div>
              <div
                className="col-5"
                onClick={() => {
                  goToThePage(Phase, "Phase");
                }}
              >
                <h2 className="streak"> STAKE > </h2>
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              goToThePage(Info, "Info");
            }}
            className="col-2 text-center"
          >
            <img src={help} alt="Help" />
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <div className="token-div">
              <p className="token-mint">Token Mint</p>
              <p className="earn-p">{currentLevel}/Sec</p>
            </div>
          </div>
          <div
            className="col-8 points"
            onClick={() => {
              goToThePage(TotalPoints, "TotalPoints");
            }}
          >
            <h2>
              <img src={memetv} alt="Meme TV" />
              <span className="txt-color ml-10">
                {" "}
                {watchScreen.totalReward +
                  secs +
                  tapPointsRef.current +
                  boosterPointsRef.current}
              </span>
            </h2>
          </div>
          <div className="col-2">
            <div className="token-div">
              <p className="token-mint1">Earn / tap</p>
              <p className="earn-p">{boosterRef.current === "tap" ? 25 : 5}</p>
            </div>
          </div>
        </div>
        <div className="row streak-center">
          <div
            className="col-2 text-center"
            onClick={() => {
              goToThePage(marketPlace, "marketPlace");
            }}
          >
            <img src={marketPlack} alt="Settings" />
          </div>

          <div className="col-8 text-c">
            <div className="">
              <div className="col-9">
                {watchScreen.booster ? (
                  <h2 className="streak booster">
                    {/* {boosterSec} */}
                    {watchScreen.boosterSec}
                  </h2>
                ) : null}
              </div>
            </div>
          </div>

          <div
            className="col-2 text-center"
            onClick={() => {
              goToThePage(DoandEarn, "DoandEarn");
            }}
          >
            <img src={leaderBoarder} alt="Help" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="floor"></div>
          <img
            src="https://i.imgur.com/pXALzSc.gif"
            className="woot-dance"
            width="328"
            height="272"
            alt="8-bit dancing Karateka guy"
            onClick={handleTap}
          />
          {tapAnimations.map((animation) => (
            <div
              key={animation.id}
              className="tap-points txt-color"
              style={{ left: animation.x, top: animation.y }}
            >
              +5
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tv;
