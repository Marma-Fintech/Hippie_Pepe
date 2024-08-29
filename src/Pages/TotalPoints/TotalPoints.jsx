import React, { useEffect, useRef, useState } from "react";
import cancelIcon from "../../../src/assets/Task/cancelicon.png";
import StreakBreakPoints from "../StreakBreakPoints/StreakBreakPoints";
import useUserInfo from "../../Hooks/useUserInfo";
import logo from "../../assets/images/meme-logo.svg";
import twitter from "../../assets/images/twitter.svg";
import Tv from "../Tv/Tv";
import "./TotalPoints.css";
import { UserDeatils } from "../../apis/user";

const TotalPoints = () => {
  const [isLoginClaimed, setIsLoginClaimed] = useState(false);
  const [isWatchClaimed, setIsWatchClaimed] = useState(false);
  const [isReferClaimed, setIsReferClaimed] = useState(false);
  const [isGameClaimed, setIsGameClaimed] = useState(false);
  const [isBoostClaimed, setIsBoostClaimed] = useState(false);
  const [secs, setSecs] = useState(0);
  const secsRef = useRef(secs);
  const [tapPoints, setTapPoints] = useState(0);
  const tapPointsRef = useRef(tapPoints);
  const [boosterPoints, setBoosterPoints] = useState(0);
  const boosterPointsRef = useRef(boosterPoints);
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();
  const goToThePage = (component, name) => {
    updateUserInfo((prev) => {
      return {
        ...prev,
        ...{
          currentComponent: component,
          currentComponentText: "TVPage",
          lastComponent: userDetails.currentComponent,
          lastComponentText: userDetails.currentComponentText,
          centerCount: userDetails.centerCount + 1,
        },
      };
    });
  };

  useEffect(() => {
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
    const data1 = {
      name: userDetails?.userDetails?.name,
      telegramId: String(userDetails?.userDetails?.telegramId),
    };

    getUserDetails(data1);
  }, []);
  useEffect(() => {
    console.log(
      JSON.stringify(userDetails.userDetails.totalRewards) + "useriuser"
    );
  }, [userDetails]);

  const handleLoginClaimClick = () => {
    setIsLoginClaimed(true);
    setTimeout(() => {
      setIsLoginClaimed(false);
    }, 2000);
  };
  const handleWatchClaimClick = () => {
    setIsWatchClaimed(true);
    setTimeout(() => {
      setIsWatchClaimed(false);
    }, 2000);
  };
  const handleReferClaimClick = () => {
    setIsReferClaimed(true);
    setTimeout(() => {
      setIsReferClaimed(false);
    }, 2000);
  };
  const handleGameClaimClick = () => {
    setIsGameClaimed(true);
    setTimeout(() => {
      setIsGameClaimed(false);
    }, 2000);
  };
  const handleBoostClaimClick = () => {
    setIsBoostClaimed(true);
    setTimeout(() => {
      setIsBoostClaimed(false);
    }, 2000);
  };
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
            {/* <h1 className="streaktext">Total Rewards</h1> */}
            <img
              onClick={() => {
                goToThePage(Tv, "Tv");
              }}
              src={cancelIcon}
              className="cancel-imgpoints"
              style={{ cursor: "pointer" }}
            />
            <div className="row mt10 cheap-stuff" style={{ width: "100%" }}>
              <h4 className="totalPointsText">Total Rewards</h4>
              <div>
                <p className="rewardstext">
                  <img src={logo} /> {userDetails.userDetails.totalRewards}
                </p>
              </div>
            </div>
          </div>
          <div className="row mt10 cheap-stuff display-flex">
            <div className="col-7">
              <h4 className="textcolor">WATCH POINTS</h4>
            </div>
            <div className="col-5">
              <button className="button-points">
                <img className="logo-points" src={logo} />
                {userDetails?.userDetails?.watchRewards}
              </button>
            </div>
          </div>
          <div className="row mt10 cheap-stuff display-flex">
            <div className="col-7">
              <h4 className="textcolor">REFERRAL POINTS</h4>
            </div>
            <div className="col-5">
              <button className="button-points">
                <img className="logo-points" src={logo} />
                {userDetails?.userDetails?.referRewards}
              </button>
            </div>
          </div>
          <div className="row mt10 cheap-stuff display-flex">
            <div className="col-7">
              <h4 className="textcolor">STREAK POINTS</h4>
            </div>
            <div className="col-5">
              <button className="button-points">
                <img className="logo-points" src={logo} />
                {userDetails?.userDetails?.streakRewards}
              </button>
            </div>
          </div>
          <div className="row mt10 cheap-stuff display-flex">
            <div className="col-7">
              <h4 className="textcolor">GAMING POINTS</h4>
            </div>
            <div className="col-5">
              <button className="button-points">
                <img className="logo-points" src={logo} />
                {userDetails?.userDetails?.gameRewards?.gamePoints}
              </button>
            </div>
          </div>
          <div className="row mt10 cheap-stuff display-flex">
            <div className="col-7">
              <h4 className="textcolor">STAKING POINTS</h4>
            </div>
            <div className="col-5">
              <button className="button-points">
                <img className="logo-points" src={logo} />
                {userDetails?.userDetails?.stakingRewards}
              </button>
            </div>
          </div>
          <div className="row mt10 cheap-stuff display-flex">
            <div className="col-7">
              <h4 className="textcolor">TASK POINTS</h4>
            </div>
            <div className="col-5">
              <button className="button-points">
                <img className="logo-points" src={logo} />
                {userDetails?.userDetails?.taskRewards}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TotalPoints;
