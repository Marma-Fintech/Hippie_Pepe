import React, { useEffect, useState } from "react";
import "./ReferPage.css";
import useUserInfo from "../../Hooks/useUserInfo";
import PhaseDetails from "../PhaseDetails/PhaseDetails";
import Arrow from "../../assets/images/arrow.gif";
import Currency from "../../assets/images/currency.gif";
import Invite from "../../assets/images/Invitefriends.png";
import { shareOnMobile } from "react-mobile-share";
import { myReferrel } from "../../apis/user";
import axios from "axios";
import { Base_Url } from "../../apis/baseurl";
const ReferPage = () => {
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();

  const [referrals, setReferrals] = useState([]);

  const getMyReferralList = async () => {
    const data = {
      telegramId: String(userDetails?.userDetails?.telegramId),
    };
    const referrals = await myReferrel(
      String(userDetails?.userDetails?.telegramId)
    );

    setReferrals(referrals.referrals);
  };

  useEffect(() => {
    getMyReferralList();
  }, []);

  const shareToTelegram = () => {
    const url = encodeURIComponent(
      `https://t.me/mytestgetDetailsbot?start=${userDetails?.userDetails?.refId}`
    );
    const text = encodeURIComponent("My referrel");
    const telegramUrl = `https://t.me/share/url?url=${url}&text=${text}`;

    window.open(telegramUrl, "_blank");
  };

  return (
    <div className="info-img menupointer">
      <div
        className="menupointer"
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
          pointerEvents: "all",
          marginTop: "60px",
        }}
      >
        <div className="col-9 phasediv">
          <h3>
            <img src={Invite} />
          </h3>
        </div>
        <div
          className="row d-flex align-items-center justify-content-center 
            "
        >
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
              <h2 className="refer-table">My Refferals</h2>
            </div>
            <div className="col-4">
              {/* <button type="button" class="btn-success claim">
                Claim
              </button> */}
            </div>
          </div>

          <table className="table table-dark">
            <tbody>
              {referrals.map((item, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.totalRewards}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className="row"
        onClick={() => {
          shareToTelegram();
        }}
      >
        <div className="col-12">
          <div className="invite-fri">
            <h2>invite Friends</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferPage;
