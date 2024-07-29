import React, { useState } from "react";
import IntroImg from "../components/introImg/introImg";

const INITIAL_STATE = {
  userDetails: {
    id: 1,
    telegramDetails: {},
    userDetails: {},
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
  watchScreen: {
    levelReward: 0,
    Energy: 0,
    mintPerSec: 1,
    tokenPerMint: 10,
    tokenToken: 0,
  },
  updatewatchScreenInfo: () => undefined,
  updateUserInfo: () => undefined,
};

export const UserInfoContext = React.createContext({
  ...INITIAL_STATE,
});

export const UserInfoProvider = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userDetails, setUserdetails] = useState(INITIAL_STATE.userDetails);
  const [watchScreen, setwatchScreen] = useState(INITIAL_STATE.watchScreen);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const contextValue = React.useMemo(() => {
    return {
      userDetails: userDetails,
      updateUserInfo: setUserdetails,
      watchScreen: watchScreen,
      updatewatchScreenInfo: setwatchScreen,
    };
  }, [userDetails]);

  return (
    <UserInfoContext.Provider value={contextValue}>
      {children}
    </UserInfoContext.Provider>
  );
};
