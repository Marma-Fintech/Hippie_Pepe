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
import cheapStuff from "../CheapStuff/cheapStuff";

const Tv = () => {
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();
  const [secs, setSecs] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(
    userDetails.userDetails.level
  ); // assuming the starting level is 1
  const secsRef = useRef(secs);

  const [tapPoints, setTapPoints] = useState(0);
  const tapPointsRef = useRef(secs);
  const [boosterSec, setBoosterSec] = useState(0);

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

  useEffect(() => {
    if (watchScreen.booster) {
      const boosterbehaviour = {
        levelUp: currentLevel + 1,
        tap: 25,
        "2x": currentLevel * 2,
        "3x": currentLevel * 3,
        "5x": currentLevel * 5,
      };

      const boosterDuration = {
        levelUp: 60,
        tap: 60,
        "2x": 60,
        "3x": 120,
        "5x": 180,
      };
      setBoosterSec(boosterDuration[watchScreen.boosterDetails.name]);
    }
  }, [watchScreen]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecs((prevSecs) => prevSecs + currentLevel);
      secsRef.current = secsRef.current + currentLevel;
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
      addWatchSec();
    };
  }, []);

  const getUserDetails = async (data) => {
    const userDetails = await UserDeatils(data);
    console.log(JSON.stringify(userDetails) + " referredIdFromUrl  ");
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
    const data = {
      telegramId: userDetails.userDetails.telegramId,
      userWatchSeconds: secsRef.current,
      boosterPoints: String(tapPointsRef.current),
    };
    const res = await addWatchSeconds(data);
    console.log(JSON.stringify(res));
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

  return (
    <div
      className="tvContainer menupointer"
      style={{ height: "100%", width: "100%" }}
    >
      <div className="row level-div text-center">
        <div className="col-6">
          <div className="level-h2">
            <h2 className="level">
              Level {currentLevel}{" "}
              {formatNumber(
                Number(watchScreen.totalReward) +
                  Number(secs) +
                  Number(tapPoints)
              )}
              /{formatNumber(level[currentLevel])}
            </h2>

            <div style={{ height: "10px", marginBottom: "10px" }}>
              <ProgressBar style={{ height: "10px" }}>
                <ProgressBar
                  variant="warning"
                  now={Number(
                    ((watchScreen.totalReward + secs + tapPoints) /
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
            <h2 className="energy">Energy {watchScreen.energy}/5000</h2>
            <div style={{ height: "10px", marginBottom: "10px" }}>
              <ProgressBar style={{ height: "10px" }}>
                <ProgressBar now={(watchScreen.energy / 5000) * 100} key={1} />
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
              <div className="col-5">
                <h2 className="streak"> STAKE &nbsp; </h2>
              </div>
            </div>
          </div>
          <div className="col-2 text-center">
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
          <div className="col-8 points">
            <h2>
              <img src={memetv} alt="Meme TV" />
              <span className="txt-color ml-10">
                {" "}
                {watchScreen.totalReward + secs + tapPointsRef.current}
              </span>
            </h2>
          </div>
          <div className="col-2">
            <div className="token-div">
              <p className="token-mint1">Earn / tap</p>
              <p className="earn-p">10</p>
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
                  <h2 className="streak booster"> {boosterSec}</h2>
                ) : null}
              </div>
            </div>
          </div>

          <div
            className="col-2 text-center"
            onClick={() => {
              goToThePage(cheapStuff, "cheapStuff");
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
            onClick={() => {
              setTapPoints((prev) => prev + 10);
              tapPointsRef.current = tapPoints + 10;
              updatewatchScreenInfo((prev) => {
                return {
                  ...prev,
                  tapPoints: watchScreen.tapPoints + 10,
                  energy: watchScreen.energy - 5,
                };
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Tv;
