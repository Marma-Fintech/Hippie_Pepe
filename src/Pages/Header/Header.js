import React from "react";
import Info from "../Info/Info";
import useUserInfo from "../../Hooks/useUserInfo";

const Header = () => {
  const { userDetails, updateUserInfo } = useUserInfo();
  console.log(userDetails);
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
        goToThePage(Info, "InfoPage");
      }}
      style={{ color: "white", display: "flex", flexDirection: "row" }}
    >
      {/* Header */}
      <p style={{ color: "white" }}>{userDetails.telegramDetails.firstName}</p>
      <p>{userDetails.telegramDetails.id}</p>
    </div>
  );
};

export default Header;
