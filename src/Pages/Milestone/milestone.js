import React from "react";
import "./milestone.css";
import logo from "../../assets/images/meme-logo.svg";
import Cup from "../../assets/images/cup.svg";

const Milestone = () => {
  
  return (
 
    <div
      className=" menupointer" style={{maxWidth:"380px"}}>
      <div className="phase-details">
        <h3>Here’s how it works</h3>
      </div>
      <div className="phase-para1">
        <p className="font-2">Create Your Unique Referral Link</p>
        <p>
        Click the "Invite" button to generate 
        your personalized referral link.
        <hr style={{margin:"10px",paddingBottom:"0px"}} />
        </p>
       
      </div>
     
      <div className="container" style={{maxWidth:"320px"}}>
      <div className="row mt10 cheap-stuff">
            <div className="col-2">
              <img
                src={Cup}
                alt="Login streak icon"
                className="image"
              />
            </div>
            <div className="col-7 stuff-text">
              <h4>Login Streak</h4>
              <p className="stuff-p">
                <img src={logo} />{" "}
                +958
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
                 src={Cup}
                alt="Login streak icon"
                className="image"
              />
            </div>
            <div className="col-7 stuff-text">
              <h4>Login Streak</h4>
              <p className="stuff-p">
                <img src={logo} />{" "}
                +958
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
                 src={Cup}
                alt="Login streak icon"
                className="image"
              />
            </div>
            <div className="col-7 stuff-text">
              <h4>Login Streak</h4>
              <p className="stuff-p">
                <img src={logo} />{" "}
                +958
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