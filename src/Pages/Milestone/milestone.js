import React from "react";
import "./milestone.css";
import logo from "../../assets/images/meme-logo.svg";

const Milestone = () => {
  
  return (
 
    <div
      className=" menupointer" style={{maxWidth:"380px"}}>
      <div className="phase-details">
        <h3>Here’s how it works</h3>
      </div>
      <div className="phase-para1">
        <p className="font-2">Start Watching</p>
        <p>
          Simply click the "Watch" button to access a TV-like interface filled
          with entertaining meme videos.
        </p>
      </div>
      <div className="container" style={{maxWidth:"320px"}}>
      <div className="row mt10 cheap-stuff">
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
                
              </p>
            </div>
            <div className="col-3">
             <button
                className="stuff-claim" style={{ cursor: "pointer" }} >
               CLAIM
              </button>
              
            </div>
          </div>
          <div className="row mt10 cheap-stuff">
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
                
              </p>
            </div>
            <div className="col-3">
             <button
                className="stuff-claim" style={{ cursor: "pointer" }} >
               CLAIM
              </button>
              
            </div>
          </div>
          <div className="row mt10 cheap-stuff">
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
                
              </p>
            </div>
            <div className="col-3">
             <button
                className="stuff-claim" style={{ cursor: "pointer" }} >
               CLAIM
              </button>
              
            </div>
          </div>
      </div>
    </div>
 
  );
};

export default Milestone;