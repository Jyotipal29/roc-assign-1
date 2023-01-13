import React, { useEffect, useMemo, useState } from "react";
import Captcha from "./Captcha";

function SignupPage({ onAuthSuccess }) {
  const [registering, setRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      !registering &&
      username &&
      password &&
      confirmPassword &&
      confirmPassword === password
    );
  }, [registering, username, password, confirmPassword]);
  useEffect(() => {
    setFormErrorMessage("");
  }, []);
  useEffect(() => {
    if (!username || !password || !confirmPassword) {
      setFormErrorMessage("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setFormErrorMessage("Password confirmation must match password");
      return;
    }

    setFormErrorMessage("");
  }, [username, password, confirmPassword]);

  function submitHandler(e) {
    e.preventDefault();
    setRegistering(true);
    setShowCaptcha(true);
  }

  function registerUser() {
    // Simulate account creation with a be service
    setTimeout(() => {
      setRegistering(false);
      if (onAuthSuccess) {
        onAuthSuccess();
      }
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    }, 5000);
  }

  return (
    <div className="container">
      <div className="wrapper">
        <h3 className="form-heading">Create Account</h3>

        <form onSubmit={submitHandler} className="flex-center flex-col">
          <p className="error-msg">{formErrorMessage}</p>

          <div className="form-control">
            <small>name</small>
            <input
              type="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-control">
            <small>password</small>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-control">
            <small>confirm passowrd</small>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={!canSubmit} className="submit-btn">
            {registering ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <Captcha
          onCaptchaSuccess={() => {
            registerUser();
          }}
          show={showCaptcha}
          onHide={() => {
            setShowCaptcha(false);
          }}
        />
      </div>
    </div>
  );
}

export default SignupPage;
