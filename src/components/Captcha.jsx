import { useEffect, useRef, useState } from "react";
import { generateCode } from "../lib/utils";
import RefreshIcon from "@mui/icons-material/Refresh";

import "./Captcha.css";

function Captcha({ onCaptchaSuccess, show, onHide }) {
  const [code, setCode] = useState(" ");
  const [captcha, setCaptcha] = useState(null);
  const [captchaPreviewSrc, setCaptchaPreviewSrc] = useState("");
  const captchaInputRef = useRef(null);

  // Regenerates a new code and clears the user's old captcha entered
  function refreshCaptcha() {
    const generatedCode = generateCode(6);
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 40;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const size = 2.5;
    const columns = canvas.width / size;
    const rows = canvas.height / size;

    // Obfuscate the canvase to make it hard to get (bots)
    for (let column = 0; column < columns; column++) {
      for (let row = 0; row < rows; row++) {
        // randomly choose black or white for the fill
        ctx.fillStyle =
          Math.random() < 0.5 ? "black" : "rgba(255, 255, 255, 0.5)";

        // draw a square that fills the current grid location
        ctx.fillRect(size * column, size * row, size, size);
      }
    }

    ctx.font = "30px serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.65)";

    ctx.fillText(
      generatedCode,
      canvas.width / 2 - ctx.measureText(generatedCode).width / 2,
      canvas.height / 2 + 10
    );

    setCaptchaPreviewSrc(canvas.toDataURL("image/jpeg"), 0.2);

    setCaptcha(generatedCode);
    setCode("");
    captchaInputRef.current?.focus();
  }

  function submitHandler(e) {
    e.preventDefault();
    if (captcha === code) {
      if (onCaptchaSuccess) {
        onCaptchaSuccess();
        onHide();
      }
      refreshCaptcha();
      return;
    }

    alert("Captcha failed! Please try again");
    refreshCaptcha();
  }

  useEffect(() => {
    refreshCaptcha();
  }, []);

  return (
    show && (
      <div className="captcha-content flex-center flex-col">
        <div className="cap">
          <div className="code">
            <img src={captchaPreviewSrc} alt="" />
          </div>
          <button
            className="refresh-btn "
            onClick={() => {
              refreshCaptcha();
            }}
          >
            <RefreshIcon fontSize="large" />
          </button>
        </div>

        <form onSubmit={submitHandler} className="sub-form">
          <input
            ref={captchaInputRef}
            placeholder="enter captcha here"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoFocus
          />
          <button className="sub-sec">submit</button>
        </form>
      </div>
    )
  );
}

export default Captcha;
