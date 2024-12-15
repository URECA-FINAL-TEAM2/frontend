import { useState, useEffect } from "react";
import logo from "/Logo/logoBtn.png";

const TypingEffect = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return;

    let index = 0;

    setDisplayedText(text[index] || "");
    index++;

    const interval = setInterval(() => {
      if (index < text.length - 1) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div className={`flex items-start space-x-2`}>
      <img src={logo} alt="" className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-main-300 p-1" />
      <div className={`max-w-xs`}>
        <div className={`rounded-lg bg-main-100 px-4 py-2`}>
          <p>{displayedText}</p>
        </div>
      </div>
    </div>
  );
};

export default TypingEffect;
