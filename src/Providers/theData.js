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
    totalReward: 0,
    currentLevel: 0,
    energy: 5000,
    mintPerSec: 1,
    tokenPerMint: 1,
    tokenToken: 0,
    tapPoints: 0,
    booster: false,
    boostersList: userDetails?.boosters,
    boosterDetails: {},
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
  }, [userDetails, watchScreen]);

  return (
    <UserInfoContext.Provider value={contextValue}>
      {children}
    </UserInfoContext.Provider>
  );
};
