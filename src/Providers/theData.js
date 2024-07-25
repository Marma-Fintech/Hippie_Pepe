import React, { useState } from "react";
import IntroImg from "../components/introImg/introImg";

const INITIAL_STATE = {
  userDetails: {
    id: 1,
    telegramDetails: {},
    currentComponent: IntroImg,
    currentComponentText: "IntroImg",
    isHeader: false,
    isPlay: false,
    isMenu: false,
    lastComponent: IntroImg,
    lastComponentText: "IntroImg",
    menuCount: 0,
    centerCount: 0,
    refererCount: 0,
  },
  updateUserInfo: () => undefined,
};

export const UserInfoContext = React.createContext({
  ...INITIAL_STATE,
});

export const UserInfoProvider = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userDetails, setUserdetails] = useState(INITIAL_STATE.userDetails);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const contextValue = React.useMemo(() => {
    return {
      userDetails: userDetails,
      updateUserInfo: setUserdetails,
    };
  }, [userDetails]);

  return (
    <UserInfoContext.Provider value={contextValue}>
      {children}
    </UserInfoContext.Provider>
  );
};
