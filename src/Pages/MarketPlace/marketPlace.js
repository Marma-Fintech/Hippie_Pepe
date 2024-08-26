import React, { useEffect, useState } from "react";
import "./marketPlace.css";
import memetv from "../../assets/images/rewards.svg";
import booster from "../../assets/images/boost-tap.png";
import ligthing from "../../assets/images/lighting.png";
import booster3 from "../../assets/images/3x-ligthing.png";
import booster2 from "../../assets/images/2booster.png";
import cancelIcon from "../../assets/Task/cancelicon.png";
import { purchaseBooster } from "../../apis/user";
import useUserInfo from "../../Hooks/useUserInfo";
import { UserDeatils } from "../../apis/user";

const MarketPlace = () => {
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();
  const [showPopup, setShowPopup] = useState(false);
  const [selected, setSelected] = useState({});
  const [totalReward, setTotalReward] = useState(watchScreen.watchRewards);
  const [count, setCount] = useState(1);
  const [err, setErr] = useState("");
  const handleClick1 = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    setTotalReward(watchScreen.watchRewards);
  }, [watchScreen]);
  const handleClick2 = () => {
    // Counter state is decremented
    if (count === 1) {
    } else {
      setCount(count - 1);
    }
  };

  const getDetails = async (data) => {
    const userDetails = await UserDeatils(data);

    updateUserInfo((prev) => ({
      ...prev,
      userDetails: userDetails,
    }));

    updatewatchScreenInfo((prev) => ({
      ...prev,
      boostersList: userDetails?.boosters,
      totalReward: userDetails?.totalRewards,
    }));

    return userDetails;
  };

  const getUserDetails = () => {
    const data = {
      name: userDetails.userDetails?.name,
      telegramId: userDetails?.userDetails?.telegramId,
    };

    getDetails(data);
  };

  const purchaseCards = async () => {
    // const result = Array.from({ length: count }, () => selected.booster);
    const data = {
      telegramId: userDetails?.userDetails?.telegramId,
      boosterPoints: String(selected.price * count),
      booster: selected.booster,
      boosterCount: count,
    };

    const Boosters = await purchaseBooster(data);
    if (Boosters?.message) {
      setShowPopup(false);
      setCount(1);
      getUserDetails();
    } else {
      setErr("Not Enough watch points");
      setTimeout(() => {
        setCount(1);
        setShowPopup(false);
        setErr("");
      }, 3000);
    }
  };

  return (
    <div className="info-img">
      <div
        className="menupointer "
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          marginTop: "13%",
          flexDirection: "column",
          pointerEvents: "all",
        }}
      >
        <div className="market-place">
          <div className="market">
            <div className="bg-market">
              <h2 className="welcome-text mb15 text-center">Market place</h2>
              <hr />
              <div className="row mt5">
                <div className="display-flex">
                  <div className="col-7">
                    <p className="rewards mb0"> Watch Rewards</p>
                  </div>
                  <div className="col-5 text-right market-color">
                    <p className="mb0">
                      <img src={memetv} /> {totalReward}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt15">
              <div className="col-6">
                <div className="market-card p5">
                  <div className="market-pick text-center">
                    <img src={booster} className="booster-margin" />
                    <h4 className="mb0 market-color flex">
                      <img className="mr5" src={memetv} /> 200
                    </h4>
                  </div>
                  <div className="p10">
                    <button
                      onClick={() => {
                        setShowPopup(true);
                        setSelected({
                          booster: "tap",
                          img: booster,
                          price: 100,
                        });
                      }}
                      type="button"
                      className="btn-card"
                    >
                      BUY
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="market-card p5">
                  <div className="market-pick text-center">
                    <img src={ligthing} className="booster-margin" />
                    <h4 className="mb0 market-color flex">
                      <img className="mr5" src={memetv} /> 200
                    </h4>
                  </div>
                  <div className="p10">
                    <button
                      onClick={() => {
                        setShowPopup(true);
                        setSelected({
                          booster: "5x",
                          img: ligthing,
                          price: 1000000,
                        });
                      }}
                      type="button"
                      className="btn-card"
                    >
                      BUY
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="market-card p5">
                  <div className="market-pick text-center">
                    <img src={booster2} className="booster-margin" />
                    <h4 className="mb0 market-color flex">
                      <img className="mr5" src={memetv} /> 200
                    </h4>
                  </div>
                  <div className="p10">
                    <button
                      onClick={() => {
                        setShowPopup(true);
                        setSelected({
                          booster: "2x",
                          img: booster2,
                          price: 120,
                        });
                      }}
                      type="button"
                      className="btn-card"
                    >
                      BUY
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="market-card p5">
                  <div className="market-pick text-center">
                    <img src={booster3} className="booster-margin" />
                    <h4 className="mb0 market-color flex">
                      <img className="mr5" src={memetv} /> 200
                    </h4>
                  </div>
                  <div className="p10">
                    <button
                      onClick={() => {
                        setShowPopup(true);
                        setSelected({
                          booster: "3x",
                          img: booster3,
                          price: 120,
                        });
                      }}
                      type="button"
                      className="btn-card"
                    >
                      BUY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <>
                <h2 className="epic-m txt-color">{selected.booster} Booster</h2>
                <img
                  src={cancelIcon}
                  className="cancel-img"
                  onClick={() => {
                    setShowPopup(false);
                  }}
                />
                <div className="row text-center">
                  <div className="col-12">
                    <div className="epic-market">
                      {/* {selectedCard && ( */}
                      <img
                        src={selected?.img}
                        alt={"booster"}
                        className="booster1"
                      />
                      {/* )} */}
                      {/* <h3 className="rw-popup">You got 2x!</h3> */}
                      <div>
                        <div className="buttons">
                          <button
                            className="decre txt-color"
                            onClick={handleClick2}
                          >
                            <p className="txt-color mb0">-</p>
                          </button>
                          <div>
                            <p className="count">{count}</p>
                          </div>
                          <button className="decre" onClick={handleClick1}>
                            <p className="txt-color mb0">+</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    purchaseCards();
                  }}
                  className="btn-reward1"
                  style={err === "" ? {} : { color: "red" }}
                >
                  {err === ""
                    ? selected.price * count
                    : "Not Enough Watch Points"}
                </button>
                {/* <button className="btn-reward">Free Pick</button> */}
              </>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MarketPlace;
