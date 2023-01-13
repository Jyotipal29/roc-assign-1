import { useEffect, useState } from "react";
import "./App.css";
import SignupPage from "./components/SignupPage";
import SignupSuccessfulPage from "./components/SignupSuccessfulPage";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
function App() {
  const [signupSuccessful, setSignupSuccessful] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    document.body.classList.contains("dark-mode")
  );

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <>
      <div className="action-bar z-max">
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="mode">
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </button>
      </div>
      {signupSuccessful ? (
        <SignupSuccessfulPage />
      ) : (
        <SignupPage onAuthSuccess={() => setSignupSuccessful(true)} />
      )}
    </>
  );
}

export default App;
