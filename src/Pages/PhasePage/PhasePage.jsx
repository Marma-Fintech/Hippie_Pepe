import React from "react";
import stakelogo from "../../assets/images/stake-logo.svg";
import logo from "../../assets/images/main-logo.svg";
import "./PhasePage.css";

const PhasePage = () => {
  return (
    <>
      <div className="info-img scroll">
        <div
          className="menupointer stuff-body1"
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
          <div class="arrows prev"></div>
          <div class="arrows next"></div>
          <div className="phase">
            <div className="row phaseContainer">
              <div className="col-6">
                <h1 className="phase-text">PHASE 1</h1>
              </div>
              <div className="col-6">
                <h3 className="phase-point">
                  {" "}
                  <img src={logo} /> 234k
                </h3>{" "}
              </div>
            </div>
            <div className="row justify-content-center">
              <div
                className="col-11 p4 stake-display justify-content-center"
                style={{ padding: "5px" }}
              >
                <div className="col-8">
                  <h2>Total Staked</h2>
                </div>
                <div className="col-4">
                  <p className="phase-para">
                    <img src={logo} /> 234K{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="row mt10 phase-stuff" style={{ width: "100%" }}>
              <div className="col-2">
                <div>
                  <h2 className="stake-days">
                    DAY
                    <h3 className="stake-color">1</h3>
                  </h2>
                </div>
              </div>
              <div className="col-7 stuff-text">
                <p className="phase-para">
                  <img src={stakelogo} /> 234K{" "}
                </p>
              </div>
              <div className="col-3">
                <button className="stuff-claim">STAKE</button>
              </div>
            </div>
            <div className="row mt10 phase-stuff" style={{ width: "100%" }}>
              <div className="col-2">
                <div>
                  <h2 className="stake-days">
                    DAY
                    <h3 className="stake-color">2</h3>
                  </h2>
                </div>
              </div>
              <div className="col-7 stuff-text">
                <p className="phase-para">
                  <img src={stakelogo} /> 234K{" "}
                </p>
              </div>
              <div className="col-3">
                <button className="stuff-claim">STAKE</button>
              </div>
            </div>
            <div className="row mt10 phase-stuff" style={{ width: "100%" }}>
              <div className="col-2">
                <div>
                  <h2 className="stake-days">
                    DAY
                    <h3 className="stake-color">3</h3>
                  </h2>
                </div>
              </div>
              <div className="col-7 stuff-text">
                <p className="phase-para">
                  <img src={stakelogo} /> 234K{" "}
                </p>
              </div>
              <div className="col-3">
                <button className="stuff-claim">STAKE</button>
              </div>
            </div>
            <div className="row mt10 phase-stuff" style={{ width: "100%" }}>
              <div className="col-2">
                <div>
                  <h2 className="stake-days">
                    DAY
                    <h3 className="stake-color">4</h3>
                  </h2>
                </div>
              </div>
              <div className="col-7 stuff-text">
                <p className="phase-para">
                  <img src={stakelogo} /> 234K{" "}
                </p>
              </div>
              <div className="col-3">
                <button className="stuff-claim">STAKE</button>
              </div>
            </div>
            <div className="row mt10 phase-stuff" style={{ width: "100%" }}>
              <div className="col-2">
                <div>
                  <h2 className="stake-days">
                    DAY
                    <h3 className="stake-color">5</h3>
                  </h2>
                </div>
              </div>
              <div className="col-7 stuff-text">
                <p className="phase-para">
                  <img src={stakelogo} /> 234K{" "}
                </p>
              </div>
              <div className="col-3">
                <button className="stuff-claim">STAKE</button>
              </div>
            </div>
            <div className="row mt10 phase-stuff" style={{ width: "100%" }}>
              <div className="col-2">
                <div>
                  <h2 className="stake-days">
                    DAY
                    <h3 className="stake-color">6</h3>
                  </h2>
                </div>
              </div>
              <div className="col-7 stuff-text">
                <p className="phase-para">
                  <img src={stakelogo} /> 234K{" "}
                </p>
              </div>
              <div className="col-3">
                <button className="stuff-claim">STAKE</button>
              </div>
            </div>
            <div className="row mt10 phase-stuff" style={{ width: "100%" }}>
              <div className="col-2">
                <div>
                  <h2 className="stake-days">
                    DAY
                    <h3 className="stake-color">7</h3>
                  </h2>
                </div>
              </div>
              <div className="col-7 stuff-text">
                <p className="phase-para">
                  <img src={stakelogo} /> 234K{" "}
                </p>
              </div>
              <div className="col-3">
                <button className="stuff-claim">STAKE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PhasePage;
