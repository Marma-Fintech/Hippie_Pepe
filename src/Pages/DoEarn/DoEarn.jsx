import React from "react";
import "./DoEarn.css";
import earn from "../../assets/images/earn-txt.png";
import twitter from "../../assets/images/twitter.svg";
import logo from "../../assets/images/meme-logo.svg";
import youtube from "../../assets/images/youtube.svg";
import telegram from "../../assets/images/telegram.svg";
import dobottom from "../../assets/images/stuff.gif";

const DoEarn = () => {
  return (
    <div className="info-img">
      <div
        className="menupointer stuff-body"
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          marginTop: "7%",
          flexDirection: "column",
          pointerEvents: "all",
        }}
      >
        <div className="row">
          <div className="col-12">
            <div className="doearn-img">
              <img className="stuff-gif" src={dobottom} />
              <div className="earn-img">
                <img src={earn} />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt20 cheap-stuff" style={{ width: "100%" }}>
          <div className="col-2">
            <img src={twitter} style={{ width: "100%" }} />
          </div>
          <div className="col-7 stuff-text">
            <h4>Join our x Channel</h4>
            <p className="stuff-p">
              <img src={logo} /> +5,000{" "}
            </p>
          </div>
          <div className="col-3">
            <button className="stuff-go" type="button">
              GO
            </button>
          </div>
        </div>

        <div className="row mt10 cheap-stuff" style={{ width: "100%" }}>
          <div className="col-2">
            <img src={youtube} style={{ width: "100%" }} />
          </div>
          <div className="col-7 stuff-text">
            <h4>Join our x Channel</h4>
            <p className="stuff-p">
              <img src={logo} /> +5,000{" "}
            </p>
          </div>
          <div className="col-3">
            <button className="stuff-claim" type="button">
              CLAIM
            </button>
          </div>
        </div>

        <div className="row mt10 cheap-stuff" style={{ width: "100%" }}>
          <div className="col-2">
            <img src={telegram} style={{ width: "100%" }} />
          </div>
          <div className="col-7 stuff-text">
            <h4>Join our x Channel</h4>
            <p className="stuff-p">
              <img src={logo} /> +5,000{" "}
            </p>
          </div>
          <div className="col-3">
            <button className="stuff-claim" type="button">
              CLAIM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoEarn;
