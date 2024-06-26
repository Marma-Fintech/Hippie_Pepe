import React from "react";
import useUserInfo from "../../Hooks/useUserInfo";
import PhaseDetails from "../PhaseDetails/PhaseDetails";
const Info = () => {
  const { userDetails, updateUserInfo } = useUserInfo();

  const goToThePage = (component, name) => {
    updateUserInfo((prev) => {
      return {
        ...prev,
        ...{
          currentComponent: component,
          currentComponentText: name,
          lastComponent: userDetails.currentComponent,
          lastComponentText: userDetails.currentComponentText,
          isMenu: false,
        },
      };
    });
  };
  return (
    <div
      onClick={() => {
        goToThePage(PhaseDetails, "PhaseDetailsPage");
        console.log("hihihih");
      }}
      style={{ color: "white" }}
      className="menupointer"
    >
      hlgklyihuk
    </div>
  );
};

export default Info;
