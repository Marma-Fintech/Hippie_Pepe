import React, { useEffect, useState, useRef } from "react";
import "./Tv.css";
import settings from "../../assets/images/settings.png";
import help from "../../assets/images/help.png";
import memetv from "../../assets/images/meme-logo.svg";
import useUserInfo from "../../Hooks/useUserInfo";
import ProgressBar from "react-bootstrap/ProgressBar";
import marketPlack from "../../assets/images/marketPlace.png";
import leaderBoarder from "../../assets/images/leaderBoard.png";
import { addWatchSeconds } from "../../apis/user";
import { UserDeatils } from "../../apis/user";
import marketPlace from "../MarketPlace/marketPlace";
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
  const watchScreenRef = useRef(watchScreen);
  const currentLevelRef = useRef(userDetails.userDetails?.level);

  const secsRef = useRef(secs);
  const [tapPoints, setTapPoints] = useState(0);
  const tapPointsRef = useRef(tapPoints);
  const [boosterSec, setBoosterSec] = useState();
  const energy = useRef(5000);
  const boosterRef = useRef(false);
  const [boosterPoints, setBoosterPoints] = useState(0);
  const boosterPointsRef = useRef(boosterPoints);

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
  const [tapAnimations, setTapAnimations] = useState([]);

  useEffect(() => {
    // clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const values = {
        levelUp: currentLevelRef.current + 1,
        "2x": currentLevelRef.current * 2,
        "3x": currentLevelRef.current * 3,
        "5x": currentLevelRef.current * 5,
      };
      if (
        watchScreenRef.current?.boosterDetails?.name === "levelUp" ||
        watchScreenRef.current?.boosterDetails?.name === "2x" ||
        watchScreenRef.current?.boosterDetails?.name === "3x" ||
        watchScreenRef.current?.boosterDetails?.name === "5x"
      ) {
        // console.log(values[watchScreenRef.current?.boosterDetails?.name]);

        setBoosterPoints(
          (prevBoosterPoints) =>
            prevBoosterPoints +
            values[watchScreenRef.current?.boosterDetails?.name]
        );
        boosterPointsRef.current +=
          values[watchScreenRef.current?.boosterDetails?.name];
      } else {
        setSecs((prevSecs) => {
          const newSecs = prevSecs + currentLevelRef.current;
          secsRef.current = newSecs;
          return newSecs;
        });
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => {
      clearInterval(intervalRef.current);
      addTotalPoints();
    };
  }, []);

  const addTotalPoints = () => {
    const totalRewardPoints =
      Number(watchScreen.totalReward) +
      Number(secsRef.current) +
      Number(tapPointsRef.current) +
      Number(boosterPointsRef.current);

    console.log(
      totalRewardPoints,
      secsRef.current,
      tapPointsRef.current,
      boosterPointsRef.current
    );

    updatewatchScreenInfo((prev) => ({
      ...prev,
      totalReward: totalRewardPoints,
      tapPoints: watchScreen.tapPoints + tapPointsRef.current,
      watchSec: watchScreen.watchSec + secsRef.current,
      boosterPoints: watchScreen.boosterPoints + boosterPointsRef.current,
    }));
  };

  const getUserDetails = async (data) => {
    const userDetails = await UserDeatils(data);

    updateUserInfo((prev) => ({
      ...prev,
      userDetails,
    }));

    updatewatchScreenInfo((prev) => ({
      ...prev,
      boostersList: userDetails?.boosters,
    }));
  };

  const addWatchSecapi = async (data) => {
    const res = await addWatchSeconds(data);
    console.log(JSON.stringify(res));
    // if (res) {
    updatewatchScreenInfo((prev) => ({
      ...prev,
      tapPoints: 0,
      booster: false,
      boosterSec: 0,
      boosterPoints: 0,
      // boostersList: [],
      boosterDetails: {},
      watchSec: 0,
    }));
    // }
  };

  useEffect(() => {
    console.log(JSON.stringify(watchScreen) + "wawawawawawawawa");
    watchScreenRef.current = watchScreen;
    if (watchScreen.booster && watchScreen.boosterSec === 0) {
      var data = {};
      if (watchScreen.booster) {
        data = {
          telegramId: userDetails.userDetails.telegramId,
          userWatchSeconds: watchScreen.watchSec + secsRef.current,
          boosterPoints: String(
            watchScreen.tapPoints +
              tapPointsRef.current +
              watchScreen.boosterPoints +
              boosterPointsRef.current
          ),
          boosters: [watchScreen.boosterDetails.name],
        };
      } else {
        data = {
          telegramId: userDetails.userDetails.telegramId,
          userWatchSeconds: watchScreen.watchSec + secsRef.current,
          boosterPoints: String(
            watchScreen.tapPoints +
              tapPointsRef.current +
              watchScreen.boosterPoints +
              boosterPointsRef.current
          ),
        };
      }

      addWatchSecapi(data);
    }

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
    updateUserInfo((prev) => ({
      ...prev,
      currentComponent: component,
      currentComponentText: name,
      lastComponent: userDetails.currentComponent,
      lastComponentText: userDetails.currentComponentText,
      centerCount: userDetails.centerCount + 1,
    }));
  };

  const handleTap = (e) => {
    var num = 5;
    if (watchScreen?.boosterDetails?.name === "tap" && watchScreen?.booster) {
      num = 25;
      setBoosterPoints((prevBoosterPoints) => {
        const newBoosterPoints = prevBoosterPoints + num;
        boosterPointsRef.current = newBoosterPoints;
        return newBoosterPoints;
      });
    } else {
      setTapPoints((prevTapPoints) => {
        const newTapPoints = prevTapPoints + num;
        tapPointsRef.current = newTapPoints;
        return newTapPoints;
      });
    }

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
                  Number(boosterPoints)
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
                      Number(boosterPoints)) /
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
                <h2 className="streak"> STREAK &nbsp;</h2>
              </div>
              <div className="col-2 phase-p">P1</div>
              <div
                className="col-5"
                onClick={() => {
                  goToThePage(Phase, "Phase");
                }}
              >
                <h2 className="streak"> STAKE &nbsp; </h2>
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
                {watchScreen.totalReward + secs + tapPoints + boosterPoints}
              </span>
            </h2>
          </div>
          <div className="col-2">
            <div className="token-div">
              <p className="token-mint1">Earn / tap</p>
              <p className="earn-p">
                {watchScreen.boosterDetails.name === "tap" ? 25 : 5}
              </p>
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
                  <h2 className="streak booster">{watchScreen.boosterSec}</h2>
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
              +{watchScreen.boosterDetails.name === "tap" ? 25 : 5}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tv;
