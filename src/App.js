import logo from "./logo.svg";
import "./App.css";
import Thememe from "./Thememe";
import { UserInfoProvider } from "../src/Providers/theData";

function App() {
  return (
    <UserInfoProvider>
      <Thememe />
    </UserInfoProvider>
  );
}

export default App;
