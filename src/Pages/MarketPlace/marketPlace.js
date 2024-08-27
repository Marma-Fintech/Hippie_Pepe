import React, { useState } from "react";
import "./marketPlace.css";
import memetv from "../../assets/images/rewards.svg";
import booster from "../../assets/images/boost-tap.png";
import ligthing from "../../assets/images/lighting.png";
import booster3 from "../../assets/images/3x-ligthing.png";
import booster2 from "../../assets/images/2booster.png";
import cancelIcon from "../../assets/Task/cancelicon.png";

const MarketPlace = () => {
  const [showPopup, setShowPopup] = useState(false);
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
                      <img src={memetv} /> 258K
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
                    <button type="button" className="btn-card">
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
                    <button type="button" className="btn-card">
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
                    <button type="button" className="btn-card">
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
                <h2 className="epic">Epic Win!</h2>
                <img
                  src={cancelIcon}
                  className="cancel-img"
                  // onClick={handleFreePick}
                />
                <div className="row text-center">
                  <div className="col-12">
                    <div className="epic-div">
                      {/* {selectedCard && ( */}
                      <img src={booster} alt={booster} className="booster" />
                      {/* )} */}
                      <h3 className="rw-popup">You got 2x!</h3>
                    </div>
                  </div>
                </div>
                <button className="btn-reward">Free Pick</button>
              </>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPlace;
