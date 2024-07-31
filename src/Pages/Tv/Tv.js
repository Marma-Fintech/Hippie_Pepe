import React, { useEffect, useState } from "react";
import "./Tv.css";
import settings from "../../assets/images/settings.png";
import help from "../../assets/images/help.png";
import memetv from "../../assets/images/meme-logo.svg";
import useUserInfo from "../../Hooks/useUserInfo";
import ProgressBar from "react-bootstrap/ProgressBar";

const Tv = () => {
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();
  // console.log(JSON.stringify(watchScreen) + "wawawawawawawa");
  const [total, setTotal] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1); // assuming the starting level is 1

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

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("Incrementing total");
      // setTotal((prevTotal) => prevTotal + 10);
      updatewatchScreenInfo((prev) => {
        return {
          ...prev,
          ...{
            totalReward: prev.totalReward + prev.tokenPerMint,
          },
        };
      });
    }, 1000);

    updatewatchScreenInfo((prev) => {
      return {
        ...prev,
        ...{
          totalReward: userDetails.userDetails?.totalRewards,
        },
      };
    });

    // console.log(
    //   "userDetails.userDetails.totalRewards" +
    //     JSON.stringify(userDetails.userDetails?.totalRewards)
    // );

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update the current level based on total points
    // console.log("objectkeys");
    Object.keys(level).forEach((lvl) => {
      if (
        Number(watchScreen.totalReward + watchScreen.tapPoints) >=
        Number(level[lvl])
      ) {
        setCurrentLevel(Number(lvl) + 1);
      }
    });
  }, [watchScreen]);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "k";
    return num;
  };

  // console.log(
  //   Number(
  //     ((watchScreen.totalReward + watchScreen.tapPoints) /
  //       level[currentLevel]) *
  //       100
  //   ).toFixed()
  // );

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
              {formatNumber(watchScreen.totalReward + watchScreen.tapPoints)}/
              {formatNumber(level[currentLevel])}
            </h2>
            <div style={{}}>
              <ProgressBar className="progress">
                <ProgressBar
                  variant="warning"
                  now={Number(
                    ((watchScreen.totalReward + watchScreen.tapPoints) /
                      level[currentLevel]) *
                      100
                  ).toFixed()}
                  key={1}
                />
              </ProgressBar>
            </div>

            {/* <hr /> */}
          </div>
        </div>
        <div className="col-6">
          <div className="level-h2">
            <h2 className="energy">Energy {watchScreen.energy}/5000</h2>
            <div>
              <ProgressBar>
                <ProgressBar
                  // variant="warning"
                  now={(watchScreen.energy / 5000) * 100}
                  key={1}
                />
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
                <h2 className="streak"> STACK &nbsp; </h2>
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
              <p className="earn-p">1/Sec</p>
            </div>
          </div>
          <div className="col-8 points">
            <h2>
              <img src={memetv} alt="Meme TV" />
              <span className="txt-color ml-10">
                {" "}
                {watchScreen.totalReward + watchScreen.tapPoints}
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
          <div className="col-2 text-center">
            <img src={settings} alt="Settings" />
          </div>
          <div className="col-8 text-c">
            <div className="">
              <div className="col-7">
                <h2 className="streak booster"> 12.00</h2>
              </div>
            </div>
          </div>
          <div className="col-2 text-center">
            <img src={help} alt="Help" />
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
              // console.log("Pts added");
              updatewatchScreenInfo((prev) => {
                return {
                  ...prev,
                  ...{
                    tapPoints: watchScreen.tapPoints + 10,
                    energy: watchScreen.energy - 5,
                  },
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
