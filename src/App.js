// import logo from "./logo.svg";
// import "./App.css";
// import Thememe from "./Pages/Thememe";
// import { UserInfoProvider } from "../src/Providers/theData";

// function App() {
//   return (
//     <UserInfoProvider>
//       <Thememe />
//     </UserInfoProvider>
//   );
// }

// export default App;



import React, { useState, useEffect } from "react";
import "./App.css";
import Thememe from "./Pages/Thememe";
import { UserInfoProvider } from "./Providers/theData";
import OpenTelegramBot from "./OpenTelegramBot";

function App() {
  const [showLandingPage, setShowLandingPage] = useState(false);

  useEffect(() => {
    // Check if the user has visited the Telegram bot link
    const visitedTelegramBot = sessionStorage.getItem("visitedTelegramBot");
    if (visitedTelegramBot === "true") {
      setShowLandingPage(true);
      // Update the history state to prevent going back to the landing page
      window.history.replaceState(null, "", window.location.href);
    }
  }, []);

  return (
    <UserInfoProvider>
      {showLandingPage ? (
        <Thememe />
      ) : (
        <div
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            color: "white",
          }}
        >
          <OpenTelegramBot onClick={() => setShowLandingPage(true)} />
        </div>
      )}
    </UserInfoProvider>
  );
}

export default App;

