import React, { useEffect, useState } from "react";
import "./ReferPage.css";
import useUserInfo from "../../Hooks/useUserInfo";
import PhaseDetails from "../PhaseDetails/PhaseDetails";
import Arrow from "../../assets/images/arrow.gif";
import Currency from "../../assets/images/currency.gif";
import Invite from "../../assets/images/Invitefriends.png";
import { shareOnMobile } from "react-mobile-share";
// import user, { myReferrel } from "../../apis/user";
import axios from "axios";
import { Base_Url } from "../../apis/baseurl";
const ReferPage = () => {
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();

  const [referrals, setReferrals] = useState([]);

  // const getMyReferralList = async () => {
  //   const data = {
  //     telegramId: String(userDetails?.userDetails?.telegramId),
  //   };
  //   const referrals = await myReferrel(data);
  //   console.log(
  //     JSON.stringify(referrals) + "referralsreferralsreferralsreferrals"
  //   );
  // };

  useEffect(() => {
    // getMyReferralList();
    // const fetchReferrals = async () => {
    //   try {
    //     const telegramId = "your-telegram-id"; // Replace with actual telegramId
    //     const response = await axios.get(
    //       `${Base_Url.base_url}/yourReferrals/${
    //         userDetails?.userDetails?.telegramId
    //       }?page=${1}&limit=${10}`
    //     );
    //     // setReferrals(response.data.referrals);
    //     // setTotalPages(response.data.totalPages);
    //     // setLoading(false);
    //     console.log(JSON.stringify(response) + "resresres");
    //   } catch (error) {
    //     console.log(JSON.stringify(error) + "errrererere");
    //     // setError(error.response ? error.response.data.message : error.message);
    //     // setLoading(false);
    //   }
    // };
    // fetchReferrals();
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
              <h2 className="refer-table">My Refferal(0/5)</h2>
            </div>
            <div className="col-4">
              {/* <button type="button" class="btn-success claim">
                Claim
              </button> */}
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
      <div
        className="row"
        onClick={() => {
          console.log(JSON.stringify(userDetails.userDetails.refId));
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
