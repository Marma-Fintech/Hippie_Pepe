import React from "react";
import "./ReferPage.css";
import useUserInfo from "../../Hooks/useUserInfo";
import PhaseDetails from "../PhaseDetails/PhaseDetails";
import Arrow from "../../assets/images/arrow.gif";
import Currency from "../../assets/images/currency.gif";
import Invite from "../../assets/images/Invitefriends.png";

const ReferPage = () => {
  return (

<div className="info-img">
 <div
      
      className="menupointer "
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        pointerEvents: "all",
        marginTop:"60px",
      }}
    >
      <div className="col-9 phasediv">
        <h3>
       <img src={Invite} />
        </h3>
      </div>
      <div className="row d-flex align-items-center justify-content-center 
            ">
          <div className="col-7 refer-head">
            <p className="refer-earn">
            Get a 10,000 MTV and 5 Booster for each referral
           
            </p>
            <p className="works-p">HoW IT’S WORK</p>
           
          </div>
        </div>
      <div className="col-9 mt-20">
        <div className="row claim-ref">
          <div className="col-8">
          <h2 className="refer-table">My Refferal(0/5)</h2>
          </div>
        <div className="col-4">
        <button type="button" class="btn-success claim">Claim</button>
        </div>
       

        </div>
        
        
        <table className="table table-dark">
  <tbody>
    <tr>
    <th scope="row">1</th>
      <td>Abishesk</td>
      <td>500 mtv</td>
 
    </tr>

    <tr>
    <th scope="row">2</th>
      <td>Abishesk</td>
      <td>500 mtv</td>
    </tr>
    <tr>
    <th scope="row">3</th>
      <td>Abishesk</td>
      <td>500 mtv</td>
    </tr>

  
   
  </tbody>
</table>
      </div>
    
    </div>
    <div className="row">
      <div className="col-12">
        <div className="invite-fri">
          <h2>invite Friends</h2>
        </div>
      </div>
      
    </div>
    </div>

  )
  
  
};

export default ReferPage;
