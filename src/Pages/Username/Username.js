import React from "react";
import "./Username.css";

const Username = () => {
  return (
    <div
      className="usernameContainer menupointer"
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "flex-start",
        paddingTop: "70px",
      }}
    >
      <div className="welcomText gradient-welcome">WELCOME</div>
      <div className="welcomText2 gradient-welcome2">MEMEOHOLIC!</div>
      <div className="user-introtext">
        Add Your Unique Nickname and Referral code
      </div>
      <div
        className="inputContainer"
        style={{
          height: "45%",
          width: "100%",
        }}
      >
        <div className="inputUsername" style={{ height: "50%", width: "100%" }}>
          <div className="input-text">Nickname</div>
          <div className="input-field" style={{ height: "35%", width: "100%" }}>
            <input
              className="inputStyle"
              style={{
                height: "100%",
                width: "80%",
                backgroundColor: "rgba(38, 38, 38, 1)",
                // borderColor: "rgba(121, 121, 121, 1)",
              }}
            />
          </div>
        </div>

        <div className="inputUsername" style={{ height: "50%", width: "100%" }}>
          <div className="input-text">Enter Referral Code</div>
          <div className="input-field" style={{ height: "35%", width: "100%" }}>
            <input
              className="inputStyle"
              style={{
                height: "100%",
                width: "80%",
                backgroundColor: "rgba(38, 38, 38, 1)",
                // borderColor: "rgba(121, 121, 121, 1)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Username;
