import { useState, useEffect } from "react";

const TypingEffect = ({ text, speed = 100, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return;

    let index = 0;
    let intervalId = null;

    const startTyping = () => {
      setDisplayedText(text[index] || "");
      index++;

      intervalId = setInterval(() => {
        if (index < text.length - 1) {
          setDisplayedText((prev) => prev + text[index]);
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, speed);
    };

    // 클린업 함수
    const timeoutId = setTimeout(startTyping, delay);
    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed]);

  return <div>{displayedText}</div>;
};

export default TypingEffect;
