import React from "react";
import "./Tv.css";
import settings from "../../assets/images/settings.png";
import help from "../../assets/images/help.png";
import memetv from "../../assets/images/meme-logo.svg";
import energy from "../../assets/images/energy.png";

const Tv = () => {
  
 

  return (
    <div className="tvContainer" style={{ height: "100%", width: "100%" }}>
     <div className="row level-div text-center">
      <div className="col-6">
        <div className="level-h2">
        <h2 className="level">Level 1 25/5000</h2>
        <hr />
        </div>
      
        
      </div>  
      <div className="col-6">
      <div className="level-h2">
        <h2 className="energy"><img src={energy} /> Energy 15/1000</h2>
        <hr />
        </div>
        </div>
        <div class="row streak-center">
  <div className="col-2 text-center"><img src={help}  /></div>
  <div class="col-8 streak-border">
    <div className="row text-center">
    <div className="col-6">
      <h2 className="streak"> STREAK &nbsp;></h2></div>
    <div className="col-6"><h2 className="streak"> PHASE &nbsp; ></h2></div>
    </div>
    
  </div>
  <div className="col-2 text-center"><img src={settings} /></div>
</div>
<div className="row">
  <div className="col-2">
  <div className="token-div"><p className="token-mint">Token Mint</p>
  <p className="earn-p">1/Sec</p></div>
  </div>
  <div className="col-8 points">
    <h2> 
   <img src={memetv} /><span className="txt-color"> 100k</span></h2></div>
  <div className="col-2">
  <div className="token-div"><p className="token-mint1">Token Mint</p>
  <p className="earn-p">10</p></div>
  </div>
</div>
     </div>
    <div className="row">
      <div className="col-12">
      <div class="floor"></div>
  <img src="https://i.imgur.com/pXALzSc.gif" class="woot-dance" width="328" height="272" alt="8-bit dancing Karateka guy" />
      </div>
    </div>
    </div>
  );
};

export default Tv;
